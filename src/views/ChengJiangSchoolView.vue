<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import schoolLogo from '../../素材/学校页/school-logo.png'
import openingCeremony from '../../素材/学校页/开学典礼.png'
import teachingCompetition from '../../素材/学校页/教学评比.png'
import canteenInspection from '../../素材/学校页/食堂视察.png'
import programAtSchool from '../../素材/学校页/节目进校园.png'

const focusItems = [
  {
    image: openingCeremony,
    title: '我校举行2014年秋季开学典礼暨“践行八礼四仪·争做阳光少年”主题少先队活动',
    date: '2014-09-02',
  },
  {
    image: teachingCompetition,
    title: '我校举办教师教学能力评比大赛',
    date: '2014-06-21',
  },
  {
    image: canteenInspection,
    title: '热烈欢迎教育局领导参观我校食堂',
    date: '2014-05-14',
  },
  {
    image: programAtSchool,
    title: '知名儿童节目进入我校举办线下活动',
    date: '2014-04-29',
  },
]

const activeFocusIndex = ref(0)
const activeFocus = computed(() => focusItems[activeFocusIndex.value])
let focusTimer

function showNextFocus() {
  activeFocusIndex.value = (activeFocusIndex.value + 1) % focusItems.length
}

function startFocusTimer() {
  window.clearInterval(focusTimer)
  focusTimer = window.setInterval(showNextFocus, 5000)
}

function selectFocus(index) {
  activeFocusIndex.value = index
  startFocusTimer()
}

onMounted(startFocusTimer)
onBeforeUnmount(() => window.clearInterval(focusTimer))

const navItems = [
  '学校首页',
  '学校概况',
  '德育天地',
  '教学科研',
  '阳光校园',
  '澄江名师',
  '招生招聘',
  '家校互通',
]

const schoolNews = [
  ['澄江实小举行2014年青年教师教学基本功大赛总结表彰会', '09-10'],
  ['我校开展秋季校园消防安全逃生演练暨隐患排查整治', '09-08'],
  ['市教育局专家领导莅临我校指导省教育科研重点课题开题', '09-05'],
  ['澄江实验小学2014级一年级“入学礼”温情启幕', '09-03'],
  ['关于组织参加澄江市第十九届青少年科技创新大赛的通知', '08-29'],
]


const notices = [
  ['2014学年第一学期行政值周及红领巾监督岗轮值安排表', '09-12'],
  ['关于加强2014年秋季学生安全接送及校门周边秩序管理的温馨告知', '09-08'],
  ['澄江实验小学阳光食堂大宗食品原辅料定点采购供货商公示', '09-04'],
  ['2014年度学校公用经费与学生书本杂费免收政策执行情况公开', '08-30'],
]

const services = [
  { icon: '☎', title: '德育热线', text: '心育与家校互动', tone: 'blue' },
  { icon: '✓', title: '学籍办理', text: '转学休学指南', tone: 'gold' },
  { icon: '▰', title: '教师研修', text: '备课与教研网络', tone: 'sky' },
  { icon: '✉', title: '校长信箱', text: '意见建议直达', tone: 'red' },
]
</script>

<template>
  <div class="school-page">
    <div class="school-header">
      <div class="school-utility">
        <div class="school-container utility-inner">
          <span>欢迎访问澄江实验小学官方网站！今天是 2014年9月15日 星期一</span>
          <div class="utility-links">
            <button type="button">教师登录</button>
            <i>|</i>
            <button type="button">家长互动平台</button>
            <i>|</i>
            <button type="button">数字化校园OA</button>
            <i>|</i>
            <button type="button">设为首页</button>
            <i>|</i>
            <button type="button">加入收藏</button>
          </div>
        </div>
      </div>

      <div class="school-container branding">
        <button type="button" class="school-brand">
          <img :src="schoolLogo" alt="澄江实验小学">
        </button>
        <div class="school-tools">
          <strong>博爱 · 求真 · 励志 · 笃行</strong>
        </div>
      </div>

      <div class="school-nav">
        <div class="school-container nav-inner">
          <button
            v-for="(item, index) in navItems"
            :key="item"
            type="button"
            :class="{ active: index === 0 }"
          >
            {{ item }}
          </button>
        </div>
      </div>
    </div>

    <div class="school-content">
      <div class="school-container content-stack">
        <section class="ticker">
          <strong><span>◆</span> 校园快讯</strong>
          <div class="ticker-copy">
            <button type="button">
              <b>【重要通知】</b>2014-2015学年第一学期秋季开学典礼暨安全第一课通知
              <small>(2014-09-01)</small>
            </button>
            <i>|</i>
            <button type="button">
              【教务公示】澄江实验小学2014年一年级新生均衡分班名单公示
            </button>
          </div>
          <span class="ticker-controls">◖　Ⅱ</span>
        </section>

        <section class="lead-grid">
          <article class="hero-card">
            <div class="hero-image">
              <img :key="activeFocus.image" :src="activeFocus.image" :alt="activeFocus.title">
              <span class="focus-label">焦点专题</span>
              <div class="hero-caption">
                <p><time>{{ activeFocus.date }}</time> 校园新闻</p>
                <h1>{{ activeFocus.title }}</h1>
              </div>
            </div>
            <div class="hero-pager">
              <span>澄江焦点播报：第 {{ activeFocusIndex + 1 }} / {{ focusItems.length }} 组精彩图集</span>
              <div>
                <button
                  v-for="(_, index) in focusItems"
                  :key="index"
                  type="button"
                  :class="{ active: index === activeFocusIndex }"
                  :aria-label="`查看第 ${index + 1} 条焦点播报`"
                  @click="selectFocus(index)"
                >
                  {{ index + 1 }}
                </button>
              </div>
            </div>
          </article>

          <article class="news-card">
            <div class="tabs">
              <button type="button" class="active">▧ 学校快讯</button>
              <button type="button">通知公告</button>
              <button type="button">党建之窗</button>
              <button type="button" class="more-button">更多+</button>
            </div>
            <div class="news-body">
              <div class="featured-news">
                <h2><span>置顶</span> 澄江实小喜迎百年校庆筹备工作全面启动</h2>
                <p>2014年9月12日下午，我校在行政楼报告厅举行百年校庆筹备委员会首次工作全会。回溯沧桑百年，传承薪火弦歌，共谋现代化实验名校崭新篇章……</p>
                <time>发布时间：2014-09-12</time>
              </div>
              <ul class="classic-list">
                <li v-for="[title, date] in schoolNews" :key="title">
                  <button type="button"><i></i>{{ title }}</button>
                  <time>[{{ date }}]</time>
                </li>
              </ul>
            </div>
          </article>
        </section>

        <!-- <section class="portal-grid">
          <button
            v-for="portal in portals"
            :key="portal.title"
            type="button"
            class="portal-card"
          >
            <span class="portal-icon" :class="portal.tone">{{ portal.icon }}</span>
            <span><b>{{ portal.title }}</b><small>{{ portal.text }}</small></span>
          </button>
        </section> -->

        <section class="institution-grid">
          <article class="info-card notice-card">
            <div class="card-heading">
              <h2><i></i>重要通知与校务信息公开</h2>
              <button type="button">更多信息公开+</button>
            </div>
            <div class="card-content">
              <div class="notice-feature">
                <h3><span>公告</span>澄江实验小学2014-2015学年度第一学期校历与教学作息表</h3>
                <p>本学期共计21周，严格执行国家课程设置方案与课时计划，严格落实学生阳光体育一小时活动制度，确保教育教学秩序规范有序进行。</p>
              </div>
              <ul class="classic-list notice-list">
                <li v-for="[title, date] in notices" :key="title">
                  <button type="button"><i></i>{{ title }}</button>
                  <time>[{{ date }}]</time>
                </li>
              </ul>
            </div>
          </article>

          <article class="info-card service-card">
            <div class="card-heading">
              <h2><i class="gold-line"></i>家校直通车 &amp; 常用业务导引</h2>
              <span>全天候服务</span>
            </div>
            <div class="card-content">
              <div class="service-grid">
                <button
                  v-for="service in services"
                  :key="service.title"
                  type="button"
                >
                  <span class="service-icon" :class="service.tone">{{ service.icon }}</span>
                  <span><b>{{ service.title }}</b><small>{{ service.text }}</small></span>
                </button>
              </div>
              <div class="reception">
                <span>◷　教务咨询接待日：每周二、周四 14:00 - 16:30</span>
                <button type="button">预约指引</button>
              </div>
            </div>
          </article>
        </section>

        <section class="friend-links">
          <div>
            <b>友情链接：</b>
            <button type="button">国家教育部</button><i>·</i>
            <button type="button">江苏省教育厅</button><i>·</i>
            <button type="button">市教育信息化网</button><i>·</i>
            <button type="button">少先队工作网</button><i>·</i>
            <button type="button">市青少年活动中心</button>
          </div>
          <span>☎　校长信箱：principal@cjsx.cn　|　教务咨询：0510-8688XXXX</span>
        </section>
      </div>
    </div>

    <div class="school-footer">
      <div class="school-container footer-inner">
        <div>
          <p>版权所有 © 2014 澄江实验小学　澄江校区　地址：澄江市教育园区实验路18号　邮编：214400</p>
          <p>澄ICP备11029482号　网站访问总量：1,842,910 次　|　建议分辨率 1024×768 以上　|　推荐使用 IE9+ / 360安全浏览器 / Chrome 浏览</p>
        </div>
        <span>✓ 事业单位网上可信标识</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.school-page {
  --blue: #004c9a;
  --blue-mid: #1664c0;
  --blue-soft: #e6eeff;
  --blue-pale: #eff4ff;
  --red: #bb0027;
  --gold: #8f5a00;
  --ink: #0d1c2e;
  --muted: #5c6572;
  min-height: 100vh;
  background: #f8f9ff;
  color: var(--ink);
  font: 14px/1.55 "Microsoft YaHei", "PingFang SC", Arial, sans-serif;
}

.school-page * {
  box-sizing: border-box;
}

.school-page button {
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: inherit;
  cursor: pointer;
}

.school-container {
  width: min(1280px, calc(100% - 48px));
  margin: 0 auto;
}

.school-header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: #fff;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.06);
}

.school-utility {
  background: var(--blue-pale);
  color: var(--muted);
  font-size: 11px;
}

.utility-inner {
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.utility-links {
  display: flex;
  align-items: center;
  gap: 12px;
  white-space: nowrap;
}

.utility-links button:hover,
.friend-links button:hover {
  color: var(--blue);
  text-decoration: underline;
}

.utility-links i,
.friend-links i {
  color: #c2c6d4;
  font-style: normal;
}

.branding {
  min-height: 78px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}

.school-brand img {
  display: block;
  width: min(500px, 44vw);
  max-height: 58px;
  object-fit: contain;
  object-position: left center;
}

.school-tools {
  display: flex;
  align-items: center;
  gap: 20px;
}

.school-tools > strong {
  padding: 6px 16px;
  border-radius: 4px;
  background: var(--blue-pale);
  color: var(--gold);
  font-family: SimSun, serif;
  letter-spacing: 0.18em;
  white-space: nowrap;
}

.school-nav {
  background: var(--blue-mid);
}

.nav-inner {
  display: flex;
  overflow-x: auto;
}

.nav-inner button {
  flex: 1;
  min-width: 100px;
  padding: 11px 18px;
  color: #d8e4ff;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
}

.nav-inner button:hover,
.nav-inner button.active {
  background: var(--blue);
  color: #fff;
}

.school-content {
  padding: 16px 0 0;
  background: #f8f9ff;
}

.content-stack {
  display: grid;
  gap: 16px;
}

.ticker {
  min-width: 0;
  height: 40px;
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(13, 28, 46, 0.08);
}

.ticker > strong {
  margin-left: 14px;
  padding: 3px 10px;
  border-radius: 3px;
  background: var(--red);
  color: #fff;
  font-size: 12px;
  white-space: nowrap;
}

.ticker-copy {
  min-width: 0;
  flex: 1;
  display: flex;
  gap: 24px;
  overflow: hidden;
  padding: 0 18px;
  white-space: nowrap;
}

.ticker-copy b {
  color: var(--red);
}

.ticker-copy small {
  color: #78808b;
}

.ticker-copy i {
  color: #c2c6d4;
  font-style: normal;
}

.ticker-controls {
  padding-right: 15px;
  color: #78808b;
  white-space: nowrap;
}

.lead-grid,
.institution-grid {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  gap: 16px;
}

.hero-card,
.news-card,
.info-card {
  overflow: hidden;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(13, 28, 46, 0.09);
}

.hero-image {
  position: relative;
  height: 320px;
  overflow: hidden;
  background: var(--blue-soft);
}

.hero-image > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: focus-slide-in 0.45s ease-out;
}

@keyframes focus-slide-in {
  from {
    opacity: 0.35;
    transform: translateX(2%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.hero-image::after {
  content: "";
  position: absolute;
  inset: 45% 0 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.82));
}

.focus-label {
  position: absolute;
  z-index: 2;
  top: 16px;
  left: 16px;
  padding: 2px 9px;
  border-radius: 2px;
  background: var(--red);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
}

.hero-caption {
  position: absolute;
  z-index: 2;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 18px;
  color: #fff;
}

.hero-caption p {
  margin: 0 0 5px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 11px;
}

.hero-caption time {
  margin-right: 8px;
  padding: 2px 5px;
  border-radius: 2px;
  background: rgba(0, 76, 154, 0.88);
  color: #d6e3ff;
}

.hero-caption h1 {
  margin: 0;
  overflow: hidden;
  color: #fff;
  font-size: 19px;
  line-height: 1.45;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.hero-pager {
  min-height: 38px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 16px;
  background: var(--blue-pale);
  color: var(--muted);
  font-size: 11px;
}

.hero-pager div {
  display: flex;
  gap: 5px;
}

.hero-pager button {
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  padding: 0;
  border: 0;
  border-radius: 2px;
  background: #fff;
  color: var(--muted);
  cursor: pointer;
}

.hero-pager button.active {
  background: var(--blue);
  color: #fff;
}

.news-card {
  display: flex;
  flex-direction: column;
}

.tabs,
.card-heading {
  min-height: 43px;
  display: flex;
  align-items: center;
  background: var(--blue-pale);
}

.tabs button {
  align-self: stretch;
  padding: 0 16px;
  border: 0;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
}

.tabs button.active {
  background: #fff;
  box-shadow: inset 0 -2px var(--blue);
  color: var(--blue);
  font-weight: 700;
}

.tabs > .more-button {
  margin-left: auto;
  padding-right: 16px;
  color: var(--muted);
  font-size: 11px;
}

.news-body,
.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 16px;
}

.featured-news,
.notice-feature {
  padding: 10px;
  border-radius: 4px;
  background: var(--blue-pale);
}

.featured-news h2,
.notice-feature h3 {
  margin: 0;
  overflow: hidden;
  color: var(--red);
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.featured-news h2 span,
.notice-feature h3 span {
  margin-right: 7px;
  padding: 2px 5px;
  border-radius: 2px;
  background: var(--red);
  color: #fff;
  font-size: 10px;
}

.notice-feature h3 {
  color: var(--blue);
}

.notice-feature h3 span {
  background: var(--blue);
}

.featured-news p,
.notice-feature p {
  margin: 5px 0 0;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.65;
}

.featured-news time {
  display: block;
  margin-top: 4px;
  color: #78808b;
  font-size: 10px;
  text-align: right;
}

.classic-list {
  display: grid;
  gap: 9px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.classic-list li {
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 12px;
}

.classic-list button {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.classic-list button:hover {
  color: var(--blue);
}

.classic-list button i {
  width: 5px;
  height: 5px;
  flex: 0 0 auto;
  border-radius: 50%;
  background: var(--blue);
}

.classic-list time {
  flex: 0 0 auto;
  color: #78808b;
  font: 10px Consolas, monospace;
}

.portal-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.portal-card {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 15px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(13, 28, 46, 0.09);
  transition: transform 0.16s ease, background 0.16s ease;
}

.portal-card:hover {
  background: var(--blue-pale);
  transform: translateY(-2px);
}

.portal-card > span:last-child,
.service-grid button > span:last-child {
  min-width: 0;
  display: grid;
}

.portal-card b,
.service-grid b {
  font-size: 14px;
}

.portal-card small,
.service-grid small {
  overflow: hidden;
  color: var(--muted);
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.portal-icon,
.service-icon {
  display: grid;
  flex: 0 0 auto;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 5px;
  font-weight: 700;
}

.portal-icon.blue,
.service-icon.blue { background: #d6e3ff; color: var(--blue); }
.portal-icon.gold,
.service-icon.gold { background: #ffddb8; color: #6f4400; }
.portal-icon.red,
.service-icon.red { background: #ffdad8; color: var(--red); }
.portal-icon.sky,
.service-icon.sky { background: #d5e3fc; color: var(--blue-mid); }

.card-heading {
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid #e6eeff;
}

.card-heading h2 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-size: 14px;
}

.card-heading h2 i {
  width: 4px;
  height: 17px;
  border-radius: 99px;
  background: var(--blue);
}

.card-heading h2 i.gold-line {
  background: var(--gold);
}

.card-heading > button,
.card-heading > span {
  color: #78808b;
  font-size: 10px;
}

.notice-list {
  gap: 11px;
}

.service-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 9px;
}

.service-grid button {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 9px;
  border-radius: 4px;
  background: var(--blue-pale);
}

.service-grid button:hover {
  background: var(--blue-soft);
}

.service-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.reception {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: auto;
  padding: 9px 11px;
  border-radius: 4px;
  background: var(--blue-pale);
  color: var(--muted);
  font-size: 11px;
}

.reception button {
  color: var(--blue);
  white-space: nowrap;
}

.friend-links {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 9px 16px;
  border-radius: 4px;
  background: var(--blue-pale);
  color: var(--muted);
  font-size: 11px;
}

.friend-links div {
  display: flex;
  align-items: center;
  gap: 9px;
  flex-wrap: wrap;
}

.friend-links b {
  color: var(--blue);
}

.school-footer {
  margin-top: 32px;
  padding: 24px 0 32px;
  background: #dce9ff;
  color: var(--muted);
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

.footer-inner p {
  margin: 3px 0;
  font-size: 11px;
}

.footer-inner > span {
  flex: 0 0 auto;
  padding: 8px 14px;
  border-radius: 4px;
  background: #fff;
  color: var(--ink);
  font-size: 11px;
}

@media (max-width: 1100px) {
  .school-tools > strong {
    display: none;
  }

  .utility-links button:nth-of-type(n + 4),
  .utility-links i:nth-of-type(n + 4) {
    display: none;
  }
}

@media (max-width: 1000px) {
  .lead-grid,
  .institution-grid {
    grid-template-columns: 1fr;
  }

  .portal-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 680px) {
  .school-container {
    width: min(100% - 24px, 1280px);
  }

  .school-utility {
    display: none;
  }

  .branding {
    min-height: 70px;
  }

  .school-brand img {
    width: min(280px, 65vw);
  }

  .nav-inner {
    width: 100%;
  }

  .ticker-controls {
    display: none;
  }

  .hero-image {
    height: 250px;
  }

  .hero-caption h1 {
    font-size: 15px;
  }

  .portal-grid,
  .service-grid {
    grid-template-columns: 1fr;
  }

  .friend-links,
  .footer-inner {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
