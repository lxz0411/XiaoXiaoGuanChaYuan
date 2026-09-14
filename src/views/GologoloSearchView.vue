<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { getGologoloSearchResults } from '../data/gologoloSearchIndex'

function readSearchQuery() {
  const queryString = window.location.hash.split('?')[1] || ''
  return new URLSearchParams(queryString).get('q')?.trim() || ''
}

function pageHref(hashPath) {
  const url = new URL(window.location.href)
  url.hash = hashPath
  return url.toString()
}

const activeQuery = ref(readSearchQuery())
const searchTerm = ref(activeQuery.value)

function syncSearchQuery() {
  activeQuery.value = readSearchQuery()
  searchTerm.value = activeQuery.value
}

const hotSearches = [
  '多地出现儿童患认知障碍',
  '多地高温提前到来，防暑用品销量上涨',
  '高校毕业季租房需求进入高峰',
  '国产大模型办公插件更新引发讨论',
  '新能源车充电桩进社区难题再受关注',
  '端午假期热门线路机票价格回落',
  '全国多城试点夜间门诊延时服务',
  '电影《羊来》票房持续攀升',
  '城市骑行热带动轻量化装备销售',
  '男篮青年联赛决赛今晚开打',
]

const searchResults = computed(() =>
  activeQuery.value ? getGologoloSearchResults(activeQuery.value) : [],
)

function openSearch(query = searchTerm.value) {
  const normalizedQuery = query.trim()
  const hash = normalizedQuery
    ? `#/gologolo?q=${encodeURIComponent(normalizedQuery)}`
    : '#/gologolo'

  window.open(pageHref(hash), '_blank', 'noopener,noreferrer')
}

onMounted(() => window.addEventListener('hashchange', syncSearchQuery))
onBeforeUnmount(() => window.removeEventListener('hashchange', syncSearchQuery))
</script>

<template>
  <main class="gologolo-page" :class="{ 'gologolo-page--results': activeQuery }">
    <div class="gologolo-shell">
      <section class="gologolo-hero" aria-labelledby="gologolo-title">
        <a
          class="gologolo-brand"
          href="#/gologolo"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="在新标签页打开 Gologolo 首页"
        >
          <span class="blue">G</span><span class="red">o</span><span class="yellow">l</span><span class="blue">o</span><span class="green">g</span><span class="red">o</span><span class="yellow">l</span><span class="blue">o</span>
        </a>
        <h1 id="gologolo-title">Gologolo 搜索引擎</h1>

        <form class="gologolo-searchbar" @submit.prevent="openSearch()">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m21 20-5.2-5.2a7 7 0 1 0-1.4 1.4L19.6 21 21 20ZM5 10.5a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0Z" />
          </svg>
          <input
            v-model="searchTerm"
            type="search"
            name="q"
            autocomplete="off"
            aria-label="搜索关键词"
            placeholder="输入关键词"
          >
          <button type="submit">搜索</button>
        </form>
      </section>

      <section v-if="activeQuery" class="gologolo-results-layout">
        <div class="gologolo-results">
          <div class="gologolo-results__header">
            <p>关于“<strong>{{ activeQuery }}</strong>”的搜索结果</p>
            <span>{{ searchResults.length }} 条结果</span>
          </div>

          <div v-if="searchResults.length" class="gologolo-result-list">
            <article v-for="result in searchResults" :key="result.title" class="gologolo-result-card">
              <a
                class="gologolo-result-card__title"
                :href="result.href"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ result.title }}
              </a>
              <p class="gologolo-result-card__url">{{ pageHref(result.href) }}</p>
              <p class="gologolo-result-card__description">{{ result.description }}</p>
            </article>
          </div>

          <div v-else class="gologolo-empty">
            <h2>没有找到相关内容</h2>
            <p>请换一个关键词再试。</p>
          </div>
        </div>

        <section class="gologolo-hot-searches">
          <h2>今日热搜</h2>
          <ol>
            <li v-for="item in hotSearches" :key="item">
              <a
                :href="pageHref(`#/gologolo?q=${encodeURIComponent(item)}`)"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ item }}
              </a>
            </li>
          </ol>
        </section>
      </section>
    </div>
  </main>
</template>

<style scoped>
.gologolo-page {
  min-height: 100vh;
  padding: 0;
  background: #fff;
  color: #202124;
  font-family: Arial, "Microsoft YaHei", "PingFang SC", sans-serif;
}

.gologolo-shell {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  box-sizing: border-box;
  padding: 40px 24px 36px;
}

.gologolo-page--results .gologolo-shell {
  min-height: 0;
  grid-template-rows: auto auto;
  padding-top: 46px;
}

.gologolo-hero {
  min-height: 58vh;
  display: grid;
  align-content: center;
  justify-items: center;
  gap: 18px;
  padding-top: 18px;
}

.gologolo-page--results .gologolo-hero {
  min-height: 190px;
  gap: 12px;
  padding-top: 0;
}

.gologolo-brand {
  display: inline-flex;
  color: inherit;
  font-size: 78px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0;
  text-decoration: none;
}

.blue { color: #4285f4; }
.red { color: #ea4335; }
.yellow { color: #fbbc05; }
.green { color: #34a853; }

h1 {
  margin: 0;
  color: #5f6368;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.5;
}

.gologolo-searchbar {
  width: min(720px, 100%);
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr) auto;
  align-items: center;
  gap: 12px;
  box-sizing: border-box;
  padding: 8px 16px 8px 18px;
  border: 1px solid #dfe1e5;
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.18);
}

.gologolo-searchbar:focus-within {
  border-color: transparent;
  box-shadow: 0 1px 10px rgba(32, 33, 36, 0.24);
}

.gologolo-searchbar svg {
  width: 22px;
  fill: #9aa0a6;
}

.gologolo-searchbar input {
  width: auto;
  min-width: 0;
  padding: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: #202124;
  font: inherit;
  font-size: 16px;
}

.gologolo-searchbar input::placeholder {
  color: #80868b;
}

.gologolo-searchbar button {
  min-width: 86px;
  height: 40px;
  border: 0;
  border-radius: 999px;
  background: #1a73e8;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}

.gologolo-results-layout {
  width: min(1180px, 100%);
  justify-self: center;
  align-self: start;
  display: grid;
  grid-template-columns: minmax(0, 760px) minmax(260px, 320px);
  align-items: start;
  gap: clamp(32px, 5vw, 72px);
  padding-top: 10px;
}

.gologolo-results {
  min-width: 0;
  display: grid;
  align-content: start;
  gap: 14px;
}

.gologolo-results__header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
  color: #5f6368;
  font-size: 14px;
}

.gologolo-results__header p {
  margin: 0;
}

.gologolo-results__header strong {
  color: #202124;
  font-weight: 600;
}

.gologolo-result-list {
  display: grid;
  gap: 14px;
}

.gologolo-result-card {
  padding-bottom: 14px;
  border-bottom: 1px solid #e8eaed;
}

.gologolo-result-card__title {
  color: #1a0dab;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.4;
  text-decoration: none;
}

.gologolo-result-card__title:hover {
  text-decoration: underline;
}

.gologolo-result-card__url,
.gologolo-result-card__description {
  margin: 6px 0 0;
  line-height: 1.5;
}

.gologolo-result-card__url {
  overflow-wrap: anywhere;
  color: #5f6368;
  font-size: 12px;
}

.gologolo-result-card__description {
  color: #3c4043;
  font-size: 14px;
}

.gologolo-hot-searches {
  display: grid;
  gap: 14px;
  padding: 18px 20px 20px;
  border: 1px solid #e8eaed;
  border-radius: 12px;
  background: #fff;
}

.gologolo-hot-searches h2 {
  margin: 0;
  color: #202124;
  font-size: 18px;
  font-weight: 600;
}

.gologolo-hot-searches ol {
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: hot-search;
}

.gologolo-hot-searches li {
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr);
  gap: 10px;
  color: #3c4043;
  font-size: 14px;
  line-height: 1.55;
  counter-increment: hot-search;
}

.gologolo-hot-searches li::before {
  content: counter(hot-search);
  color: #80868b;
  font-weight: 600;
  text-align: right;
}

.gologolo-hot-searches li:nth-child(-n+3)::before {
  color: #ea4335;
}

.gologolo-hot-searches a {
  color: inherit;
  text-decoration: none;
}

.gologolo-hot-searches a:hover {
  color: #1a73e8;
  text-decoration: underline;
}

.gologolo-empty h2 {
  margin: 0;
  color: #202124;
  font-size: 22px;
  font-weight: 500;
}

.gologolo-empty p {
  margin: 8px 0 0;
  color: #5f6368;
  font-size: 15px;
}

@media (max-width: 720px) {
  .gologolo-shell,
  .gologolo-page--results .gologolo-shell {
    padding: 28px 14px;
  }

  .gologolo-hero {
    min-height: 52vh;
    gap: 14px;
  }

  .gologolo-page--results .gologolo-hero {
    min-height: 174px;
  }

  .gologolo-brand {
    font-size: 54px;
  }

  h1 {
    font-size: 16px;
  }

  .gologolo-searchbar {
    grid-template-columns: 22px minmax(0, 1fr);
    gap: 10px 12px;
    padding: 10px 14px 12px;
    border-radius: 24px;
  }

  .gologolo-searchbar button {
    grid-column: 1 / -1;
    width: 100%;
    height: 38px;
  }

  .gologolo-results-layout {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .gologolo-results__header {
    flex-direction: column;
    align-items: start;
  }
}
</style>
