<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import defaultRevealImage from '../../素材/少儿频道页/解密卡.png'

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
    default: 420,
  },
})

const emit = defineEmits(['revealed', 'rejected'])

const visible = ref(false)
const position = ref({ left: 0, top: 0, width: props.width })

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

function getVisiblePosition(event) {
  const edge = 12
  const availableWidth = Math.max(1, window.innerWidth - edge * 2)
  const renderedWidth = Math.min(props.width, availableWidth)
  const renderedHeight = renderedWidth * (721 / 1024)
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

function handleDrop(event) {
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
  emit('revealed', {
    file: matchedFile,
    position: { ...position.value },
  })
}

function hide() {
  visible.value = false
}

function revealAt(left, top) {
  position.value = {
    left,
    top,
    width: Math.min(props.width, Math.max(1, window.innerWidth - 24)),
  }
  visible.value = true
}

defineExpose({ hide, revealAt })

onMounted(() => {
  window.addEventListener('dragover', handleDragOver)
  window.addEventListener('drop', handleDrop)
})

onBeforeUnmount(() => {
  window.removeEventListener('dragover', handleDragOver)
  window.removeEventListener('drop', handleDrop)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="file-reveal">
      <img
        v-if="visible"
        class="file-drop-reveal"
        :src="revealImage"
        :alt="revealAlt"
        :style="{
          left: `${position.left}px`,
          top: `${position.top}px`,
          width: `${position.width}px`,
        }"
        draggable="false"
      >
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
  pointer-events: none;
  user-select: none;
  transform: translate(-50%, -50%);
  filter: drop-shadow(0 16px 28px rgba(15, 27, 45, .28));
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
