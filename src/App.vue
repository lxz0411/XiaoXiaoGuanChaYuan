<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import ArtDisplayDetailView from './views/ArtDisplayDetailView.vue'
import ArtDisplayView from './views/ArtDisplayView.vue'
import ChengJiangEveningNewsView from './views/ChengJiangEveningNewsView.vue'
import ChengJiangSchoolNewsView from './views/ChengJiangSchoolNewsView.vue'
import ChengJiangSchoolView from './views/ChengJiangSchoolView.vue'
import ChenHuiBlogView from './views/ChenHuiBlogView.vue'
import GologoloSearchView from './views/GologoloSearchView.vue'
import HospitalSystemView from './views/HospitalSystemView.vue'
import IntroView from './views/IntroView.vue'
import LiRanMemorialExhibitionView from './views/LiRanMemorialExhibitionView.vue'
import SpotDifferenceGameView from './views/SpotDifferenceGameView.vue'
import YouthChannelView from './views/YouthChannelView.vue'
import YouthPalaceView from './views/YouthPalaceView.vue'

const hash = ref(window.location.hash)

const routes = {
  '/': { view: IntroView, title: '儿童医院调查事件' },
  '/art-display': { view: ArtDisplayView, title: '无界之象 · 2014当代绘画艺术展' },
  '/art-display/structure-and-gaze': { view: ArtDisplayDetailView, title: '结构与凝视 No.7 - 2014当代艺术展' },
  '/art-display/wilderness-and-echo': { view: ArtDisplayDetailView, title: '旷野与回声的切面 - 2014当代艺术展' },
  '/art-display/anonymous': { view: ArtDisplayDetailView, title: '匿名者 - 2014当代艺术展' },
  '/art-display/li-ran-memorial': { view: LiRanMemorialExhibitionView, title: '李然：凝视与回响 - 特别纪念展' },
  '/hospital': { view: HospitalSystemView, title: '澄江市儿童医院信息管理系统' },
  '/gologolo': { view: GologoloSearchView, title: 'Gologolo' },
  '/blog': { view: ChenHuiBlogView, title: '陈晖的艺术手记与生活随笔' },
  '/news/piano-competition': { view: ChengJiangEveningNewsView, title: '第三届少儿钢琴大赛圆满结束 - 澄江晚报' },
  '/news/children-painting-award-2011': { view: ChengJiangEveningNewsView, title: '2011年澄江市少儿绘画奖揭晓 - 澄江晚报' },
  '/news/li-ran-death': { view: ChengJiangEveningNewsView, title: '青年艺术家李然于家中离世 - 澄江晚报' },
  '/news/chen-hui-interview': { view: ChengJiangEveningNewsView, title: '让孩子重新发现世界——专访陈晖 - 澄江晚报' },
  '/school': { view: ChengJiangSchoolView, title: '澄江实验小学官方网站' },
  '/school/news/opening-ceremony': { view: ChengJiangSchoolNewsView, title: '我校2014年秋季开学典礼 - 澄江实验小学' },
  '/school/news/teaching-competition': { view: ChengJiangSchoolNewsView, title: '我校举办教师教学能力评比大赛 - 澄江实验小学' },
  '/school/news/canteen-inspection': { view: ChengJiangSchoolNewsView, title: '热烈欢迎教育局领导参观我校食堂 - 澄江实验小学' },
  '/school/news/program-at-school': { view: ChengJiangSchoolNewsView, title: '知名儿童节目进入我校举办线下活动 - 澄江实验小学' },
  '/youth-channel': { view: YouthChannelView, title: '澄江少儿频道' },
  '/youth-channel/games/spot-the-difference': { view: SpotDifferenceGameView, title: '找不同大挑战 - 澄江少儿频道' },
  '/youth-palace': { view: YouthPalaceView, title: '澄江市青少年宫' },
}

const path = computed(() => hash.value.slice(1).split('?')[0] || '/')
const activeRoute = computed(() => routes[path.value] || routes['/'])
const activeView = computed(() => activeRoute.value.view)

function syncHash() {
  hash.value = window.location.hash
  document.title = activeRoute.value.title
}

function openLinksInNewTabs(event) {
  const link = event.target.closest?.('a[href]')
  if (!link || event.defaultPrevented || link.target === '_blank') return

  event.preventDefault()
  window.open(link.href, '_blank', 'noopener,noreferrer')
}

onMounted(() => {
  syncHash()
  window.addEventListener('hashchange', syncHash)
  document.addEventListener('click', openLinksInNewTabs)
})

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', syncHash)
  document.removeEventListener('click', openLinksInNewTabs)
})
</script>

<template>
  <component :is="activeView" />
</template>
