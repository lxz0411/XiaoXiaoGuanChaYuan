<script setup>
import palaceBanner from '../../素材/少年宫页/banner.jpg'
import bonfireParty from '../../素材/少年宫页/篝火晚会.png'
import fishParadise from '../../素材/少年宫页/小鱼乐园.png'
import bustlingCity from '../../素材/少年宫页/繁华的城市.png'
import greenEarth from '../../素材/少年宫页/绿色地球.png'

const navItems = ['首页', '宫务公开', '活动资讯', '培训课程', '社团风采', '作品档案', '家长园地']

const artworks = [
  {
    title: '《繁华的城市》',
    image: bustlingCity,
    name: '李然',
    age: 11,
    school: '澄江实验小学',
  },
  {
    title: '《篝火晚会》',
    image: bonfireParty,
    name: '方语彤',
    age: 10,
    school: '澄江市第二小学',
  },
  {
    title: '《小鱼乐园》',
    image: fishParadise,
    name: '蒋乐天',
    age: 12,
    school: '澄江市育才小学',
  },
  {
    title: '《我们的绿色未来》',
    image: greenEarth,
    name: '罗可欣',
    age: 9,
    school: '澄江市新城小学',
  },
]

const notices = [
  { date: '09-12', text: '秋季公益兴趣班补录通知' },
  { date: '09-08', text: '“童心绘家乡”少儿美术作品征集启事' },
  { date: '09-03', text: '青少年宫新学期开放时间安排' },
  { date: '08-28', text: '关于开展周末亲子实践活动的通知' },
]

const courses = [
  { icon: '♫', name: '音乐课堂', detail: '钢琴 · 声乐 · 民乐' },
  { icon: '✎', name: '美术工坊', detail: '绘画 · 书法 · 手工' },
  { icon: '♟', name: '益智活动', detail: '围棋 · 科学 · 阅读' },
  { icon: '★', name: '舞台艺术', detail: '舞蹈 · 戏剧 · 主持' },
]
</script>

<template>
  <div class="youth-palace-page">
    <div class="utility-bar">
      <div class="page-width">
        <span>欢迎访问澄江市青少年宫官方网站！</span>
        <span>今天是 2014年9月15日 星期一</span>
      </div>
    </div>

    <header>
      <div class="page-width brand-row">
        <div class="emblem" aria-hidden="true">
          <span>★</span>
        </div>
        <div class="brand-copy">
          <h1>澄江市青少年宫</h1>
          <p>CHENGJIANG CHILDREN'S PALACE</p>
        </div>
        <div class="slogan">快乐学习 · 健康成长 · 放飞梦想</div>
      </div>

      <nav>
        <div class="page-width">
          <button
            v-for="(item, index) in navItems"
            :key="item"
            type="button"
            :class="{ active: index === 0 }"
          >
            {{ item }}
          </button>
        </div>
      </nav>
    </header>

    <main>
      <section class="banner">
        <img :src="palaceBanner" alt="澄江市少年宫——快乐学习、健康成长、多彩童年">
      </section>

      <section class="information page-width">
        <div class="notice-panel">
          <div class="section-title compact">
            <div>
              <span>NEWS &amp; NOTICE</span>
              <h2>通知公告</h2>
            </div>
            <button type="button">更多 +</button>
          </div>
          <ul>
            <li v-for="notice in notices" :key="notice.text">
              <span>{{ notice.text }}</span>
              <time>{{ notice.date }}</time>
            </li>
          </ul>
        </div>

        <div class="course-panel">
          <div class="section-title compact">
            <div>
              <span>POPULAR COURSES</span>
              <h2>特色课程</h2>
            </div>
          </div>
          <div class="course-grid">
            <div v-for="course in courses" :key="course.name" class="course-item">
              <i>{{ course.icon }}</i>
              <div>
                <strong>{{ course.name }}</strong>
                <span>{{ course.detail }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="archive">
        <div class="page-width">
          <div class="section-title archive-heading">
            <div>
              <span>CHILDREN'S ART ARCHIVE</span>
              <h2>优秀儿童作品档案库</h2>
              <p>珍藏历年澄江市少年儿童的想象与成长</p>
            </div>
            <div class="archive-mark">馆藏精选</div>
          </div>

          <div class="artwork-grid">
            <article v-for="artwork in artworks" :key="artwork.title" class="artwork-card">
              <div class="artwork-image">
                <img :src="artwork.image" :alt="`${artwork.name}创作的${artwork.title}`">
              </div>
              <div class="artwork-info">
                <h3>{{ artwork.title }}</h3>
                <dl>
                  <div>
                    <dt>作者</dt>
                    <dd>{{ artwork.name }}</dd>
                  </div>
                  <div>
                    <dt>年龄</dt>
                    <dd>{{ artwork.age }}岁</dd>
                  </div>
                  <div>
                    <dt>学校</dt>
                    <dd>{{ artwork.school }}</dd>
                  </div>
                </dl>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <div class="page-width">
        <strong>澄江市青少年宫</strong>
        <p>地址：澄江市文化路18号　咨询电话：0871-6123456　开放时间：周二至周日 9:00—17:30</p>
        <span>版权所有 © 2014 澄江市青少年宫</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.youth-palace-page {
  min-height: 100vh;
  background: #fff;
  color: #294052;
  font-family: Arial, "Microsoft YaHei", sans-serif;
}

.page-width {
  width: min(100% - 40px, 1120px);
  margin: 0 auto;
}

.utility-bar {
  background: #eef8fd;
  color: #6b8799;
  font-size: 12px;
}

.utility-bar .page-width {
  min-height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand-row {
  height: 112px;
  display: flex;
  align-items: center;
}

.emblem {
  width: 72px;
  height: 72px;
  position: relative;
  display: grid;
  place-items: center;
  border-radius: 50% 50% 45% 55%;
  background: linear-gradient(145deg, #ffbb32, #f0782d);
  box-shadow: inset 0 0 0 6px #fff, 0 3px 12px rgba(39, 124, 168, 0.18);
  color: #fff;
  font-size: 31px;
  transform: rotate(-8deg);
}

.emblem::after {
  content: "";
  width: 24px;
  height: 31px;
  position: absolute;
  right: -8px;
  bottom: 5px;
  border-radius: 80% 0 80% 20%;
  background: #5fb9d8;
}

.emblem span {
  transform: rotate(8deg);
}

.brand-copy {
  margin-left: 18px;
}

.brand-copy h1 {
  margin: 0;
  color: #187eae;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 3px;
}

.brand-copy p {
  margin: 5px 0 0;
  color: #72a5bd;
  font-size: 10px;
  letter-spacing: 2.2px;
}

.slogan {
  margin-left: auto;
  color: #ef8a34;
  font-size: 15px;
  letter-spacing: 3px;
}

nav {
  background: #1685b9;
  box-shadow: 0 3px 8px rgba(36, 97, 126, 0.16);
}

nav .page-width {
  display: flex;
}

nav button {
  min-width: 130px;
  flex: 1;
  padding: 14px 12px;
  border: 0;
  background: transparent;
  color: #fff;
  font: 15px "Microsoft YaHei", sans-serif;
  pointer-events: none;
}

nav button.active {
  background: #f39a36;
}

.banner {
  overflow: hidden;
  background: #d8f4ff;
}

.banner img {
  width: auto;
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}

.section-title > div > span {
  color: #49a4c5;
  font-size: 10px;
  letter-spacing: 2px;
}

.information {
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: 55px;
  padding-top: 54px;
  padding-bottom: 58px;
}

.section-title {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.section-title h2 {
  margin: 6px 0 0;
  color: #25475a;
  font-size: 27px;
}

.section-title button {
  border: 0;
  background: transparent;
  color: #8ba0aa;
  font-size: 12px;
  pointer-events: none;
}

.notice-panel ul {
  margin: 18px 0 0;
  padding: 0;
  list-style: none;
}

.notice-panel li {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 11px 2px;
  border-bottom: 1px dotted #c9d7de;
  font-size: 14px;
}

.notice-panel time {
  color: #9aabb3;
}

.course-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 18px;
}

.course-item {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 15px;
  border-radius: 4px;
  background: #f2f9fc;
}

.course-item i {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #f59b3e;
  color: #fff;
  font-size: 21px;
  font-style: normal;
}

.course-item:nth-child(even) i {
  background: #39a5c1;
}

.course-item strong,
.course-item span {
  display: block;
}

.course-item strong {
  color: #32637b;
  font-size: 14px;
}

.course-item span {
  margin-top: 5px;
  color: #849ba7;
  font-size: 11px;
}

.archive {
  padding: 62px 0 72px;
  background: #f2f8fa;
  border-top: 1px solid #dfedf2;
}

.archive-heading {
  margin-bottom: 30px;
}

.archive-heading p {
  margin: 8px 0 0;
  color: #8095a0;
  font-size: 13px;
}

.archive-mark {
  padding: 8px 19px;
  border: 1px solid #e4a25e;
  color: #db852f;
  font-size: 12px;
  letter-spacing: 2px;
}

.artwork-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px;
}

.artwork-card {
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  min-height: 260px;
  background: #fff;
  border: 1px solid #e1e9ec;
  box-shadow: 0 8px 24px rgba(46, 86, 104, 0.08);
}

.artwork-image {
  min-width: 0;
  position: relative;
  overflow: hidden;
  background: #e8eef0;
}

.artwork-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.artwork-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px;
}

.artwork-info h3 {
  margin: 0 0 20px;
  color: #214f67;
  font: 700 21px "SimSun", serif;
}

.artwork-info dl {
  margin: 0;
}

.artwork-info dl > div {
  display: grid;
  grid-template-columns: 42px 1fr;
  gap: 8px;
  padding: 7px 0;
  border-top: 1px dotted #d9e2e6;
  font-size: 13px;
}

.artwork-info dt {
  color: #98a8af;
}

.artwork-info dd {
  margin: 0;
  color: #425f6d;
}

footer {
  padding: 35px 0;
  background: #1b6f96;
  color: rgba(255, 255, 255, 0.75);
  text-align: center;
}

footer strong {
  color: #fff;
  font-size: 16px;
}

footer p {
  margin: 10px 0 7px;
  font-size: 12px;
}

footer span {
  font-size: 11px;
}

@media (max-width: 900px) {
  .slogan {
    display: none;
  }

  nav {
    overflow-x: auto;
  }

  nav .page-width {
    width: max-content;
  }

  .information {
    grid-template-columns: 1fr;
    gap: 38px;
  }

  .artwork-card {
    grid-template-columns: 1fr;
  }

  .artwork-image {
    aspect-ratio: 4 / 3;
  }
}

@media (max-width: 640px) {
  .utility-bar .page-width span:last-child {
    display: none;
  }

  .brand-row {
    height: 92px;
  }

  .emblem {
    width: 58px;
    height: 58px;
  }

  .brand-copy h1 {
    font-size: 24px;
    letter-spacing: 1px;
  }

  .course-grid,
  .artwork-grid {
    grid-template-columns: 1fr;
  }

  .archive-mark {
    display: none;
  }
}
</style>
