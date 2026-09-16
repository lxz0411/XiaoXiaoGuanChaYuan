<script setup>
import { ref } from 'vue'
import castleAdventure from '../../素材/少儿频道页/城堡奇遇记.jpg'
import frogUnderLotus from '../../素材/少儿频道页/荷叶下的小青蛙.png'
import forestAdventure from '../../素材/少儿频道页/金龟子森林历险记.png'
import futureCity from '../../素材/少儿频道页/未来城市快线.png'
import monkeyAdventure from '../../素材/少儿频道页/小猴淘淘奇幻记.png'
import submarineAdventure from '../../素材/少儿频道页/潜艇总动员.png'
import pinyinAdventure from '../../素材/少儿频道页/快乐拼音小精灵.png'
import craneWish from '../../素材/少儿频道页/千纸鹤的心愿.png'
import smilingSun from '../../素材/少儿频道页/太阳公公笑了.png'

const isPlaying = ref(false)
const activeEpisode = ref(12)

const schedule = [
  { time: '08:30', title: '《七巧板》开心乐园', status: '回放', played: true },
  { time: '12:00', title: '《动画城》神秘剧场', status: '回放', played: true },
  { time: '17:30', title: '《小小观察员》', note: '第12集　一片叶子的旅行', status: '回放', played: true },
  { time: '18:00', title: '《大风车》金龟子城堡奇遇记', status: '直播中', current: true },
  { time: '19:30', title: '《熊出没之夺宝熊兵》暑期特映', status: '预约' },
  { time: '20:30', title: '《智慧树》周末特别派对', status: '预约' },
]

const hotPrograms = [
  { title: '金龟子森林大冒险 2014', category: '少儿益智 · 森林奇遇', score: '9.6', views: '820.5万', image: forestAdventure },
  { title: '小猴淘淘月亮湖大冒险', category: '寓言故事 · 亲子必看', score: '9.4', views: '640.1万', image: monkeyAdventure },
  { title: '拼音王国大闯关 动画版', category: '幼小衔接 · 语言启蒙', score: '9.8', views: '1,290万', image: pinyinAdventure },
  { title: '海底探险小潜艇 电影版', category: '海洋科普 · 3D冒险', score: '9.5', views: '942万', image: submarineAdventure },
]

const artworks = [
  { title: '《太阳公公笑了》', author: '李萌萌（8岁）', city: '北京', votes: '15,240', badge: '特等奖', image: smilingSun },
  { title: '《千纸鹤的心愿》', author: '张天宇（10岁）', city: '上海', votes: '12,890', badge: '一等奖', image: craneWish },
  { title: '《2020未来城市快线》', author: '陈浩（11岁）', city: '广州', votes: '9,840', badge: '创想之星', image: futureCity },
  { title: '《荷叶下的小青蛙》', author: '王思琪（7岁）', city: '武汉', votes: '8,720', badge: '优秀奖', image: frogUnderLotus },
]
</script>

<template>
  <div class="youth-channel-page">
    <header class="channel-header">
      <div class="utility-strip">
        <div class="header-width">
          <span>▱ 阳光少儿多媒体网络电视台（CH-14 HD）</span>
          <span>▶ 24小时儿童卫视直播 · 全国1080P低延时</span>
          <div>
            <button type="button">▯ 少儿客户端APP</button>
            <button type="button">◉ 播放记录</button>
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

          <div class="channel-search">
            <span>搜索：熊出没　、熊孩子与灰太狼、大头儿子...</span>
            <button type="button">⌕ 搜索</button>
          </div>

          <div class="header-actions">
            <button type="button">儿童频道直播</button>
            <button type="button">与你相伴学知识</button>
          </div>
        </div>
      </div>

      <nav class="channel-nav">
        <div class="header-width">
          <button type="button" class="active">⌂ 首页</button>
          <button type="button">动画片库</button>
          <button type="button">少儿影院 <i>1080P</i></button>
          <button type="button">益智小游戏</button>
          <button type="button">大风车课堂</button>
          <button type="button">名校主持人</button>
          <button type="button">特摄摄影大展</button>
          <button type="button">手机客户端下载安装</button>
        </div>
      </nav>
    </header>

    <main class="channel-shell">
      <section class="broadcast-grid">
        <div class="video-panel">
          <div class="video-heading">
            <span>正在热播</span>
            <strong>《大风车》金龟子城堡奇遇记 · 勇气、友谊与探索</strong>
            <i>● HTML5直播</i>
            <b>1080P</b>
          </div>

          <div class="video-screen">
            <img :src="castleAdventure" alt="《大风车》金龟子城堡奇遇记节目画面">
            <button
              type="button"
              class="play-button"
              :aria-label="isPlaying ? '暂停播放' : '开始播放'"
              @click="isPlaying = !isPlaying"
            >
              {{ isPlaying ? 'Ⅱ' : '▶' }}
            </button>
            <div v-if="isPlaying" class="playing-tip">模拟播放中</div>
          </div>

          <div class="player-controls">
            <button type="button" @click="isPlaying = !isPlaying">{{ isPlaying ? 'Ⅱ' : '▶' }}</button>
            <span>08:24 / 20:00</span>
            <div class="progress"><i></i></div>
            <span>🔊</span>
            <span class="quality">1080P</span>
            <span>⚙　⛶</span>
          </div>

          <div class="episodes">
            <span>选集：</span>
            <button
              v-for="episode in [9, 10, 11, 12, 13, 14, 15, 16]"
              :key="episode"
              type="button"
              :class="{ active: activeEpisode === episode }"
              @click="activeEpisode = episode"
            >
              {{ episode }}<template v-if="episode === 12"> 正在播放</template>
            </button>
            <a href="#/youth-channel">全部52集›</a>
          </div>
        </div>

        <aside class="schedule-panel">
          <div class="schedule-title">
            <h2>今日卫视节目表</h2>
            <span>CH-14</span>
          </div>
          <ul>
            <li
              v-for="program in schedule"
              :key="program.time"
              :class="{ current: program.current, played: program.played }"
            >
              <time>{{ program.time }}</time>
              <div>
                <strong>{{ program.title }}</strong>
                <small v-if="program.note">{{ program.note }}</small>
              </div>
              <span>{{ program.status }}</span>
            </li>
          </ul>
          <div class="signal-card">
            <span>◔</span>
            <div>
              <strong>24小时少儿卫视高清直播</strong>
              <small>免费流畅 · 支持手机/平板投屏</small>
            </div>
            <button type="button">立即切换</button>
          </div>
        </aside>
      </section>

      <section class="content-section hot-section">
        <div class="section-heading">
          <div>
            <i class="blue"></i>
            <h2>热门动画放映厅</h2>
            <span>2014暑期档全网首发超清国语配音</span>
          </div>
          <nav>
            <button type="button" class="active">全部热播</button>
            <button type="button">冒险热血</button>
            <button type="button">低幼早教</button>
            <button type="button">经典剧场版</button>
          </nav>
        </div>

        <div class="program-grid">
          <article v-for="program in hotPrograms" :key="program.title" class="program-card">
            <div class="thumb">
              <img :src="program.image" :alt="program.title">
              <span>1080P</span>
            </div>
            <div class="program-name">
              <h3>{{ program.title }}</h3>
              <b>{{ program.score }}</b>
            </div>
            <p>{{ program.category }}</p>
            <small>◉ {{ program.views }}</small>
          </article>
        </div>
      </section>

      <section class="content-section artwork-section">
        <div class="section-heading">
          <div>
            <i class="yellow"></i>
            <h2>全国少儿才艺画摄影展（2014夏季展区）</h2>
            <span>展示阳光新一代小艺术家风采</span>
          </div>
          <button type="button" class="upload-button">⇧ 我要上传作品</button>
        </div>

        <div class="artwork-grid">
          <article v-for="artwork in artworks" :key="artwork.title" class="artwork-card">
            <div class="art-thumb">
              <img :src="artwork.image" :alt="artwork.title">
              <span>{{ artwork.badge }}</span>
            </div>
            <h3>{{ artwork.title }}</h3>
            <p>{{ artwork.city }}市{{ artwork.author }}</p>
            <div>
              <small>▮▮▮ {{ artwork.votes }}</small>
              <button type="button">♡ 给TA点赞</button>
            </div>
          </article>
        </div>
      </section>

      <section class="app-promo">
        <div class="phone-icon">▯</div>
        <div>
          <span>2014 全新移动版客户端</span>
          <h2>阳光少儿手机客户端 iOS / Android 双版上线</h2>
          <p>随时随地看高清动画、听睡前名家故事，支持离线缓存无网也能看！</p>
        </div>
        <div class="download">
          <div class="qr-code">▦</div>
          <div>
            <button type="button">▣　App Store</button>
            <button type="button">▰　Android APK</button>
          </div>
        </div>
      </section>
    </main>

    <footer class="channel-footer">
      <div class="header-width">
        <div class="footer-links">
          <span>关于阳光少儿TV</span>
          <i>·</i>
          <span>家长投诉与举报</span>
          <i>·</i>
          <span>家长监护工程</span>
          <i>·</i>
          <span>少儿频道版权声明</span>
          <i>·</i>
          <span>联系我们与商务合作</span>
          <i>·</i>
          <span>未成年人保护专区</span>
        </div>
        <p>国家广播电视总局网络视听许可证：01082014号　|　网络文化经营许可证：京网文[2014]0802-0024号</p>
        <p>© 2014 阳光少儿网络电视 版权所有　儿童上网安全提示：请在家长指导下合理安排观看时间</p>
        <div class="footer-status">
          <span>● 中国互联网不良信息举报中心</span>
          <span>◉ 全国网络少儿绿色认证</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.youth-channel-page {
  min-height: 100vh;
  background: #f1f5f9;
  color: #26313b;
  font-family: Arial, "Microsoft YaHei", sans-serif;
}

.header-width {
  width: min(100% - 48px, 1120px);
  margin: 0 auto;
}

.utility-strip {
  border-bottom: 1px solid #e7edf2;
  background: #fff;
  color: #7f8b94;
  font-size: 11px;
}

.utility-strip .header-width {
  min-height: 26px;
  display: flex;
  align-items: center;
  gap: 26px;
}

.utility-strip .header-width > div {
  margin-left: auto;
  display: flex;
  gap: 18px;
}

.utility-strip button,
.header-actions button {
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font-size: inherit;
  pointer-events: none;
}

.brand-strip {
  background: #fff;
}

.brand-strip .header-width {
  min-height: 72px;
  display: flex;
  align-items: center;
  gap: 34px;
}

.channel-brand {
  min-width: 240px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.sun-logo {
  width: 43px;
  height: 43px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #ff9c20;
  color: #fff;
  font-size: 27px;
}

.channel-brand h1 {
  margin: 0;
  color: #3c4650;
  font-size: 22px;
  font-weight: 500;
}

.channel-brand h1 b {
  padding: 2px 4px;
  border-radius: 2px;
  background: #269fd1;
  color: #fff;
  font-size: 11px;
  vertical-align: middle;
}

.channel-brand p {
  margin: 3px 0 0;
  color: #a7afb6;
  font-size: 10px;
  letter-spacing: 1px;
}

.channel-search {
  height: 34px;
  min-width: 260px;
  display: flex;
  align-items: center;
  overflow: hidden;
  flex: 1;
  border: 2px solid #ff7740;
  border-radius: 18px;
}

.channel-search span {
  min-width: 0;
  overflow: hidden;
  flex: 1;
  padding-left: 16px;
  color: #9ba4aa;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.channel-search button {
  height: 100%;
  padding: 0 20px;
  border: 0;
  background: #ff7040;
  color: #fff;
  font-size: 12px;
  pointer-events: none;
}

.header-actions {
  display: flex;
  gap: 9px;
}

.header-actions button {
  padding: 8px 10px;
  border: 1px solid #e4edf2;
  border-radius: 4px;
  color: #f08b55;
  white-space: nowrap;
}

.channel-nav {
  background: linear-gradient(90deg, #ff6932, #f3a408);
}

.channel-nav .header-width {
  display: flex;
}

.channel-nav button {
  min-height: 38px;
  padding: 0 24px;
  border: 0;
  background: transparent;
  color: #fff;
  font-size: 13px;
  pointer-events: none;
}

.channel-nav button.active {
  background: rgba(190, 70, 12, 0.26);
}

.channel-nav i {
  margin-left: 3px;
  padding: 2px 4px;
  border-radius: 2px;
  background: #39cf8a;
  font-size: 9px;
  font-style: normal;
}

.channel-shell {
  width: min(100% - 48px, 1120px);
  margin: 0 auto;
  padding: 30px 0 24px;
}

.broadcast-grid {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(290px, 0.95fr);
  gap: 18px;
  align-items: start;
}

.video-panel,
.schedule-panel,
.content-section {
  overflow: hidden;
  border-radius: 10px;
  background: #fff;
}

.video-heading {
  min-height: 43px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 13px;
  background: #182536;
  color: #dce5eb;
  font-size: 15px;
}

.video-heading > span {
  padding: 5px 9px;
  border-radius: 3px;
  background: #ff6935;
  color: #fff;
  font-size: 13px;
}

.video-heading strong {
  min-width: 0;
  overflow: hidden;
  flex: 1;
  font-weight: 400;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.video-heading i {
  color: #45d398;
  font-size: 12px;
  font-style: normal;
}

.video-heading b {
  padding: 4px 9px;
  border-radius: 3px;
  background: #2b394b;
  font-size: 12px;
}

.video-screen {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 8.55;
  background: #111;
}

.video-screen > img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.play-button {
  width: 62px;
  height: 62px;
  position: absolute;
  top: 50%;
  left: 50%;
  display: grid;
  place-items: center;
  border: 3px solid rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  background: #ff6534;
  color: #fff;
  font-size: 26px;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.playing-tip {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 5px 10px;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.68);
  color: #fff;
  font-size: 13px;
}

.player-controls {
  min-height: 31px;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 0 10px;
  background: #1a2530;
  color: #d7dce0;
  font-size: 12px;
}

.player-controls button {
  border: 0;
  background: transparent;
  color: #fff;
  cursor: pointer;
}

.progress {
  height: 3px;
  overflow: hidden;
  flex: 1;
  border-radius: 3px;
  background: #68717a;
}

.progress i {
  width: 42%;
  height: 100%;
  display: block;
  background: #ff703b;
}

.quality {
  padding: 2px 6px;
  border-radius: 2px;
  background: #56616a;
}

.episodes {
  min-height: 50px;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 0 12px;
  color: #8d9ba7;
  font-size: 13px;
}

.episodes button {
  min-width: 34px;
  padding: 6px 8px;
  border: 1px solid #dce5eb;
  border-radius: 3px;
  background: #fff;
  color: #84929d;
  cursor: pointer;
}

.episodes button.active {
  min-width: 75px;
  border-color: #ff7141;
  background: #ff7141;
  color: #fff;
}

.episodes a {
  margin-left: auto;
  color: #39aee1;
  text-decoration: none;
}

.schedule-panel {
  padding: 0 14px 15px;
}

.schedule-title {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eef1f4;
}

.schedule-title h2 {
  margin: 0;
  padding-left: 11px;
  border-left: 4px solid #ff6835;
  font-size: 18px;
  font-weight: 500;
}

.schedule-title span {
  padding: 5px 8px;
  border-radius: 3px;
  background: #edfaff;
  color: #3fb7e7;
  font-size: 11px;
}

.schedule-panel ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.schedule-panel li {
  min-height: 43px;
  display: grid;
  grid-template-columns: 50px 1fr auto;
  align-items: center;
  gap: 5px;
  padding: 5px 0;
  border-bottom: 1px solid #f0f2f4;
  color: #8d979e;
  font-size: 13px;
}

.schedule-panel li.current {
  margin: 0 -14px;
  padding-right: 14px;
  padding-left: 14px;
  background: #fff6ed;
  color: #3e3f40;
}

.schedule-panel li.current time,
.schedule-panel li.current small {
  color: #ff6835;
}

.schedule-panel li.played strong {
  text-decoration: line-through;
}

.schedule-panel li div {
  min-width: 0;
}

.schedule-panel li strong,
.schedule-panel li small {
  display: block;
  overflow: hidden;
  font-weight: 400;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.schedule-panel li small {
  margin-top: 3px;
  font-size: 11px;
}

.schedule-panel li > span {
  padding: 4px 6px;
  border: 1px solid #c8eafa;
  border-radius: 4px;
  color: #32afe4;
  font-size: 11px;
}

.schedule-panel li.current > span {
  border-color: #ff7040;
  background: #ff7040;
  color: #fff;
}

.signal-card {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-top: 13px;
  padding: 11px;
  border: 1px solid #d8edf6;
  border-radius: 5px;
  background: #f4fbfe;
}

.signal-card > span {
  color: #35aedd;
  font-size: 24px;
}

.signal-card div {
  min-width: 0;
  flex: 1;
}

.signal-card strong,
.signal-card small {
  display: block;
  white-space: nowrap;
}

.signal-card strong {
  font-size: 12px;
}

.signal-card small {
  margin-top: 3px;
  color: #8a969d;
  font-size: 10px;
}

.signal-card button {
  padding: 7px 11px;
  border: 0;
  border-radius: 4px;
  background: #23ace2;
  color: #fff;
  font-size: 11px;
  pointer-events: none;
}

.content-section {
  margin-top: 20px;
  padding: 18px;
}

.section-heading,
.section-heading > div {
  display: flex;
  align-items: center;
}

.section-heading {
  justify-content: space-between;
  margin-bottom: 18px;
}

.section-heading i {
  width: 5px;
  height: 22px;
  margin-right: 9px;
  border-radius: 3px;
}

.section-heading i.blue {
  background: #25b6e8;
}

.section-heading i.yellow {
  background: #ffc226;
}

.section-heading h2 {
  margin: 0;
  font-size: 19px;
  font-weight: 500;
}

.section-heading > div > span {
  margin-left: 16px;
  color: #a0a9af;
  font-size: 12px;
}

.section-heading nav {
  display: flex;
  gap: 16px;
}

.section-heading nav button {
  padding: 0;
  border: 0;
  background: transparent;
  color: #777f85;
  font-size: 12px;
  pointer-events: none;
}

.section-heading nav button.active {
  color: #ff7240;
}

.program-grid,
.artwork-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 15px;
}

.program-card,
.artwork-card {
  min-width: 0;
}

.thumb,
.art-thumb {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  background: #eef2f4;
}

.thumb {
  aspect-ratio: 16 / 9;
}

.thumb img,
.art-thumb img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.thumb > span {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  border-radius: 2px;
  background: rgba(31, 43, 52, 0.78);
  color: #fff;
  font-size: 10px;
}

.program-name {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 9px;
}

.program-name h3,
.artwork-card h3 {
  overflow: hidden;
  margin: 0;
  font-size: 15px;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.program-name b {
  color: #ff7041;
  font-size: 15px;
}

.program-card p,
.artwork-card p {
  margin: 5px 0;
  overflow: hidden;
  color: #9aa4ab;
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.program-card small {
  display: block;
  color: #afb7bc;
  font-size: 10px;
  text-align: right;
}

.upload-button {
  padding: 6px 11px;
  border: 1px solid #ffd1bd;
  border-radius: 4px;
  background: #fff8f3;
  color: #ff7a46;
  font-size: 12px;
  pointer-events: none;
}

.artwork-section {
  border-top: 3px solid #ffe071;
}

.artwork-card {
  padding: 8px;
  border: 1px solid #edf0f2;
  border-radius: 5px;
}

.art-thumb {
  aspect-ratio: 4 / 2.65;
}

.art-thumb > span {
  position: absolute;
  right: 7px;
  bottom: 7px;
  padding: 3px 7px;
  border-radius: 3px;
  background: #eef9ff;
  color: #31a9d6;
  font-size: 10px;
}

.artwork-card h3 {
  margin-top: 9px;
}

.artwork-card > div:last-child {
  display: flex;
  justify-content: space-between;
  margin-top: 9px;
  color: #a5adb3;
  font-size: 10px;
}

.artwork-card > div:last-child button {
  padding: 0;
  border: 0;
  background: transparent;
  color: #ff7650;
  font-size: 10px;
  pointer-events: none;
}

.app-promo {
  min-height: 112px;
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 20px;
  padding: 19px 25px;
  border-radius: 10px;
  background: linear-gradient(110deg, #ff5d2e, #ff9b0e);
  color: #fff;
}

.phone-icon,
.qr-code {
  display: grid;
  place-items: center;
  background: #fff;
  color: #ff7337;
}

.phone-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  font-size: 32px;
}

.app-promo > div:nth-child(2) {
  flex: 1;
}

.app-promo > div:nth-child(2) > span {
  padding: 4px 8px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.16);
  font-size: 11px;
}

.app-promo h2 {
  margin: 8px 0 3px;
  font-size: 20px;
  font-weight: 500;
}

.app-promo p {
  margin: 0;
  font-size: 12px;
}

.download {
  display: flex;
  align-items: center;
  gap: 10px;
}

.qr-code {
  width: 58px;
  height: 58px;
  border: 5px solid #fff;
  outline: 1px solid rgba(0, 0, 0, 0.35);
  color: #222;
  font-size: 32px;
}

.download > div:last-child {
  display: grid;
  gap: 6px;
}

.download button {
  min-width: 126px;
  padding: 7px 10px;
  border: 0;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.3);
  color: #fff;
  font-size: 11px;
  text-align: left;
  pointer-events: none;
}

.channel-footer {
  padding: 32px 0 28px;
  border-top: 2px solid #f17b43;
  background: #202d3e;
  color: #7f8d9c;
  font-size: 11px;
  text-align: center;
}

.footer-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 11px;
  color: #a5b0bb;
}

.footer-links i {
  color: #566475;
  font-style: normal;
}

.channel-footer p {
  margin: 14px 0 0;
  line-height: 1.7;
}

.channel-footer p + p {
  margin-top: 3px;
}

.footer-status {
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-top: 18px;
}

.footer-status span:first-child {
  color: #4da98e;
}

@media (max-width: 900px) {
  .header-actions {
    display: none;
  }

  .channel-nav {
    overflow-x: auto;
  }

  .channel-nav .header-width {
    width: max-content;
  }

  .broadcast-grid {
    grid-template-columns: 1fr;
  }

  .schedule-panel {
    display: none;
  }

  .program-grid,
  .artwork-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 620px) {
  .header-width,
  .channel-shell {
    width: min(100% - 20px, 1120px);
  }

  .utility-strip .header-width > span:nth-child(2),
  .utility-strip .header-width > div,
  .channel-search {
    display: none;
  }

  .brand-strip .header-width {
    min-height: 62px;
  }

  .video-heading i,
  .video-heading b,
  .section-heading > div > span,
  .section-heading nav {
    display: none;
  }

  .episodes {
    overflow-x: auto;
  }

  .episodes a {
    display: none;
  }

  .content-section {
    padding: 13px;
  }

  .program-grid,
  .artwork-grid {
    grid-template-columns: 1fr;
  }

  .app-promo {
    align-items: flex-start;
    padding: 18px;
  }

  .phone-icon,
  .download {
    display: none;
  }
}
</style>
