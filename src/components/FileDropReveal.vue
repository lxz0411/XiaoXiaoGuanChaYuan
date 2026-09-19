<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import defaultRevealImage from '../../素材/少儿频道页/解密卡.png'

const RESIZE_HANDLES = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw']

const props = defineProps({
  acceptedFileName: {
    type: String,
    default: '？？？.png',
  },
  revealImage: {
    type: String,
    default: defaultRevealImage,
  },
  revealAlt: {
    type: String,
    default: '解密卡',
  },
  width: {
    type: Number,
    default: 360,
  },
  minWidth: {
    type: Number,
    default: 160,
  },
  cardAspectRatio: {
    type: Number,
    default: 781 / 1117,
  },
  targetSelector: {
    type: String,
    default: '[data-reveal-target]',
  },
  contentSelector: {
    type: String,
    default: '[data-reveal-content], [data-reveal-decoded]',
  },
  frameBorder: {
    type: Object,
    default: () => ({
      top: 12,
      right: 17,
      bottom: 12,
      left: 14,
    }),
  },
  frameSlice: {
    type: Object,
    default: () => ({
      top: 37,
      right: 51,
      bottom: 37,
      left: 43,
    }),
  },
})

const emit = defineEmits(['revealed', 'rejected', 'dragged', 'targets-revealed'])

const visible = ref(false)
const position = ref({ left: 0, top: 0, width: props.width })
const isDragging = ref(false)
const isResizing = ref(false)
const cardElement = ref(null)

let dragState = null
let resizeState = null
let dragFrame = 0
let revealTargets = []
const originalContentStyles = new WeakMap()

function normalizeFileName(fileName) {
  return fileName.normalize('NFKC').trim().toLocaleLowerCase()
}

function containsFiles(event) {
  return Array.from(event.dataTransfer?.types || []).includes('Files')
}

function handleDragOver(event) {
  if (!containsFiles(event)) return
  event.preventDefault()
  event.dataTransfer.dropEffect = 'copy'
}

function getRenderedSize(width = position.value.width) {
  return {
    width,
    height: width * props.cardAspectRatio,
  }
}

function getRevealWindowRect() {
  const card = cardElement.value
  if (!card) return null

  const rect = card.getBoundingClientRect()
  const border = props.frameBorder

  return {
    left: rect.left + border.left,
    top: rect.top + border.top,
    right: rect.right - border.right,
    bottom: rect.bottom - border.bottom,
  }
}

function getIntersection(first, second) {
  const left = Math.max(first.left, second.left)
  const top = Math.max(first.top, second.top)
  const right = Math.min(first.right, second.right)
  const bottom = Math.min(first.bottom, second.bottom)

  if (right <= left || bottom <= top) return null

  return { left, top, right, bottom }
}

function rememberContentStyles(content) {
  if (originalContentStyles.has(content)) return

  originalContentStyles.set(content, {
    opacity: content.style.opacity,
    clipPath: content.style.clipPath,
    pointerEvents: content.style.pointerEvents,
  })
}

function restoreContent(content) {
  const original = originalContentStyles.get(content)
  if (!original) return

  content.style.opacity = original.opacity
  content.style.clipPath = original.clipPath
  content.style.pointerEvents = original.pointerEvents
}

function hideRevealTargets() {
  revealTargets.forEach(({ content }) => restoreContent(content))
  emit('targets-revealed', [])
}

function findRevealTargets() {
  if (typeof document === 'undefined') return []

  return Array.from(document.querySelectorAll(props.targetSelector))
    .map(target => ({
      target,
      content: target.matches(props.contentSelector)
        ? target
        : target.querySelector(props.contentSelector),
    }))
    .filter(item => item.content)
}

function updateRevealTargets() {
  if (!visible.value || !cardElement.value) {
    hideRevealTargets()
    return
  }

  revealTargets = findRevealTargets()
  const windowRect = getRevealWindowRect()
  if (!windowRect) return

  const activeTargets = []

  revealTargets.forEach(({ target, content }) => {
    rememberContentStyles(content)
    const targetRect = target.getBoundingClientRect()
    const intersection = getIntersection(windowRect, targetRect)

    if (!intersection) {
      restoreContent(content)
      return
    }

    const clipTop = intersection.top - targetRect.top
    const clipRight = targetRect.right - intersection.right
    const clipBottom = targetRect.bottom - intersection.bottom
    const clipLeft = intersection.left - targetRect.left

    content.style.opacity = '1'
    content.style.pointerEvents = 'none'
    content.style.clipPath = `inset(${clipTop}px ${clipRight}px ${clipBottom}px ${clipLeft}px)`

    activeTargets.push({
      target,
      content,
      intersection: { ...intersection },
    })
  })

  emit('targets-revealed', activeTargets)
}

function scheduleTargetUpdate() {
  if (dragFrame) return

  dragFrame = window.requestAnimationFrame(() => {
    dragFrame = 0
    updateRevealTargets()
  })
}

function clampPosition(left, top, width = position.value.width) {
  const edge = 12
  const { height } = getRenderedSize(width)
  const scrollLeft = window.scrollX
  const scrollTop = window.scrollY
  const minLeft = scrollLeft + edge + width / 2
  const maxLeft = scrollLeft + window.innerWidth - edge - width / 2
  const minTop = scrollTop + edge + height / 2
  const maxTop = scrollTop + window.innerHeight - edge - height / 2

  return {
    left: Math.min(Math.max(left, minLeft), Math.max(minLeft, maxLeft)),
    top: Math.min(Math.max(top, minTop), Math.max(minTop, maxTop)),
  }
}

function getViewportMaxCardWidth() {
  const edge = 12
  const maxWidthByViewport = Math.max(1, window.innerWidth - edge * 2)
  const maxWidthByHeight = Math.max(1, (window.innerHeight - edge * 2) / props.cardAspectRatio)
  return Math.min(maxWidthByViewport, maxWidthByHeight)
}

function getInitialCardWidth() {
  return Math.min(props.width, getViewportMaxCardWidth())
}

function startDragging(event) {
  if (!visible.value || event.button !== 0 || resizeState) return
  if (dragState) return

  const card = event.currentTarget
  const rect = card.getBoundingClientRect()
  dragState = {
    pointerId: event.pointerId ?? 'mouse',
    offsetX: event.clientX - rect.left,
    offsetY: event.clientY - rect.top,
  }
  isDragging.value = true
  card.setPointerCapture?.(event.pointerId)
  window.addEventListener('pointermove', dragCard)
  window.addEventListener('pointerup', stopDragging)
  window.addEventListener('pointercancel', stopDragging)
  window.addEventListener('mousemove', dragCard)
  window.addEventListener('mouseup', stopDragging)
  event.preventDefault()
}

function startResizing(event, direction) {
  if (!visible.value || event.button !== 0 || dragState || resizeState) return

  const handle = event.currentTarget
  resizeState = {
    pointerId: event.pointerId ?? 'mouse',
    direction,
    startX: event.clientX,
    startY: event.clientY,
    startPosition: { ...position.value },
  }
  isResizing.value = true
  handle.setPointerCapture?.(event.pointerId)
  window.addEventListener('pointermove', resizeCard)
  window.addEventListener('pointerup', stopResizing)
  window.addEventListener('pointercancel', stopResizing)
  window.addEventListener('mousemove', resizeCard)
  window.addEventListener('mouseup', stopResizing)
  event.preventDefault()
}

function startMouseResizing(event, direction) {
  if (resizeState) return
  startResizing(event, direction)
}

function startMouseDragging(event) {
  if (dragState) return
  startDragging(event)
}

function matchesDragEvent(event) {
  if (!dragState) return false
  if (event.pointerId !== undefined) return dragState.pointerId === event.pointerId
  return dragState.pointerId === 'mouse'
}

function dragCard(event) {
  if (!matchesDragEvent(event)) return

  const left = event.clientX - dragState.offsetX + position.value.width / 2 + window.scrollX
  const top = event.clientY - dragState.offsetY + getRenderedSize().height / 2 + window.scrollY
  position.value = {
    ...position.value,
    ...clampPosition(left, top),
  }
  emit('dragged', { position: { ...position.value } })
  scheduleTargetUpdate()
}

function matchesResizeEvent(event) {
  if (!resizeState) return false
  if (event.pointerId !== undefined) return resizeState.pointerId === event.pointerId
  return resizeState.pointerId === 'mouse'
}

function resizeCard(event) {
  if (!matchesResizeEvent(event)) return

  const { direction, startPosition } = resizeState
  const deltaX = event.clientX - resizeState.startX
  const deltaY = event.clientY - resizeState.startY
  const hasWest = direction.includes('w')
  const hasEast = direction.includes('e')
  const hasNorth = direction.includes('n')
  const hasSouth = direction.includes('s')
  const widthDelta = hasWest ? -deltaX : hasEast ? deltaX : null
  const heightDelta = hasNorth
    ? -deltaY / props.cardAspectRatio
    : hasSouth
      ? deltaY / props.cardAspectRatio
      : null
  const sizeDelta = widthDelta === null
    ? heightDelta
    : heightDelta === null
      ? widthDelta
      : Math.abs(widthDelta) >= Math.abs(heightDelta) ? widthDelta : heightDelta
  const maxWidth = getViewportMaxCardWidth()
  const width = Math.min(maxWidth, Math.max(props.minWidth, startPosition.width + sizeDelta))
  const nextPosition = {
    ...startPosition,
    width,
  }

  if (hasWest) nextPosition.left = startPosition.left + (startPosition.width - width) / 2
  if (hasEast) nextPosition.left = startPosition.left + (width - startPosition.width) / 2
  if (hasNorth) nextPosition.top = startPosition.top + (startPosition.width - width) * props.cardAspectRatio / 2
  if (hasSouth) nextPosition.top = startPosition.top + (width - startPosition.width) * props.cardAspectRatio / 2

  position.value = {
    ...nextPosition,
    ...clampPosition(nextPosition.left, nextPosition.top, width),
  }
  emit('dragged', { position: { ...position.value }, resizing: true })
  scheduleTargetUpdate()
}

function stopDragging(event) {
  if (event && !matchesDragEvent(event)) return

  const card = cardElement.value
  if (typeof dragState.pointerId === 'number' && card?.hasPointerCapture?.(dragState.pointerId)) {
    card.releasePointerCapture(dragState.pointerId)
  }
  dragState = null
  isDragging.value = false
  window.removeEventListener('pointermove', dragCard)
  window.removeEventListener('pointerup', stopDragging)
  window.removeEventListener('pointercancel', stopDragging)
  window.removeEventListener('mousemove', dragCard)
  window.removeEventListener('mouseup', stopDragging)
  updateRevealTargets()
}

function stopResizing(event) {
  if (event && !matchesResizeEvent(event)) return

  resizeState = null
  isResizing.value = false
  window.removeEventListener('pointermove', resizeCard)
  window.removeEventListener('pointerup', stopResizing)
  window.removeEventListener('pointercancel', stopResizing)
  window.removeEventListener('mousemove', resizeCard)
  window.removeEventListener('mouseup', stopResizing)
  updateRevealTargets()
}

function getVisiblePosition(event) {
  const edge = 12
  const availableWidth = Math.max(1, window.innerWidth - edge * 2)
  const renderedWidth = Math.min(getInitialCardWidth(), availableWidth)
  const renderedHeight = renderedWidth * props.cardAspectRatio
  const halfWidth = renderedWidth / 2
  const halfHeight = renderedHeight / 2

  const clientX = Math.min(
    Math.max(event.clientX, edge + halfWidth),
    window.innerWidth - edge - halfWidth,
  )
  const clientY = Math.min(
    Math.max(event.clientY, edge + halfHeight),
    window.innerHeight - edge - halfHeight,
  )

  return {
    left: clientX + window.scrollX,
    top: clientY + window.scrollY,
    width: renderedWidth,
  }
}

async function handleDrop(event) {
  if (!containsFiles(event)) return
  event.preventDefault()

  const files = Array.from(event.dataTransfer?.files || [])
  const acceptedName = normalizeFileName(props.acceptedFileName)
  const matchedFile = files.find(file => normalizeFileName(file.name) === acceptedName)

  if (!matchedFile) {
    emit('rejected', files)
    return
  }

  position.value = getVisiblePosition(event)
  visible.value = true
  await nextTick()
  updateRevealTargets()
  emit('revealed', {
    file: matchedFile,
    position: { ...position.value },
  })
}

function hide() {
  stopDragging()
  stopResizing()
  hideRevealTargets()
  visible.value = false
}

function revealAt(left, top) {
  const width = getInitialCardWidth()
  position.value = {
    ...clampPosition(left, top, width),
    width,
  }
  visible.value = true
  nextTick(updateRevealTargets)
}

defineExpose({ hide, revealAt, refreshRevealTargets: updateRevealTargets })

onMounted(() => {
  window.addEventListener('dragover', handleDragOver)
  window.addEventListener('drop', handleDrop)
  window.addEventListener('resize', scheduleTargetUpdate, { passive: true })
  window.addEventListener('scroll', scheduleTargetUpdate, { passive: true, capture: true })
})

onBeforeUnmount(() => {
  stopDragging()
  stopResizing()
  hideRevealTargets()
  if (dragFrame) window.cancelAnimationFrame(dragFrame)
  window.removeEventListener('dragover', handleDragOver)
  window.removeEventListener('drop', handleDrop)
  window.removeEventListener('resize', scheduleTargetUpdate)
  window.removeEventListener('scroll', scheduleTargetUpdate, true)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="file-reveal">
      <div
        v-if="visible"
        class="file-drop-reveal"
        :class="{ 'is-dragging': isDragging, 'is-resizing': isResizing }"
        :style="{
          left: `${position.left}px`,
          top: `${position.top}px`,
          width: `${position.width}px`,
          height: `${position.width * props.cardAspectRatio}px`,
          maxWidth: 'calc(100vw - 24px)',
          maxHeight: 'calc(100vh - 24px)',
          pointerEvents: 'auto',
          zIndex: 10000,
        }"
        ref="cardElement"
        role="application"
        :aria-label="revealAlt"
        @pointerdown="startDragging"
        @pointermove="dragCard"
        @pointerup="stopDragging"
        @pointercancel="stopDragging"
        @mousedown="startMouseDragging"
        @dragstart.prevent
      >
        <div
          class="file-drop-reveal__frame"
          :style="{
            borderStyle: 'solid',
            borderWidth: `${props.frameBorder.top}px ${props.frameBorder.right}px ${props.frameBorder.bottom}px ${props.frameBorder.left}px`,
            borderImageSource: `url(${revealImage})`,
            borderImageSlice: `${props.frameSlice.top} ${props.frameSlice.right} ${props.frameSlice.bottom} ${props.frameSlice.left} fill`,
            borderImageWidth: `${props.frameBorder.top}px ${props.frameBorder.right}px ${props.frameBorder.bottom}px ${props.frameBorder.left}px`,
            borderImageRepeat: 'stretch',
          }"
          aria-hidden="true"
        ></div>
        <span
          v-for="handle in RESIZE_HANDLES"
          :key="handle"
          class="file-drop-reveal__resize-handle"
          :class="`file-drop-reveal__resize-handle--${handle}`"
          :aria-label="`调整解密卡大小（${handle}）`"
          @pointerdown.stop.prevent="startResizing($event, handle)"
          @mousedown.stop.prevent="startMouseResizing($event, handle)"
        ></span>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.file-drop-reveal {
  position: absolute;
  z-index: 10000;
  height: auto;
  display: block;
  max-width: calc(100vw - 24px);
  border: 0;
  pointer-events: auto;
  user-select: none;
  transform: translate(-50%, -50%);
  filter: drop-shadow(0 16px 28px rgba(15, 27, 45, .28));
  cursor: grab;
  touch-action: none;
  background: rgba(255, 255, 255, .001);
  box-sizing: border-box;
}

.file-drop-reveal.is-dragging {
  cursor: grabbing;
}

.file-drop-reveal.is-resizing {
  cursor: default;
}

.file-drop-reveal__frame {
  position: absolute;
  inset: 0;
  display: block;
  box-sizing: border-box;
  pointer-events: none;
  user-select: none;
}

.file-drop-reveal__resize-handle {
  position: absolute;
  z-index: 2;
  display: block;
  background: rgba(255, 255, 255, 0);
  touch-action: none;
}

.file-drop-reveal__resize-handle:hover {
  background: rgba(255, 255, 255, .12);
}

.file-drop-reveal__resize-handle--n,
.file-drop-reveal__resize-handle--s {
  left: 14%;
  width: 72%;
  height: 12px;
}

.file-drop-reveal__resize-handle--n {
  top: -6px;
  cursor: ns-resize;
}

.file-drop-reveal__resize-handle--s {
  bottom: -6px;
  cursor: ns-resize;
}

.file-drop-reveal__resize-handle--e,
.file-drop-reveal__resize-handle--w {
  top: 14%;
  width: 12px;
  height: 72%;
}

.file-drop-reveal__resize-handle--e {
  right: -6px;
  cursor: ew-resize;
}

.file-drop-reveal__resize-handle--w {
  left: -6px;
  cursor: ew-resize;
}

.file-drop-reveal__resize-handle--ne,
.file-drop-reveal__resize-handle--se,
.file-drop-reveal__resize-handle--sw,
.file-drop-reveal__resize-handle--nw {
  width: 18px;
  height: 18px;
}

.file-drop-reveal__resize-handle--ne {
  top: -9px;
  right: -9px;
  cursor: nesw-resize;
}

.file-drop-reveal__resize-handle--se {
  right: -9px;
  bottom: -9px;
  cursor: nwse-resize;
}

.file-drop-reveal__resize-handle--sw {
  bottom: -9px;
  left: -9px;
  cursor: nesw-resize;
}

.file-drop-reveal__resize-handle--nw {
  top: -9px;
  left: -9px;
  cursor: nwse-resize;
}

.file-reveal-enter-active {
  transition:
    opacity .24s ease,
    transform .32s cubic-bezier(.2, .85, .35, 1.2);
}

.file-reveal-leave-active {
  transition:
    opacity .18s ease,
    transform .18s ease;
}

.file-reveal-enter-from,
.file-reveal-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(.82);
}
</style>
