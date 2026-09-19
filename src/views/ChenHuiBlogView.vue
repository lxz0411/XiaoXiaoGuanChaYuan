<script setup>
import { ref } from 'vue'
import chenHuiPortrait from '../../素材/陈晖.png'

const activeTab = ref('博客首页')
const activeCategory = ref('全部文章')

const tabs = ['博客首页', '创作随笔', '城市观察', '艺术教育', '关于我 / 个人档案', '留言板', '好友动态']

const categories = [
  { name: '全部文章', count: 42 },
  { name: '创作随笔', count: 16 },
  { name: '城市观察', count: 11 },
  { name: '艺术教育', count: 9 },
  { name: '阅读与生活', count: 6 },
]

const articles = [
  {
    date: '2014-11-08 16:20',
    category: '城市观察',
    title: '黄昏经过旧车站时，我想起一张未寄出的明信片',
    excerpt: '城市总是在天色变暗之后显露出另一种秩序。人们收起白天的匆忙，沿着熟悉的街道慢慢回到自己的房间。',
    tags: ['散步', '记录'],
    reads: '1,284',
  },
  {
    date: '2014-10-26 09:15',
    category: '艺术教育',
    title: '给孩子一块不被安排的空白',
    excerpt: '我越来越相信，学习绘画首先是学会停下来。让孩子自己选择颜色，也让一幅画保留一点没有被解释完的地方。',
    tags: ['课堂', '孩子'],
    reads: '986',
  },
  {
    date: '2014-10-12 21:03',
    category: '创作随笔',
    title: '工作台上的纸、铅笔和一阵风',
    excerpt: '创作并不总是从一个宏大的主题开始。有时只是窗帘被风吹起，纸张翻到下一页，手顺势留下了一条线。',
    tags: ['工作室', '随笔'],
    reads: '743',
  },
]

function selectTab(tab) {
  activeTab.value = tab
  if (tabs.slice(1, 4).includes(tab)) activeCategory.value = tab
}

function selectCategory(category) {
  activeCategory.value = category
  if (category === '全部文章') activeTab.value = '博客首页'
  else if (tabs.includes(category)) activeTab.value = category
}
</script>

<template>
  <div class="chen-blog-page">
    <div class="blog-utility-bar">
      <div class="blog-width utility-inner">
        <span class="utility-home">◉ 陈晖的博客</span>
        <span>首页</span>
        <span>新闻</span>
        <span>读书</span>
        <span>收藏</span>
        <span>更多⌄</span>
        <div class="utility-right">
          <span><a href="#/blog">[登录]</a> / 注册</span>
          <span>▯ 手机版</span>
          <span>帮助</span>
          <b>●</b>
        </div>
      </div>
    </div>

    <header class="blog-header">
      <div class="blog-width blog-heading">
        <div>
          <p class="blog-kicker">CHEN HUI · NOTES FROM THE STUDIO</p>
          <h1>陈晖的艺术手记与生活随笔 <strong>个人页</strong></h1>
          <p class="blog-motto">以画笔记录时间，在静默中观察世界。</p>
          <div class="blog-stat-row">
            <span>博客访问：<b>186,420</b></span>
            <span>关注人数：<b>3,706</b></span>
            <span>原创文章：<b>42</b> 篇</span>
          </div>
        </div>
        <div class="blog-heading-side">
          <span class="blog-address">↗ blog.chenhui.art / notes</span>
          <p>澄江 · 北京 · 往返工作室</p>
          <div>
            <button type="button" class="follow-button">＋ 加关注</button>
            <button type="button" class="message-button">▱ 发私信</button>
          </div>
        </div>
      </div>
    </header>

    <nav class="blog-nav">
      <div class="blog-width blog-nav-inner">
        <button
          v-for="tab in tabs"
          :key="tab"
          type="button"
          :class="{ active: activeTab === tab }"
          @click="selectTab(tab)"
        >
          {{ tab }}
        </button>
      </div>
    </nav>

    <main class="blog-width blog-layout">
      <aside class="blog-sidebar">
        <section class="sidebar-card profile-card">
          <div class="sidebar-title"><span>♙</span> 个人资料 <small>[设置]</small></div>
          <img :src="chenHuiPortrait" alt="陈晖头像" class="portrait">
          <h2>陈晖 <i>✦</i></h2>
          <p class="profile-role">艺术教育者 · 观察者 · 生活记录者</p>
          <button type="button" class="sidebar-follow">＋ 加关注</button>
          <p class="profile-bio">画画、阅读，也在城市里慢慢走路。希望把看见的事物，写成可以与人分享的片段。</p>
          <dl class="profile-numbers">
            <div><dt>文章</dt><dd>42</dd></div>
            <div><dt>关注</dt><dd>318</dd></div>
            <div><dt>粉丝</dt><dd>3,706</dd></div>
          </dl>
        </section>

        <section class="sidebar-card category-card">
          <div class="sidebar-title"><span>▣</span> 博文分类 <small>(42)</small></div>
          <button
            v-for="category in categories"
            :key="category.name"
            type="button"
            :class="{ selected: activeCategory === category.name }"
            @click="selectCategory(category.name)"
          >
            <span>› {{ category.name }}</span><em>{{ category.count }}</em>
          </button>
        </section>

        <section class="sidebar-card calendar-card">
          <div class="sidebar-title"><span>▣</span> 2014年11月 <small>« 11 »</small></div>
          <div class="calendar-week"><span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span></div>
          <div class="calendar-grid">
            <span v-for="day in 30" :key="day" :class="{ muted: day < 2, today: day === 21, marked: day === 8 || day === 26 }">{{ day }}</span>
          </div>
        </section>

        <section class="sidebar-card visitor-card">
          <div class="sidebar-title"><span>♧</span> 最近访客 <small>更多…</small></div>
          <div class="visitor-grid">
            <div><b>墨香微步</b><small>10分钟前</small></div>
            <div><b>青木堂主</b><small>45分钟前</small></div>
            <div><b>江边小鱼</b><small>2小时前</small></div>
            <div><b>美育探索</b><small>4小时前</small></div>
            <div><b>澄江秋水</b><small>昨天</small></div>
            <div><b>林下风致</b><small>昨天</small></div>
          </div>
        </section>

        <section class="sidebar-card link-card">
          <div class="sidebar-title"><span>↗</span> 友情链接</div>
          <a href="#/art-display">↗ 城市美术馆 · 线上展厅</a>
          <a href="#/youth-palace">↗ 少年宫美育计划</a>
          <a href="#/news/chen-hui-interview">↗ 澄江文化观察</a>
        </section>
      </aside>

      <section class="blog-main">
        <article class="blog-article featured-article">
          <div class="article-heading">
            <div>
              <span class="pin-label">▣ 置顶</span>
              <h2>把时间留给一束慢慢移动的光</h2>
            </div>
            <button type="button" class="article-more">阅读全文 →</button>
          </div>
          <div class="article-meta">◷ 2014-11-21 09:42　|　分类：创作随笔　|　◉ 阅读 1,086</div>
          <p>最近的工作室很安静。上午十点以后，阳光会从东面的窗户移到桌角，落在一叠还没有装订的纸上。我常常停下手里的事，看它怎样一点点改变房间的颜色。</p>
          <p>创作有时并不是寻找一个答案，而是练习把一个问题保留得久一些。颜色、纸张和人的呼吸，都在提醒我：慢下来，才能看见事物真正的轮廓。</p>
          <div class="essay-cover" aria-label="陈晖工作室随笔插图">
            <span class="cover-note">STUDIO / 11.21</span>
            <div class="cover-sun"></div>
            <div class="cover-window"></div>
            <div class="cover-table"></div>
            <span class="cover-caption">一张桌子，一扇窗，和下午三点的蓝。</span>
          </div>
          <p>我把今天的草稿留在桌面上，没有急着判断它是否完成。也许一件作品最好的时刻，正是它还允许我们继续靠近的时候。</p>
          <blockquote>“真正的观看不是寻找结论，而是允许眼前的事物保持它自己的沉默。”</blockquote>
          <div class="article-actions"><button type="button">↗ 分享到微博</button><span>♥ 86</span><span>◫ 1,086</span><span>▣ 23</span><span>举报</span></div>
        </article>

        <article v-for="article in articles" :key="article.title" class="blog-article compact-article">
          <div class="compact-heading">
            <h3>{{ article.title }}</h3>
            <span>{{ article.category }}</span>
          </div>
          <div class="article-meta">◷ {{ article.date }}　|　{{ article.category }}　|　◉ {{ article.reads }} 次阅读</div>
          <p>{{ article.excerpt }}</p>
          <div class="compact-footer"><span v-for="tag in article.tags" :key="tag" class="article-tag"># {{ tag }}</span><button type="button">阅读全文 →</button></div>
        </article>

        <section class="comments-panel">
          <div class="comments-heading"><span>▱ 网友评论（18）</span><button type="button">✎ 写评论</button></div>
          <div class="comment" v-for="comment in [
            { name: '水墨青青', time: '2014-11-21 13:28', text: '喜欢这种慢慢写下来的文字，读完以后像在窗边坐了一会儿。' },
            { name: '纸上春秋', time: '2014-11-21 16:04', text: '“保留问题”这句话很有启发，期待看到这组草稿最后的样子。' },
            { name: '澄江网友', time: '2014-11-22 09:17', text: '下次去工作室附近散步，也想找找你写到的那束光。' },
          ]" :key="comment.name">
            <span class="comment-avatar">{{ comment.name.slice(0, 1) }}</span>
            <div><strong>{{ comment.name }}</strong><time>{{ comment.time }}</time><p>{{ comment.text }}</p><small>回复　▥ ({{ comment.name.length }})</small></div>
          </div>
          <div class="comment-editor"><span>请文明上网，登录后发表评论……</span><button type="button">发表评论</button></div>
        </section>

        <div class="pagination"><span>共 42 篇博文，第 1 / 5 页</span><button type="button" disabled>上一页</button><b>1</b><button type="button">2</button><button type="button">3</button><button type="button">4</button><span>…</span><button type="button">下一页</button></div>
      </section>
    </main>

    <footer class="blog-footer">
      <p>陈晖的艺术手记与生活随笔　|　关于作者　|　联系我　|　RSS订阅</p>
      <p>© 2014 Chen Hui Studio · 用文字保存那些值得回看的时刻</p>
    </footer>
  </div>
</template>

<style scoped>
.chen-blog-page {
  min-height: 100vh;
  background: #f2f1f0;
  color: #53616f;
  font-family: Arial, "Microsoft YaHei", sans-serif;
  font-size: 13px;
}

.chen-blog-page button,
.chen-blog-page a {
  font: inherit;
}

.blog-width {
  width: min(100% - 32px, 1100px);
  margin: 0 auto;
}

.blog-utility-bar {
  min-height: 28px;
  border-bottom: 1px solid #d3dbe7;
  background: #e8edf5;
  color: #7f8c99;
  font-size: 11px;
}

.utility-inner {
  min-height: 28px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.utility-home {
  color: #3188c8;
}

.utility-inner span:not(.utility-home) {
  cursor: default;
}

.utility-inner a {
  color: #2d83c4;
  text-decoration: none;
}

.utility-right {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-left: auto;
}

.utility-right b {
  width: 17px;
  height: 17px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #2d81bf;
  color: #fff;
  font-size: 8px;
}

.blog-header {
  border-bottom: 1px solid #c4d5e9;
  background: linear-gradient(110deg, #e9f1ff 0%, #f5f8ff 65%, #e6f0ff 100%);
}

.blog-heading {
  min-height: 166px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  padding: 27px 0 23px;
}

.blog-kicker {
  margin: 0 0 7px;
  color: #6e9eca;
  font-size: 10px;
  letter-spacing: 2px;
}

.blog-heading h1 {
  margin: 0;
  color: #233f62;
  font-size: 26px;
  font-weight: 400;
}

.blog-heading h1 strong {
  margin-left: 6px;
  padding: 3px 6px;
  border-radius: 2px;
  background: #f19a3e;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  vertical-align: middle;
}

.blog-motto {
  margin: 8px 0 20px;
  color: #769ac1;
  font-size: 13px;
}

.blog-stat-row {
  display: flex;
  gap: 10px;
}

.blog-stat-row span {
  padding: 5px 10px;
  border: 1px solid #bfd1e6;
  background: rgba(255, 255, 255, .74);
  color: #7c8b9b;
  font-size: 11px;
}

.blog-stat-row b {
  color: #3288c5;
  font-weight: 400;
}

.blog-heading-side {
  min-width: 250px;
  text-align: right;
}

.blog-address {
  display: inline-block;
  padding: 7px 11px;
  border: 1px solid #c5d4e6;
  border-radius: 2px;
  background: rgba(255, 255, 255, .78);
  color: #5186b6;
  font-size: 12px;
}

.blog-heading-side p {
  margin: 11px 0 15px;
  color: #8da0b4;
  font-size: 11px;
}

.blog-heading-side button,
.sidebar-follow {
  padding: 7px 17px;
  border-radius: 2px;
  cursor: pointer;
}

.follow-button,
.sidebar-follow {
  border: 1px solid #076db6;
  background: #0876c2;
  color: #fff;
}

.message-button {
  margin-left: 7px;
  border: 1px solid #b6cce2;
  background: #fff;
  color: #4d82b1;
}

.blog-nav {
  border-bottom: 1px solid #c7d5e5;
  background: #fff;
}

.blog-nav-inner {
  display: flex;
  align-items: flex-end;
  overflow-x: auto;
}

.blog-nav button {
  min-height: 38px;
  padding: 0 18px;
  border: 0;
  border-right: 1px solid #e2e8ef;
  background: #fff;
  color: #687b90;
  font-size: 12px;
  white-space: nowrap;
  cursor: pointer;
}

.blog-nav button:first-child {
  border-left: 1px solid #e2e8ef;
}

.blog-nav button.active {
  position: relative;
  background: #087ac7;
  color: #fff;
}

.blog-nav button.active::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: -1px;
  left: 0;
  height: 3px;
  background: #f39b37;
}

.blog-layout {
  display: grid;
  grid-template-columns: 198px minmax(0, 1fr);
  gap: 0;
  align-items: start;
  padding-top: 12px;
}

.blog-sidebar {
  min-width: 0;
}

.sidebar-card {
  margin-bottom: 10px;
  border: 1px solid #e1e4e8;
  background: #fff;
}

.sidebar-title {
  min-height: 27px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 9px;
  border-top: 3px solid #2b8bd0;
  border-bottom: 1px solid #e6e9ed;
  background: linear-gradient(#f8fbff, #edf2f7);
  color: #4f83b2;
  font-size: 11px;
}

.sidebar-title small {
  margin-left: auto;
  color: #9ca8b5;
  font-size: 10px;
  font-weight: 400;
}

.profile-card {
  padding-bottom: 12px;
  text-align: center;
}

.profile-card .portrait {
  width: 92px;
  height: 106px;
  display: block;
  margin: 12px auto 7px;
  border: 5px solid #edf0f2;
  object-fit: cover;
  object-position: center top;
}

.profile-card h2 {
  margin: 0;
  color: #44596f;
  font-size: 16px;
  font-weight: 500;
}

.profile-card h2 i {
  color: #ed9d2e;
  font-size: 12px;
  font-style: normal;
}

.profile-role {
  margin: 5px 0 8px;
  color: #c07f45;
  font-size: 10px;
}

.sidebar-follow {
  width: 80%;
  padding: 5px;
  font-size: 11px;
}

.profile-bio {
  margin: 12px 13px 10px;
  color: #7f8a95;
  font-size: 11px;
  line-height: 1.7;
  text-align: left;
}

.profile-numbers {
  display: flex;
  justify-content: space-around;
  margin: 0 10px;
  padding-top: 8px;
  border-top: 1px solid #eef0f2;
}

.profile-numbers div {
  flex: 1;
  border-right: 1px solid #edf0f2;
}

.profile-numbers div:last-child {
  border-right: 0;
}

.profile-numbers dt {
  color: #a0aab3;
  font-size: 10px;
}

.profile-numbers dd {
  margin: 4px 0 0;
  color: #4a83ba;
  font-size: 12px;
}

.category-card button {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 8px 10px;
  border: 0;
  background: #fff;
  color: #6d7e8d;
  font-size: 11px;
  text-align: left;
  cursor: pointer;
}

.category-card button:hover,
.category-card button.selected {
  background: #f0f7ff;
  color: #2382c3;
}

.category-card em {
  color: #aab3bb;
  font-size: 10px;
  font-style: normal;
}

.calendar-card {
  padding-bottom: 9px;
}

.calendar-week,
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 7px 8px 0;
  text-align: center;
}

.calendar-week span {
  color: #a2abb3;
  font-size: 9px;
}

.calendar-grid span {
  height: 22px;
  display: grid;
  place-items: center;
  color: #687a8a;
  font-size: 10px;
}

.calendar-grid span:nth-child(-n + 6) {
  color: #d2d7db;
}

.calendar-grid span.marked {
  color: #2382c3;
  font-weight: 700;
}

.calendar-grid span.today {
  border-radius: 2px;
  background: #087ac7;
  color: #fff;
}

.visitor-card {
  padding-bottom: 9px;
}

.visitor-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px 4px;
  padding: 10px 7px 3px;
  text-align: center;
}

.visitor-grid div {
  min-width: 0;
}

.visitor-grid b,
.visitor-grid small {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.visitor-grid b {
  color: #6f8dab;
  font-size: 10px;
  font-weight: 400;
}

.visitor-grid small {
  margin-top: 3px;
  color: #afb8bf;
  font-size: 9px;
}

.link-card {
  padding-bottom: 8px;
}

.link-card a {
  display: block;
  padding: 6px 10px 0;
  overflow: hidden;
  color: #6e8295;
  font-size: 10px;
  text-overflow: ellipsis;
  text-decoration: none;
  white-space: nowrap;
}

.link-card a:hover {
  color: #187fc1;
}

.blog-main {
  min-width: 0;
  padding-left: 0;
}

.blog-article,
.comments-panel,
.pagination {
  margin-left: 0;
  border: 1px solid #e5e6e7;
  background: #fff;
}

.blog-article {
  padding: 18px 25px;
}

.featured-article {
  border-left: 0;
}

.article-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 15px;
}

.pin-label {
  color: #f08e31;
  font-size: 11px;
}

.article-heading h2 {
  margin: 4px 0 5px;
  color: #3671ad;
  font-size: 21px;
  font-weight: 400;
}

.article-more,
.compact-footer button {
  padding: 3px 0;
  border: 0;
  background: transparent;
  color: #6e9ac1;
  font-size: 11px;
  white-space: nowrap;
  cursor: pointer;
}

.article-meta {
  color: #a0a9b0;
  font-size: 10px;
}

.blog-article p {
  margin: 17px 0 0;
  color: #5c6268;
  font-size: 13px;
  line-height: 2;
  text-indent: 2em;
}

.essay-cover {
  height: 205px;
  position: relative;
  overflow: hidden;
  margin: 18px auto 3px;
  background: linear-gradient(135deg, #dbe9f2 0%, #f7e9d6 54%, #cbdfee 100%);
}

.essay-cover::before,
.essay-cover::after {
  content: '';
  position: absolute;
  border-radius: 50%;
}

.essay-cover::before {
  width: 260px;
  height: 260px;
  top: -110px;
  right: 70px;
  background: rgba(255, 188, 108, .68);
}

.essay-cover::after {
  width: 390px;
  height: 120px;
  right: -70px;
  bottom: -27px;
  background: rgba(57, 117, 159, .54);
  transform: rotate(-13deg);
}

.cover-note,
.cover-caption {
  position: absolute;
  z-index: 2;
  color: rgba(45, 83, 112, .8);
  letter-spacing: 2px;
}

.cover-note {
  top: 17px;
  left: 22px;
  font-size: 10px;
}

.cover-caption {
  right: 23px;
  bottom: 16px;
  font-size: 11px;
  letter-spacing: 0;
}

.cover-sun {
  width: 78px;
  height: 78px;
  position: absolute;
  z-index: 1;
  top: 52px;
  left: 26%;
  border: 9px solid rgba(251, 225, 175, .7);
  border-radius: 50%;
}

.cover-window {
  width: 220px;
  height: 130px;
  position: absolute;
  z-index: 1;
  right: 20%;
  bottom: 15px;
  border: 7px solid rgba(255, 255, 255, .65);
  background: rgba(232, 242, 245, .22);
  transform: skew(-8deg);
}

.cover-table {
  width: 56%;
  height: 22px;
  position: absolute;
  z-index: 2;
  bottom: 18px;
  left: 16%;
  border-radius: 50%;
  background: rgba(57, 77, 89, .4);
  transform: rotate(-5deg);
}

.featured-article blockquote {
  margin: 17px 0 0;
  padding: 11px 14px;
  border-left: 3px solid #147dc5;
  background: #f2f7fc;
  color: #3970a5;
  font-size: 12px;
  line-height: 1.8;
}

.article-actions {
  display: flex;
  justify-content: flex-end;
  gap: 17px;
  margin-top: 18px;
  color: #a0a8ae;
  font-size: 10px;
}

.article-actions button {
  padding: 4px 9px;
  border: 1px solid #e1a264;
  background: #f1944b;
  color: #fff;
  font-size: 10px;
  cursor: pointer;
}

.compact-article {
  margin-top: 10px;
  border-left: 0;
  padding-top: 14px;
  padding-bottom: 13px;
}

.compact-heading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}

.compact-heading h3 {
  margin: 0;
  color: #407db6;
  font-size: 17px;
  font-weight: 400;
}

.compact-heading span {
  color: #a6adb3;
  font-size: 10px;
  white-space: nowrap;
}

.compact-article p {
  margin: 10px 0 0;
  overflow: hidden;
  color: #70777d;
  font-size: 12px;
  line-height: 1.8;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.compact-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.article-tag {
  padding: 2px 5px;
  background: #f0f5f9;
  color: #8b9fac;
  font-size: 10px;
}

.compact-footer button {
  margin-left: auto;
}

.comments-panel {
  margin-top: 12px;
  border-left: 0;
}

.comments-heading {
  min-height: 31px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  border-top: 3px solid #318bd0;
  background: linear-gradient(#f9fbfe, #ecf1f6);
  color: #5485af;
  font-size: 12px;
}

.comments-heading button {
  padding: 0;
  border: 0;
  background: transparent;
  color: #4388bf;
  cursor: pointer;
  font-size: 10px;
}

.comment {
  display: flex;
  gap: 11px;
  padding: 15px 17px 8px;
}

.comment-avatar {
  width: 28px;
  height: 28px;
  display: grid;
  flex-shrink: 0;
  place-items: center;
  background: #1b83c6;
  color: #fff;
  font-size: 12px;
}

.comment:nth-child(3) .comment-avatar {
  background: #b95b14;
}

.comment:nth-child(4) .comment-avatar {
  background: #e2e5e8;
  color: #7290ad;
}

.comment strong {
  color: #397bb4;
  font-size: 11px;
  font-weight: 400;
}

.comment time {
  float: right;
  color: #adb4ba;
  font-size: 10px;
}

.comment p {
  margin: 6px 0 4px;
  color: #626b73;
  font-size: 12px;
  line-height: 1.7;
}

.comment small {
  color: #a2abb2;
  font-size: 10px;
}

.comment-editor {
  min-height: 73px;
  position: relative;
  margin: 13px 16px 16px;
  padding: 12px;
  border: 1px solid #e2e5e8;
  background: #fcfcfc;
  color: #b4bcc3;
  font-size: 11px;
}

.comment-editor button {
  position: absolute;
  right: 0;
  bottom: -35px;
  padding: 7px 17px;
  border: 1px solid #0e6eb2;
  background: #087ac7;
  color: #fff;
  cursor: pointer;
  font-size: 11px;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-top: 42px;
  margin-bottom: 30px;
  padding: 12px 17px;
  color: #9ba6af;
  font-size: 10px;
}

.pagination button,
.pagination b {
  min-width: 22px;
  height: 21px;
  display: grid;
  place-items: center;
  border: 0;
  background: transparent;
  color: #527d9f;
  font-size: 10px;
  cursor: pointer;
}

.pagination span:first-child {
  margin-right: auto;
}

.pagination b {
  background: #087ac7;
  color: #fff;
  font-weight: 400;
}

.pagination button:disabled {
  color: #c8cdd1;
  cursor: default;
}

.blog-footer {
  padding: 28px 16px 35px;
  border-top: 1px solid #d8dadd;
  background: #e9e8e7;
  color: #8c959c;
  font-size: 10px;
  text-align: center;
  line-height: 1.9;
}

.blog-footer p {
  margin: 0;
}

@media (max-width: 760px) {
  .utility-inner span:nth-child(n + 3),
  .utility-right span:nth-child(2),
  .utility-right span:nth-child(3) {
    display: none;
  }

  .blog-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 18px;
  }

  .blog-heading-side {
    width: 100%;
    text-align: left;
  }

  .blog-heading-side p {
    display: inline-block;
    margin: 0 12px 0 0;
  }

  .blog-layout {
    grid-template-columns: 1fr;
  }

  .blog-sidebar {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .profile-card {
    grid-row: span 2;
  }

  .sidebar-card {
    margin-bottom: 0;
  }

  .blog-main {
    margin-top: 10px;
  }
}

@media (max-width: 500px) {
  .blog-width {
    width: min(100% - 20px, 1100px);
  }

  .blog-heading h1 {
    font-size: 21px;
  }

  .blog-stat-row {
    flex-wrap: wrap;
  }

  .blog-sidebar {
    display: block;
  }

  .sidebar-card {
    margin-bottom: 10px;
  }

  .blog-article {
    padding: 15px;
  }

  .article-heading h2 {
    font-size: 18px;
  }

  .article-more {
    display: none;
  }

  .essay-cover {
    height: 160px;
  }

  .compact-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 5px;
  }

  .compact-article p {
    white-space: normal;
  }

  .pagination {
    gap: 3px;
    padding: 10px 7px;
  }
}
</style>
