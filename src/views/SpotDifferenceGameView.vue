<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import puzzleLeft from '../../素材/少儿频道页/找不同1-1.png'
import puzzleRight from '../../素材/少儿频道页/找不同1-2.png'
import puzzleAnswer from '../../素材/少儿频道页/找不同1-答案.png'
import rewardCard from '../../素材/少儿频道页/解密卡.png'

const differences = [
  { id: 1, label: '左上角香肠', left: 11.6, top: 9.4, width: 11.9, height: 18.5 },
  { id: 2, label: '番茄酱瓶图案', left: 30.1, top: 2.2, width: 11.7, height: 18.9 },
  { id: 3, label: '右上角背景', left: 75.4, top: 0.2, width: 12, height: 18.9 },
  { id: 4, label: '披萨上的芝士', left: 56, top: 27.5, width: 12, height: 19 },
  { id: 5, label: '左下角奶酪', left: 0, top: 62.3, width: 11.8, height: 18.9 },
  { id: 6, label: '下方番茄', left: 24.9, top: 77.6, width: 12, height: 19 },
  { id: 7, label: '披萨旁的叶子', left: 58.4, top: 66, width: 12, height: 19 },
  { id: 8, label: '右下角橄榄', left: 88, top: 80.6, width: 12, height: 19 },
]

const foundIds = ref([])
const misses = ref(0)
const showAnswer = ref(false)
const showMissTip = ref(false)
const hintId = ref(null)
let missTimer
let hintTimer

const foundCount = computed(() => foundIds.value.length)
const completed = computed(() => foundCount.value === differences.length)
const progress = computed(() => `${(foundCount.value / differences.length) * 100}%`)

function markDifference(id) {
  if (!foundIds.value.includes(id)) {
    foundIds.value.push(id)
  }
  hintId.value = null
}

function registerMiss() {
  if (completed.value) return
  misses.value += 1
  showMissTip.value = true
  window.clearTimeout(missTimer)
  missTimer = window.setTimeout(() => {
    showMissTip.value = false
  }, 1100)
}

function giveHint() {
  const next = differences.find(item => !foundIds.value.includes(item.id))
  if (!next) return
  hintId.value = next.id
  window.clearTimeout(hintTimer)
  hintTimer = window.setTimeout(() => {
    hintId.value = null
  }, 1800)
}

function resetGame() {
  foundIds.value = []
  misses.value = 0
  hintId.value = null
  showAnswer.value = false
}

function downloadReward() {
  const link = document.createElement('a')
  link.href = rewardCard
  link.download = '？？？.png'
  link.style.display = 'none'
  link.addEventListener('click', event => event.stopPropagation())
  document.body.appendChild(link)
  link.click()
  link.remove()
}

onBeforeUnmount(() => {
  window.clearTimeout(missTimer)
  window.clearTimeout(hintTimer)
})
</script>

<template>
  <div class="spot-game-page">
    <header class="channel-header">
      <div class="utility-strip">
        <div class="header-width">
          <span>▱ 阳光少儿多媒体网络电视台（CH-14 HD）</span>
          <span>▶ 益智小游戏 · 快乐观察，聪明成长</span>
          <div>
            <button type="button">▯ 少儿客户端APP</button>
            <button type="button">◉ 游戏记录</button>
          </div>
        </div>
      </div>

      <div class="brand-strip">
        <div class="header-width">
          <div class="channel-brand">
            <div class="sun-logo">☀</div>
            <div>
              <h1>阳光少儿 <b>TV-HD</b></h1>
              <p>KIDS CCTV.CN 2014</p>
            </div>
          </div>
          <div class="game-title">
            <span>观察力训练营</span>
            <strong>找不同大挑战</strong>
          </div>
          <a href="#/youth-channel">返回少儿频道</a>
        </div>
      </div>

      <nav class="channel-nav">
        <div class="header-width">
          <a href="#/youth-channel">⌂ 首页</a>
          <button type="button">动画片库</button>
          <button type="button">少儿影院</button>
          <button type="button" class="active">益智小游戏</button>
          <button type="button">大风车课堂</button>
          <button type="button">才艺作品展</button>
        </div>
      </nav>
    </header>

    <main class="game-shell">
      <div class="page-title-row">
        <h2 class="page-title">找不同大挑战</h2>
        <span class="page-author">作者：陈晖</span>
      </div>

      <section class="status-panel">
        <div class="progress-copy">
          <span>本关进度</span>
          <strong>{{ foundCount }} / {{ differences.length }}</strong>
        </div>
        <div class="progress-track"><i :style="{ width: progress }"></i></div>
        <span class="miss-count">点错 {{ misses }} 次</span>
        <button type="button" class="hint-button" @click="giveHint">💡 给我提示</button>
        <button type="button" class="answer-button" @click="showAnswer = true">查看答案</button>
      </section>

      <section class="puzzle-panel">
        <div class="instruction">
          <strong>第1关 · 松鼠披萨派对</strong>
          <span>点击任意一张图片中的不同之处</span>
        </div>

        <div class="puzzle-grid">
          <div
            v-for="(image, imageIndex) in [puzzleLeft, puzzleRight]"
            :key="image"
            class="image-board"
            @click="registerMiss"
          >
            <div class="image-label">{{ imageIndex === 0 ? '图 A' : '图 B' }}</div>
            <img :src="image" :alt="imageIndex === 0 ? '找不同图片A' : '找不同图片B'">
            <button
              v-for="item in differences"
              :key="item.id"
              type="button"
              class="difference-spot"
              :class="{
                found: foundIds.includes(item.id),
                hint: hintId === item.id,
              }"
              :style="{
                left: `${item.left}%`,
                top: `${item.top}%`,
                width: `${item.width}%`,
                height: `${item.height}%`,
              }"
              :aria-label="item.label"
              @click.stop="markDifference(item.id)"
            >
              <span v-if="foundIds.includes(item.id)">✓</span>
            </button>
          </div>
        </div>

        <Transition name="tip">
          <div v-if="showMissTip" class="miss-tip">再仔细看看，这里好像一样哦！</div>
        </Transition>

        <div v-if="completed" class="complete-card">
          <div class="stars">★ ★ ★</div>
          <h3>太棒了，全部找到了！</h3>
          <p>你成功发现了全部8处不同，真是一位细心的孩子呀！</p>
          <div>
            <button type="button" @click="resetGame">再玩一次</button>
            <button type="button" class="secondary" @click="downloadReward">领取奖励</button>
          </div>
        </div>
      </section>

    </main>

    <footer>
      <strong>阳光少儿 TV-HD</strong>
      <span>健康内容 · 快乐成长 · 益智启蒙</span>
      <p>本游戏适合6—12岁儿童，请注意合理安排游戏时间</p>
    </footer>

    <div v-if="showAnswer" class="answer-modal" role="dialog" aria-modal="true" aria-label="找不同答案">
      <div class="answer-dialog">
        <div class="answer-heading">
          <div>
            <span>ANSWER</span>
            <h3>本关答案 · 共8处不同</h3>
          </div>
          <button type="button" aria-label="关闭答案" @click="showAnswer = false">×</button>
        </div>
        <img :src="puzzleAnswer" alt="找不同大挑战答案图">
        <p>红框标记的位置就是两幅图片的不同之处。</p>
        <button type="button" class="close-answer" @click="showAnswer = false">继续挑战</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.spot-game-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #edf2f5;
  color: #24323b;
  font-family: Arial, "Microsoft YaHei", sans-serif;
}

button,
a {
  font: inherit;
}

.header-width,
.game-shell {
  width: min(100% - 48px, 1120px);
  margin: 0 auto;
}

.utility-strip {
  background: #253440;
  color: #cbd4da;
  font-size: 11px;
}

.utility-strip .header-width {
  min-height: 31px;
  display: flex;
  align-items: center;
  gap: 28px;
}

.utility-strip div > div {
  display: flex;
  gap: 16px;
  margin-left: auto;
}

.utility-strip button {
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  pointer-events: none;
}

.brand-strip {
  background: #fff;
}

.brand-strip .header-width {
  min-height: 78px;
  display: flex;
  align-items: center;
  gap: 30px;
}

.channel-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sun-logo {
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #ffb718;
  color: #fff;
  font-size: 31px;
}

.channel-brand h1 {
  margin: 0;
  color: #ff6a2e;
  font-size: 24px;
}

.channel-brand h1 b {
  padding: 3px 6px;
  border-radius: 4px;
  background: #29a8e8;
  color: #fff;
  font-size: 12px;
}

.channel-brand p {
  margin: 2px 0 0;
  color: #9ba4aa;
  font-size: 9px;
  letter-spacing: 2px;
}

.game-title {
  padding-left: 28px;
  border-left: 1px solid #e1e5e8;
}

.game-title span,
.game-title strong {
  display: block;
}

.game-title span {
  color: #999;
  font-size: 11px;
}

.game-title strong {
  margin-top: 5px;
  color: #2d9ed4;
  font-size: 19px;
}

.brand-strip a {
  margin-left: auto;
  padding: 9px 16px;
  border: 1px solid #d9e0e4;
  border-radius: 3px;
  color: #67747d;
  font-size: 12px;
  text-decoration: none;
}

.channel-nav {
  background: linear-gradient(90deg, #ff6932, #f3a408);
}

.channel-nav .header-width {
  display: flex;
}

.channel-nav button,
.channel-nav a {
  min-height: 39px;
  display: flex;
  align-items: center;
  padding: 0 26px;
  border: 0;
  background: transparent;
  color: #fff;
  font-size: 13px;
  text-decoration: none;
  pointer-events: none;
}

.channel-nav a {
  pointer-events: auto;
}

.channel-nav .active {
  background: rgba(184, 58, 10, 0.28);
}

.game-shell {
  flex: 1;
  padding: 28px 0 36px;
}

.page-title {
  margin: 0;
  color: #263943;
  font-size: 36px;
  line-height: 1.2;
}

.page-title-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.page-author {
  flex-shrink: 0;
  color: #7b8a92;
  font-size: 14px;
  white-space: nowrap;
}

.status-panel {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 16px 24px;
  border: 1px solid #e0e5e8;
  background: #fff;
  box-shadow: 0 2px 7px rgba(45, 68, 80, .08);
}

.progress-copy {
  display: flex;
  align-items: baseline;
  gap: 10px;
  white-space: nowrap;
}

.progress-copy span,
.miss-count {
  color: #83919a;
  font-size: 12px;
}

.progress-copy strong {
  color: #ff6b2d;
  font-size: 21px;
}

.progress-track {
  max-width: 330px;
  height: 10px;
  flex: 1;
  overflow: hidden;
  border-radius: 8px;
  background: #e7edf0;
}

.progress-track i {
  height: 100%;
  display: block;
  border-radius: inherit;
  background: linear-gradient(90deg, #ff9d2e, #ff6034);
  transition: width .35s ease;
}

.status-panel button {
  padding: 8px 14px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.hint-button {
  margin-left: auto;
  border: 1px solid #f3c64a;
  background: #fff8d7;
  color: #9a7210;
}

.answer-button {
  border: 1px solid #cbd7de;
  background: #f5f8fa;
  color: #63737c;
}

.puzzle-panel {
  position: relative;
  margin-top: 18px;
  padding: 22px;
  border: 1px solid #dfe5e8;
  border-radius: 7px;
  background: #fff;
  box-shadow: 0 4px 16px rgba(34, 57, 69, .08);
}

.instruction {
  display: flex;
  align-items: center;
  margin-bottom: 17px;
}

.instruction strong {
  color: #273943;
  font-size: 18px;
}

.instruction span {
  margin-left: auto;
  color: #849198;
  font-size: 12px;
}

.puzzle-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.image-board {
  position: relative;
  overflow: hidden;
  border: 4px solid #d7e3e8;
  border-radius: 13px;
  background: #d7e3e8;
  cursor: crosshair;
  user-select: none;
}

.image-board img {
  width: 100%;
  display: block;
  pointer-events: none;
}

.image-label {
  position: absolute;
  z-index: 3;
  top: 10px;
  left: 10px;
  padding: 4px 10px;
  border-radius: 12px;
  background: rgba(28, 50, 62, .78);
  color: #fff;
  font-size: 11px;
  pointer-events: none;
}

.difference-spot {
  position: absolute;
  z-index: 2;
  padding: 0;
  border: 3px solid transparent;
  border-radius: 50%;
  background: transparent;
  cursor: crosshair;
}

.difference-spot.found {
  border-color: #ff3b30;
  background: rgba(255, 59, 48, .12);
  animation: found-pop .35s ease;
}

.difference-spot.found span {
  position: absolute;
  top: -9px;
  right: -7px;
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
  border: 2px solid #fff;
  border-radius: 50%;
  background: #ff3b30;
  color: #fff;
  font-size: 12px;
}

.difference-spot.hint:not(.found) {
  border-color: #ffd52c;
  background: rgba(255, 226, 73, .22);
  animation: hint-pulse .6s ease infinite alternate;
}

@keyframes found-pop {
  from { transform: scale(.55); opacity: .25; }
}

@keyframes hint-pulse {
  to { box-shadow: 0 0 0 10px rgba(255, 213, 44, 0); }
}

.miss-tip {
  position: absolute;
  z-index: 5;
  top: 74px;
  left: 50%;
  padding: 10px 19px;
  border-radius: 22px;
  background: rgba(34, 51, 61, .9);
  color: #fff;
  font-size: 13px;
  transform: translateX(-50%);
}

.tip-enter-active,
.tip-leave-active {
  transition: .2s ease;
}

.tip-enter-from,
.tip-leave-to {
  opacity: 0;
  transform: translate(-50%, -8px);
}

.complete-card {
  margin-top: 20px;
  padding: 22px;
  border: 2px solid #ffd85a;
  border-radius: 8px;
  background: #fff9db;
  text-align: center;
}

.stars {
  color: #ffae19;
  font-size: 25px;
  letter-spacing: 8px;
}

.complete-card h3 {
  margin: 8px 0 5px;
  color: #f06527;
  font-size: 23px;
}

.complete-card p {
  margin: 0 0 14px;
  color: #77858d;
  font-size: 13px;
}

.complete-card button,
.close-answer {
  margin: 0 4px;
  padding: 9px 20px;
  border: 0;
  border-radius: 4px;
  background: #ff7133;
  color: #fff;
  cursor: pointer;
}

.complete-card .secondary {
  border: 1px solid #cad5db;
  background: #fff;
  color: #65757e;
}

footer {
  display: flex;
  align-items: center;
  gap: 25px;
  padding: 24px max(24px, calc((100% - 1120px) / 2));
  background: #25343d;
  color: #95a2a9;
  font-size: 11px;
}

footer strong {
  color: #fff;
  font-size: 14px;
}

footer p {
  margin: 0 0 0 auto;
}

.answer-modal {
  position: fixed;
  z-index: 100;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(20, 35, 44, .82);
}

.answer-dialog {
  width: min(100%, 820px);
  max-height: calc(100vh - 40px);
  padding: 20px;
  overflow: auto;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 20px 60px rgba(0, 0, 0, .35);
}

.answer-heading {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.answer-heading span {
  color: #27a7df;
  font-size: 9px;
  letter-spacing: 2px;
}

.answer-heading h3 {
  margin: 4px 0 0;
  font-size: 20px;
}

.answer-heading button {
  width: 34px;
  height: 34px;
  margin-left: auto;
  border: 0;
  border-radius: 50%;
  background: #edf2f5;
  color: #53636b;
  cursor: pointer;
  font-size: 23px;
}

.answer-dialog img {
  width: 100%;
  display: block;
  border-radius: 5px;
}

.answer-dialog > p {
  color: #78868d;
  font-size: 12px;
  text-align: center;
}

.close-answer {
  display: block;
  margin: 15px auto 0;
}

@media (max-width: 820px) {
  .utility-strip span:nth-child(2),
  .utility-strip div,
  .game-title {
    display: none;
  }

  .puzzle-grid {
    grid-template-columns: 1fr;
  }

  .status-panel {
    flex-wrap: wrap;
  }

  .progress-track {
    min-width: 45%;
  }

  .hint-button {
    margin-left: 0;
  }

}

@media (max-width: 620px) {
  .header-width,
  .game-shell {
    width: min(100% - 20px, 1120px);
  }

  .brand-strip .header-width {
    min-height: 66px;
  }

  .channel-brand h1 {
    font-size: 20px;
  }

  .brand-strip a {
    padding: 7px 10px;
  }

  .channel-nav {
    overflow-x: auto;
  }

  .channel-nav .header-width {
    width: max-content;
  }

  .page-title {
    font-size: 29px;
  }

  .status-panel {
    gap: 11px;
    padding: 13px;
  }

  .progress-track {
    order: 3;
    max-width: none;
    min-width: 100%;
  }

  .miss-count {
    margin-left: auto;
  }

  .puzzle-panel {
    padding: 10px;
  }

  .instruction {
    align-items: flex-start;
    flex-direction: column;
    gap: 5px;
  }

  .instruction span {
    margin-left: 0;
  }

  footer {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }

  footer p {
    margin-left: 0;
  }
}
</style>
