<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import posts from '../data/chenHuiBlogPosts.json'
import chenHuiPortrait from '../../素材/陈晖.png'

const selectedCategory = ref('全部博文')
const activePostId = ref(readPostId())
const sortedPosts = [...posts].sort((first, second) => second.date.localeCompare(first.date))
const categories = ['全部博文', ...new Set([...posts.map(post => post.category), '私密博客'])]
const archiveMonths = [...new Set(sortedPosts.map(post => post.date.slice(0, 7)))]
const commentCount = posts.reduce((total, post) => total + post.comments.length, 0)
const activePost = computed(() => posts.find(post => post.id === activePostId.value) || null)
const visiblePosts = computed(() => sortedPosts.filter(post => selectedCategory.value === '全部博文' || post.category === selectedCategory.value))

function readPostId() {
  const query = window.location.hash.split('?')[1] || ''
  return new URLSearchParams(query).get('post') || ''
}

function syncPost() {
  activePostId.value = readPostId()
  window.scrollTo(0, 0)
}

function openPost(postId) {
  window.location.hash = `/blog?post=${encodeURIComponent(postId)}`
}

function selectCategory(category) {
  selectedCategory.value = category
  window.location.hash = '/blog'
}

function resetBlog() {
  selectedCategory.value = '全部博文'
  window.location.hash = '/blog'
}

onMounted(() => window.addEventListener('hashchange', syncPost))
onBeforeUnmount(() => window.removeEventListener('hashchange', syncPost))
</script>

<template>
  <div class="blog-page">
    <div class="utility-bar">
      <div class="page-width utility-inner">
        <span class="utility-brand">陈晖的博客</span>
        <div class="utility-links">
          <button type="button" @click="resetBlog">博客首页</button>
        </div>
      </div>
    </div>

    <header class="blog-header">
      <div class="page-width header-content">
        <div class="header-copy">
          <span>CHEN HUI · PERSONAL BLOG</span>
          <h1>陈晖的博客</h1>
          <p>个人记录与文章存档</p>
        </div>
      </div>
    </header>

    <main class="page-width blog-layout">
      <aside class="sidebar">
        <section class="panel profile-panel">
          <div class="panel-heading">
            <h2>个人资料</h2>
          </div>
          <div class="profile-content">
            <img :src="chenHuiPortrait" alt="陈晖">
            <div>
              <strong>陈晖</strong>
              <span>《小小观察员》栏目制作</span>
            </div>
          </div>
          <dl class="profile-stats">
            <div><dt>博文</dt><dd>{{ posts.length }}</dd></div>
            <div><dt>分类</dt><dd>{{ categories.length - 1 }}</dd></div>
            <div><dt>归档</dt><dd>{{ archiveMonths.length }}</dd></div>
          </dl>
        </section>

        <section class="panel">
          <div class="panel-heading">
            <h2>博文分类</h2>
          </div>
          <ul class="category-list">
            <li v-for="category in categories" :key="category">
              <button
                type="button"
                :aria-pressed="selectedCategory === category"
                @click="selectCategory(category)"
              >{{ category }}</button>
              <span>{{ category === '全部博文' ? posts.length : posts.filter(post => post.category === category).length }}</span>
            </li>
          </ul>
        </section>

        <section class="panel">
          <div class="panel-heading">
            <h2>文章归档</h2>
          </div>
          <ul class="archive-list">
            <li v-for="month in archiveMonths" :key="month">
              <time :datetime="month">{{ month.replace('-', '年') }}月</time>
              <span>{{ posts.filter(post => post.date.startsWith(month)).length }}篇</span>
            </li>
          </ul>
        </section>

        <section class="panel">
          <div class="panel-heading">
            <h2>留言板</h2>
          </div>
          <div class="sidebar-empty">
            <span>来过的朋友留下了 {{ commentCount }} 条留言</span>
          </div>
        </section>
      </aside>

      <section class="content-column">
        <div class="breadcrumb">
          <span>当前位置：</span>
          <button v-if="activePost" type="button" @click="resetBlog">博客首页</button>
          <strong v-else>{{ selectedCategory === '全部博文' ? '博客首页' : selectedCategory }}</strong>
          <span v-if="activePost">　/　{{ activePost.title }}</span>
        </div>

        <section class="content-panel article-list-panel">
          <div class="content-heading">
            <div>
              <span>BLOG POSTS</span>
              <h2>{{ activePost ? '博文正文' : selectedCategory === '全部博文' ? '博客首页' : selectedCategory }}</h2>
            </div>
            <button v-if="activePost" type="button" class="back-to-blog" @click="resetBlog">← 返回博客首页</button>
            <p v-else class="post-count" aria-live="polite">{{ visiblePosts.length }}篇博文</p>
          </div>

          <ul v-if="!activePost && visiblePosts.length" class="post-list">
            <li v-for="post in visiblePosts" :key="post.id" class="post-summary">
              <h3><button type="button" class="post-title-button" @click="openPost(post.id)">{{ post.title }}</button></h3>
              <div class="post-preview-row">
                <p class="post-preview">{{ post.paragraphs[0] }}</p>
              </div>
              <div class="post-summary-meta">
                <time :datetime="post.date">{{ post.date }}</time>
                <span class="post-comment-count" :aria-label="`评论 ${post.comments.length} 条${post.commentsEnabled ? '' : '，评论已关闭'}`">
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 3.5h14v10H8l-4 3v-3H3zM6 7h8M6 10h6" /></svg>
                  {{ post.comments.length }}<span v-if="!post.commentsEnabled" class="comments-closed">已关闭</span>
                </span>
              </div>
            </li>
          </ul>

          <article v-if="activePost" :id="activePost.id" class="blog-post">
            <header class="post-header">
              <h3>{{ activePost.title }}</h3>
              <p class="post-meta">
                <time :datetime="activePost.date">{{ activePost.date }}</time>
                <span>陈晖</span>
                <span>分类：{{ activePost.category }}</span>
              </p>
            </header>
            <div class="post-body">
              <p v-for="(paragraph, index) in activePost.paragraphs" :key="index">{{ paragraph }}</p>
            </div>
            <aside v-if="activePost.sources.length" class="post-sources" :aria-label="`${activePost.title}的相关资料`">
              <h4>相关资料</h4>
              <ul>
                <li v-for="source in activePost.sources" :key="source.url">
                  <a :href="source.url" target="_blank" rel="noopener noreferrer">{{ source.label }} ↗</a>
                </li>
              </ul>
            </aside>
            <p class="post-signature">陈晖 发表于 {{ activePost.date }}　|　{{ activePost.commentsEnabled ? `留言（${activePost.comments.length}）` : '评论已关闭' }}</p>
          </article>

          <div v-if="!activePost && !visiblePosts.length" class="empty-posts">
            <h3>暂无博文</h3>
            <p>这个分类下暂时没有博文。</p>
            <button type="button" class="reset-button" @click="resetBlog">查看全部博文</button>
          </div>

          <div v-if="!activePost" class="pagination-frame">
            <span>共 {{ visiblePosts.length }} 篇，已全部显示</span>
          </div>
        </section>

        <section v-if="activePost" class="content-panel secondary-panel">
          <div class="content-heading compact">
            <div>
              <span>COMMENTS</span>
              <h2>{{ activePost.commentsEnabled ? `留言与评论（${activePost.comments.length}）` : '留言与评论' }}</h2>
            </div>
          </div>
          <ol v-if="activePost.commentsEnabled" class="comment-list">
            <li v-for="(comment, index) in activePost.comments" :key="`${activePost.id}-${index}`" class="guest-comment">
              <header>
                <strong>{{ comment.author }}</strong>
                <span>{{ index + 1 }}楼</span>
              </header>
              <p>{{ comment.text }}</p>
              <time :datetime="comment.date">{{ comment.date.replace('T', ' ') }}</time>
            </li>
          </ol>
          <div v-else class="comment-placeholder">
            <div>
              <strong>博主已关闭评论</strong>
              <p>这里暂不接受访客留言。</p>
            </div>
          </div>
        </section>
      </section>
    </main>

    <footer class="blog-footer">
      <div class="page-width footer-inner">
        <div>
          <strong>陈晖的博客</strong>
          <span>CHEN HUI · PERSONAL BLOG</span>
        </div>
        <p>随手记　·　社会观察　·　栏目手记</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.blog-page {
  min-height: 100vh;
  background: #edf0f2;
  color: #2e3438;
  font-family: Arial, "Microsoft YaHei", sans-serif;
}

.blog-page button,
.blog-page input,
.blog-page textarea {
  font: inherit;
}

.page-width {
  width: min(100% - 40px, 1080px);
  margin: 0 auto;
}

.utility-bar {
  border-bottom: 1px solid #d5dade;
  background: #f7f8f9;
  color: #78828a;
  font-size: 12px;
}

.utility-inner {
  min-height: 32px;
  display: flex;
  align-items: center;
}

.utility-brand {
  color: #4e5c66;
  font-weight: 700;
}

.utility-links {
  display: flex;
  gap: 20px;
  margin-left: auto;
}

.utility-links button {
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  cursor: pointer;
}

.blog-header {
  border-bottom: 1px solid #cbd3d9;
  background:
    linear-gradient(110deg, rgba(255, 255, 255, .96), rgba(239, 244, 247, .9)),
    repeating-linear-gradient(90deg, transparent 0 52px, rgba(68, 99, 118, .05) 52px 53px);
}

.header-content {
  min-height: 138px;
  display: flex;
  align-items: center;
  gap: 50px;
}

.header-copy > span {
  color: #84939d;
  font: 10px Georgia, serif;
  letter-spacing: 2.5px;
}

.header-copy h1 {
  margin: 10px 0 6px;
  color: #334d5d;
  font: 400 36px/1.15 "STKaiti", "KaiTi", serif;
  letter-spacing: 4px;
}

.header-copy p {
  margin: 0;
  color: #87939a;
  font-size: 13px;
  letter-spacing: 3px;
}

.blog-layout {
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr);
  gap: 18px;
  padding-top: 22px;
  padding-bottom: 40px;
}

.sidebar,
.content-column {
  min-width: 0;
}

.panel,
.content-panel,
.breadcrumb {
  border: 1px solid #d6dcdf;
  background: #fff;
  box-shadow: 0 1px 2px rgba(35, 51, 60, .04);
}

.panel {
  margin-bottom: 14px;
}

.panel-heading {
  min-height: 38px;
  display: flex;
  align-items: center;
  padding: 0 14px;
  border-bottom: 1px solid #e1e5e7;
  background: #f6f7f8;
}

.panel-heading h2 {
  margin: 0;
  color: #536873;
  font-size: 13px;
}

.profile-content {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 17px 14px;
}

.profile-content img {
  width: 70px;
  height: 70px;
  border: 1px solid #d5dade;
  object-fit: cover;
  filter: grayscale(.2);
}

.profile-content strong,
.profile-content span {
  display: block;
}

.profile-content strong {
  color: #354b58;
  font: 400 20px "STKaiti", "KaiTi", serif;
}

.profile-content span {
  margin-top: 7px;
  color: #8b969d;
  font-size: 11px;
}

.profile-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 0;
  border-top: 1px solid #e3e7e9;
}

.profile-stats div {
  padding: 10px 5px;
  text-align: center;
}

.profile-stats div + div {
  border-left: 1px solid #e3e7e9;
}

.profile-stats dt {
  color: #8c969c;
  font-size: 10px;
}

.profile-stats dd {
  margin: 4px 0 0;
  color: #586b76;
  font-size: 14px;
}

.category-list {
  margin: 0;
  padding: 5px 14px 9px;
  list-style: none;
}

.category-list li {
  min-height: 34px;
  display: flex;
  align-items: center;
  border-bottom: 1px dotted #dce1e4;
}

.category-list button {
  padding: 0;
  border: 0;
  background: none;
  color: #64747d;
  cursor: pointer;
  font-size: 12px;
}

.category-list button[aria-pressed="true"] {
  color: #334d5d;
  font-weight: 700;
}

.category-list span {
  margin-left: auto;
  color: #a5adb2;
  font-size: 11px;
}

.archive-list {
  margin: 0;
  padding: 6px 14px 10px;
  list-style: none;
}

.archive-list li {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 9px 0;
  border-bottom: 1px dotted #dce1e4;
  color: #64747d;
  font-size: 12px;
}

.archive-list span {
  color: #909da5;
}

.sidebar-empty {
  display: grid;
  min-height: 78px;
  place-items: center;
  color: #a1a9ae;
  font-size: 11px;
}

.breadcrumb {
  min-height: 38px;
  display: flex;
  align-items: center;
  margin-bottom: 14px;
  padding: 0 14px;
  color: #8a959b;
  font-size: 11px;
}

.breadcrumb strong {
  color: #5d6d76;
  font-weight: 400;
}

.breadcrumb button {
  padding: 0;
  border: 0;
  background: none;
  color: #527286;
  cursor: pointer;
  white-space: nowrap;
}

.content-panel {
  margin-bottom: 16px;
}

.content-heading {
  min-height: 66px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #dce2e5;
}

.content-heading.compact {
  min-height: 58px;
}

.content-heading span {
  color: #a2aab0;
  font: 8px Georgia, serif;
  letter-spacing: 2px;
}

.content-heading h2 {
  margin: 4px 0 0;
  color: #425b69;
  font-size: 17px;
  font-weight: 500;
}

.post-count {
  margin: 0 0 0 auto;
  padding-left: 12px;
  color: #87939b;
  font-size: 11px;
  text-align: right;
}

.content-heading .back-to-blog {
  margin-left: auto;
  padding: 6px 0 6px 12px;
  border: 0;
  background: none;
  color: #527286;
  font-size: 12px;
  cursor: pointer;
}

.post-list {
  margin: 0;
  padding: 8px 24px;
  list-style: none;
}

.post-list li + li {
  border-top: 1px solid #e6e9eb;
}

.post-summary {
  padding: 25px 2px;
}

.post-summary h3 {
  margin: 0;
}

.post-list .post-title-button {
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: none;
  color: #303b43;
  font: 700 21px/1.6 Arial, "Microsoft YaHei", sans-serif;
  text-align: left;
  cursor: pointer;
}

.post-title-button:hover {
  color: #1b394c;
  text-decoration: underline;
  text-underline-offset: 5px;
}

.post-title-button:focus-visible {
  outline: 2px solid #527286;
  outline-offset: -2px;
}

.post-preview-row {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  margin-top: 13px;
}

.post-preview {
  display: -webkit-box;
  min-width: 0;
  margin: 0;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  color: #48525a;
  font-size: 15px;
  line-height: 1.9;
  overflow-wrap: anywhere;
}

.post-summary-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 10px 20px;
  margin-top: 22px;
  color: #939da4;
  font-size: 12px;
}

.post-comment-count {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.post-comment-count svg {
  width: 17px;
  height: 17px;
  stroke: currentColor;
  stroke-width: 1.3;
}

.comments-closed {
  font-size: 11px;
}

.blog-post {
  padding: 28px 28px 22px;
  scroll-margin-top: 20px;
}

.post-header h3 {
  margin: 0 0 12px;
  color: #334f60;
  font: 500 23px/1.5 "Noto Serif SC", "Songti SC", SimSun, serif;
  overflow-wrap: anywhere;
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 16px;
  margin: 0 0 22px;
  color: #8b969d;
  font-size: 11px;
}

.post-body {
  color: #3e464c;
  font-size: 15px;
  line-height: 2.05;
  overflow-wrap: anywhere;
}

.post-body p {
  margin: 0 0 1.25em;
  text-align: justify;
}

.post-sources {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px dotted #d6dcdf;
  color: #74838c;
  font-size: 12px;
  line-height: 1.9;
}

.post-sources h4 {
  margin: 0 0 5px;
  font-size: 12px;
  font-weight: 500;
}

.post-sources ul {
  margin: 0;
  padding-left: 18px;
}

.post-sources li + li {
  margin-top: 5px;
}

.post-sources a {
  color: #527286;
  text-decoration: none;
  overflow-wrap: anywhere;
}

.post-sources a:hover {
  text-decoration: underline;
}

.post-signature {
  margin: 20px 0 0;
  color: #929da4;
  font-size: 11px;
  line-height: 1.8;
}

.reset-button {
  margin-top: 18px;
  padding: 8px 14px;
  border: 1px solid #c9d1d6;
  background: #f5f7f8;
  color: #526f80;
  cursor: pointer;
}

.empty-posts {
  min-height: 380px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  text-align: center;
}

.empty-posts h3 {
  margin: 22px 0 8px;
  color: #5a6c76;
  font-size: 17px;
  font-weight: 500;
}

.empty-posts p {
  margin: 0;
  color: #9aa3a8;
  font-size: 12px;
}

.pagination-frame {
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  border-top: 1px solid #e1e5e7;
  color: #99a2a7;
  font-size: 11px;
}

.comment-placeholder {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 22px 20px;
}

.comment-list {
  margin: 0;
  padding: 0 20px;
  list-style: none;
}

.guest-comment {
  padding: 20px 0;
}

.guest-comment + .guest-comment {
  border-top: 1px dotted #d6dcdf;
}

.guest-comment header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.guest-comment strong {
  color: #527286;
  font-size: 13px;
}

.guest-comment header span,
.guest-comment time {
  color: #929da4;
  font-size: 11px;
}

.guest-comment p {
  margin: 10px 0;
  color: #53616a;
  font-size: 13px;
  line-height: 1.9;
  overflow-wrap: anywhere;
}

.comment-placeholder strong {
  color: #657680;
  font-size: 12px;
}

.comment-placeholder p {
  margin: 5px 0 0;
  color: #9aa3a8;
  font-size: 11px;
}

.blog-footer {
  padding: 28px 0 35px;
  border-top: 3px solid #455f6f;
  background: #fff;
}

.footer-inner {
  display: flex;
  align-items: flex-end;
}

.footer-inner strong,
.footer-inner span {
  display: block;
}

.footer-inner strong {
  color: #455f6f;
  font: 400 18px "STKaiti", "KaiTi", serif;
}

.footer-inner span {
  margin-top: 5px;
  color: #a0a8ad;
  font: 8px Georgia, serif;
  letter-spacing: 1.5px;
}

.footer-inner p {
  margin: 0 0 2px auto;
  color: #8d979d;
  font-size: 11px;
}

@media (max-width: 820px) {
  .header-content {
    min-height: 120px;
  }

  .header-content {
    flex-wrap: wrap;
    gap: 20px;
    padding-top: 25px;
    padding-bottom: 25px;
  }

  .blog-layout {
    grid-template-columns: 210px minmax(0, 1fr);
  }
}

@media (max-width: 650px) {
  .page-width {
    width: min(100% - 20px, 1080px);
  }

  .utility-links {
    display: none;
  }

  .header-copy h1 {
    font-size: 29px;
  }

  .blog-layout {
    grid-template-columns: 1fr;
  }

  .sidebar {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .panel {
    margin: 0;
  }

  .empty-posts {
    min-height: 290px;
    padding: 25px;
  }

  .blog-post {
    padding: 24px 18px 20px;
  }

  .post-header h3 {
    font-size: 21px;
  }

  .post-list {
    padding: 4px 18px;
  }

  .post-list .post-title-button {
    font-size: 19px;
  }

  .footer-inner {
    align-items: flex-start;
    flex-direction: column;
    gap: 18px;
  }

  .footer-inner p {
    margin-left: 0;
  }
}

@media (max-width: 430px) {
  .sidebar {
    grid-template-columns: 1fr;
  }
}
</style>
