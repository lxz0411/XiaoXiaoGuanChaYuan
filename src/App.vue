<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import ChengJiangSchoolView from './views/ChengJiangSchoolView.vue'
import GologoloSearchView from './views/GologoloSearchView.vue'
import HospitalSystemView from './views/HospitalSystemView.vue'
import IntroView from './views/IntroView.vue'

const hash = ref(window.location.hash)

const activeView = computed(() => {
  const path = hash.value.slice(1).split('?')[0] || '/'

  if (path === '/hospital') return HospitalSystemView
  if (path === '/gologolo') return GologoloSearchView
  if (path === '/school') return ChengJiangSchoolView
  return IntroView
})

function syncHash() {
  hash.value = window.location.hash
  const path = hash.value.slice(1).split('?')[0] || '/'
  const titles = {
    '/': '儿童医院调查事件',
    '/hospital': '澄江市儿童医院信息管理系统',
    '/gologolo': 'Gologolo',
    '/school': '澄江实验小学官方网站',
  }
  document.title = titles[path] || titles['/']
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
