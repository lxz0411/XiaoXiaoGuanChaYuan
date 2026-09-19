<script setup>
import { computed } from 'vue'
import articles from '../data/chengjiangEveningNews.json'
import pianoCompetition from '../../素材/新闻页/少儿钢琴大赛.jpg'
import childrenPaintingAward from '../../素材/新闻页/李然指导绘画奖.png'
import anonymousArtwork from '../../素材/画展页/匿名者.png'

const imageMap = {
  pianoCompetition,
  childrenPaintingAward,
  anonymousArtwork,
}

const resolveImage = imageKey => imageMap[imageKey] || ''
const articleId = window.location.hash.split('/').pop()
const article = computed(() => articles[articleId] || articles['piano-competition'])
</script>

<template>
  <div class="evening-news-page">
    <header class="newspaper-header">
      <div class="top-line">
        <span>澄江市重点新闻网站</span>
        <span>{{ article.issueDate }}</span>
      </div>
      <div class="masthead">
        <div>
          <h1>澄江晚报</h1>
          <p>CHENGJIANG EVENING NEWS</p>
        </div>
        <strong>关注民生　记录澄江</strong>
      </div>
      <nav>
        <button type="button">首页</button>
        <button type="button">澄江新闻</button>
        <button type="button">社会</button>
        <button type="button">教育</button>
        <button type="button">文化</button>
        <button type="button">生活</button>
      </nav>
    </header>

    <main>
      <div class="breadcrumb">当前位置：澄江晚报 &gt; {{ article.category }} &gt; 正文</div>

      <article>
        <h2>{{ article.title }}</h2>
        <p v-if="article.subtitle" class="subtitle">{{ article.subtitle }}</p>
        <div class="article-meta">{{ article.meta }}</div>

        <div class="article-body">
          <template v-for="(block, index) in article.blocks" :key="index">
            <p v-if="block.type === 'paragraph'">{{ block.text }}</p>

            <p v-else-if="block.type === 'dialogue'" class="interview-line">
              <strong>{{ block.speaker }}：</strong>{{ block.text }}
            </p>

            <figure v-else-if="block.type === 'image'">
              <img :src="resolveImage(block.image)" :alt="block.alt">
              <figcaption>{{ block.caption }}</figcaption>
            </figure>

            <section v-else-if="block.type === 'winners'" class="winner-list">
              <h3>{{ block.title }}</h3>
              <div v-for="group in block.groups" :key="group.award" class="award-group">
                <h4>{{ group.award }}</h4>
                <p v-for="person in group.people" :key="person.name">
                  <strong>{{ person.name }}</strong>
                  <span>{{ person.school }}　{{ person.grade }}</span>
                </p>
              </div>
            </section>
          </template>
        </div>
      </article>
    </main>

    <footer>
      澄江晚报社版权所有　未经许可不得转载
    </footer>
  </div>
</template>

<style scoped>
.evening-news-page {
  min-height: 100vh;
  background: #f4f1ea;
  color: #282828;
  font-family: "SimSun", "宋体", serif;
}

.newspaper-header,
main,
footer {
  width: min(100% - 32px, 1000px);
  margin: 0 auto;
}

.top-line {
  display: flex;
  justify-content: space-between;
  padding: 8px 4px;
  border-bottom: 1px solid #b9b3a8;
  color: #666;
  font-size: 13px;
}

.masthead {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 8px 16px;
}

.masthead h1 {
  margin: 0;
  color: #9d1f18;
  font: 700 52px/1 "STKaiti", "KaiTi", serif;
  letter-spacing: 8px;
}

.masthead p {
  margin: 6px 0 0 3px;
  color: #777;
  font: 11px/1 Arial, sans-serif;
  letter-spacing: 4px;
}

.masthead strong {
  color: #555;
  font-size: 15px;
  letter-spacing: 4px;
}

nav {
  display: flex;
  justify-content: center;
  border-top: 4px solid #9d1f18;
  border-bottom: 1px solid #9d1f18;
  background: #fff;
}

nav button {
  padding: 11px 30px;
  border: 0;
  background: transparent;
  color: #333;
  font: 16px "Microsoft YaHei", sans-serif;
  pointer-events: none;
}

main {
  padding-bottom: 48px;
  background: #fff;
}

.breadcrumb {
  padding: 15px 24px;
  border-bottom: 1px solid #ddd;
  color: #777;
  font-size: 13px;
}

article {
  max-width: 760px;
  margin: 0 auto;
  padding: 38px 28px 20px;
}

article h2 {
  margin: 0;
  color: #222;
  font: 700 34px/1.35 "Microsoft YaHei", sans-serif;
  text-align: center;
}

.subtitle {
  margin: 10px 0 0;
  color: #777;
  font-size: 18px;
  text-align: center;
}

.article-meta {
  margin: 24px 0 30px;
  padding: 10px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  color: #888;
  font-size: 13px;
  text-align: center;
}

.article-body {
  font-size: 18px;
  line-height: 2;
}

.article-body > p {
  margin: 0 0 20px;
  text-indent: 2em;
}

.article-body > .interview-line {
  text-indent: 0;
}

.interview-line strong {
  color: #8f2e28;
  font-family: "Microsoft YaHei", sans-serif;
}

.article-body figure {
  margin: 24px 0 28px;
}

.article-body figure img {
  display: block;
  width: 100%;
  height: auto;
}

.article-body figcaption {
  margin-top: 7px;
  color: #777;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
}

.winner-list {
  margin: 28px 18px 32px;
  padding: 20px 34px;
  border-top: 2px solid #9d1f18;
  border-bottom: 1px solid #bbb;
  background: #faf9f6;
}

.winner-list h3 {
  margin: 0 0 16px;
  color: #9d1f18;
  font: 700 22px "Microsoft YaHei", sans-serif;
  text-align: center;
}

.award-group {
  display: grid;
  grid-template-columns: 92px 1fr;
  padding: 10px 0;
  border-top: 1px dotted #c8c3ba;
}

.award-group h4 {
  margin: 0;
  color: #8b312b;
  font-size: 17px;
}

.award-group p {
  grid-column: 2;
  display: flex;
  justify-content: space-between;
  gap: 18px;
  margin: 0 0 5px;
}

.award-group p:first-of-type {
  grid-row: 1;
}

.award-group span {
  color: #555;
}

footer {
  padding: 24px;
  border-top: 1px solid #bbb;
  color: #777;
  font-size: 13px;
  text-align: center;
}

@media (max-width: 700px) {
  .masthead {
    align-items: flex-start;
  }

  .masthead h1 {
    font-size: 40px;
  }

  .masthead strong {
    display: none;
  }

  nav {
    overflow-x: auto;
    justify-content: flex-start;
  }

  nav button {
    padding: 10px 18px;
    white-space: nowrap;
  }

  article {
    padding: 30px 18px 10px;
  }

  article h2 {
    font-size: 28px;
  }

  .winner-list {
    margin-right: 0;
    margin-left: 0;
    padding: 18px;
  }

  .award-group {
    grid-template-columns: 72px 1fr;
  }

  .award-group p {
    display: block;
  }

  .award-group span {
    display: block;
  }
}
</style>
