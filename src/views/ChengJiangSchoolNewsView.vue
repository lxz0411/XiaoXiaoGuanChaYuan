<script setup>
import { computed } from 'vue'
import articles from '../data/chengjiangSchoolNews.json'
import schoolLogo from '../../素材/学校页/school-logo.png'
import openingCeremony from '../../素材/学校页/开学典礼.png'
import teachingCompetition from '../../素材/学校页/教学评比.png'
import canteenInspection from '../../素材/学校页/食堂视察.png'
import programAtSchool from '../../素材/学校页/节目进校园.png'

const imageMap = {
  openingCeremony,
  teachingCompetition,
  canteenInspection,
  programAtSchool,
}

const articleId = window.location.hash.split('/').pop()
const article = computed(() => {
  const data = articles[articleId] || articles['opening-ceremony']
  return { ...data, image: imageMap[data.image] }
})

const navItems = ['学校首页', '学校概况', '德育天地', '教学科研', '阳光校园', '澄江名师', '招生招聘', '家校互通']
</script>

<template>
  <div class="school-news-page">
    <div class="news-site-header">
      <div class="utility-bar">
        <div class="page-container">
          <span>欢迎访问澄江实验小学官方网站！今天是 2014年9月15日 星期一</span>
          <div><button type="button">教师登录</button><i>|</i><button type="button">家长互动平台</button><i>|</i><button type="button">数字化校园OA</button></div>
        </div>
      </div>

      <div class="page-container brand-row">
        <button type="button" class="brand-button"><img :src="schoolLogo" alt="澄江实验小学"></button>
        <strong>博爱 · 求真 · 励志 · 笃行</strong>
      </div>

      <div class="nav-bar">
        <div class="page-container nav-row">
          <button v-for="(item, index) in navItems" :key="item" type="button" :class="{ active: index === 0 }">{{ item }}</button>
        </div>
      </div>
    </div>

    <div class="page-container article-shell">
      <div class="breadcrumb">
        <span>当前位置：</span>
        <button type="button">学校首页</button>
        <i>›</i>
        <button type="button">学校快讯</button>
        <i>›</i>
        <span>正文</span>
      </div>

      <article class="article-card">
        <div class="article-heading">
          <h1>{{ article.title }}</h1>
          <div class="article-meta">
            <span>发布时间：{{ article.date }}</span>
            <span>来源：{{ article.source }}</span>
            <span>浏览次数：326</span>
          </div>
        </div>

        <div class="article-body">
          <p v-for="paragraph in article.paragraphs" :key="paragraph">{{ paragraph }}</p>
          <figure>
            <img :src="article.image" :alt="article.title">
            <figcaption>{{ article.title }}</figcaption>
          </figure>
          <p>（供稿：{{ article.source }}　审核：校办公室）</p>
        </div>
      </article>
    </div>

    <div class="news-site-footer">
      <div class="page-container footer-row">
        <div>
          <p>版权所有 © 2014 澄江实验小学　澄江校区　地址：澄江市教育园区实验路18号　邮编：214400</p>
          <p>澄ICP备11029482号　网站访问总量：1,842,910 次　|　建议分辨率 1024×768 以上</p>
        </div>
        <span>✓ 事业单位网上可信标识</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.school-news-page {
  --blue: #004c9a;
  --blue-mid: #1664c0;
  --pale: #eff4ff;
  --soft: #dce9ff;
  --ink: #0d1c2e;
  --muted: #657080;
  min-height: 100vh;
  background: #f8f9ff;
  color: var(--ink);
  font: 14px/1.8 "Microsoft YaHei", "PingFang SC", Arial, sans-serif;
}

.school-news-page * { box-sizing: border-box; }
.school-news-page button { padding: 0; border: 0; background: transparent; color: inherit; font: inherit; cursor: pointer; }
.page-container { width: min(1080px, calc(100% - 40px)); margin: 0 auto; }

.news-site-header { background: #fff; box-shadow: 0 1px 8px rgba(0, 0, 0, .07); }
.utility-bar { background: var(--pale); color: var(--muted); font-size: 11px; }
.utility-bar .page-container { min-height: 30px; display: flex; align-items: center; justify-content: space-between; gap: 20px; }
.utility-bar div div { display: flex; gap: 11px; white-space: nowrap; }
.utility-bar i { color: #c2c6d4; font-style: normal; }
.utility-bar button:hover { color: var(--blue); text-decoration: underline; }

.brand-row { min-height: 78px; display: flex; align-items: center; justify-content: space-between; }
.brand-button img { display: block; width: min(500px, 48vw); max-height: 58px; object-fit: contain; }
.brand-row strong { padding: 6px 16px; border-radius: 4px; background: var(--pale); color: #8f5a00; font-family: SimSun, serif; letter-spacing: .18em; }

.nav-bar { background: var(--blue-mid); }
.nav-row { display: flex; overflow-x: auto; }
.nav-row button { flex: 1; min-width: 100px; padding: 10px 14px; color: #d8e4ff; text-align: center; white-space: nowrap; }
.nav-row button:hover, .nav-row button.active { background: var(--blue); color: #fff; font-weight: 700; }

.article-shell { padding-top: 18px; }
.breadcrumb { display: flex; align-items: center; gap: 7px; padding: 9px 14px; border-radius: 4px; background: var(--pale); color: var(--muted); font-size: 12px; }
.breadcrumb button { color: var(--blue); }
.breadcrumb i { color: #9da6b4; font-style: normal; }

.article-card { margin-top: 14px; padding: 28px 50px 22px; border-radius: 5px; background: #fff; box-shadow: 0 1px 5px rgba(13, 28, 46, .1); }
.article-heading { padding-bottom: 20px; border-bottom: 1px solid #dce4f0; text-align: center; }
.article-heading h1 { margin: 12px auto 10px; color: var(--ink); font: 700 27px/1.45 SimSun, "Songti SC", serif; }
.article-meta { display: flex; justify-content: center; gap: 24px; color: #7a8492; font-size: 11px; }

.article-body { max-width: 850px; margin: 26px auto 0; }
.article-body p { margin: 0 0 18px; text-indent: 2em; }
.article-body figure { margin: 28px auto; text-align: center; }
.article-body img { display: block; width: min(760px, 100%); max-height: 560px; margin: 0 auto; object-fit: contain; }
.article-body figcaption { margin-top: 8px; color: var(--muted); font-size: 11px; }
.article-body p:last-child { color: var(--muted); text-align: right; }

.news-site-footer { margin-top: 32px; padding: 22px 0 28px; background: var(--soft); color: var(--muted); }
.footer-row { display: flex; align-items: center; justify-content: space-between; gap: 25px; }
.footer-row p { margin: 2px 0; font-size: 11px; }
.footer-row > span { flex: 0 0 auto; padding: 7px 12px; border-radius: 4px; background: #fff; font-size: 11px; }

@media (max-width: 700px) {
  .page-container { width: calc(100% - 24px); }
  .utility-bar { display: none; }
  .brand-row strong { display: none; }
  .brand-button img { width: min(290px, 75vw); }
  .article-card { padding: 24px 18px 18px; }
  .article-heading h1 { font-size: 21px; }
  .article-meta { flex-wrap: wrap; gap: 5px 14px; }
  .footer-row { align-items: flex-start; flex-direction: column; }
}
</style>
