<script setup>
import anonymousArtwork from '../../素材/画展页/匿名者.png'
import liRanPortrait from '../../素材/李然.png'
import memorialArtworkOne from '../../素材/李然画展/李然画1.png'
import memorialArtworkTwo from '../../素材/李然画展/李然画2.png'

const archiveWorks = [
  {
    title: '《无声的肖像》',
    note: '布面综合材料，2012',
    image: memorialArtworkOne,
  },
  {
    title: '《远方的回声》',
    note: '布面油画，2013',
    image: memorialArtworkTwo,
  },
  {
    title: '《匿名者》',
    note: '布面油画，2014',
    image: anonymousArtwork,
  },
]
</script>

<template>
  <div class="memorial-page">
    <header class="site-header">
      <div class="page-width header-inner">
        <div class="wordmark">
          <strong>澄江当代艺术空间</strong>
          <span>CHENGJIANG CONTEMPORARY ART</span>
        </div>
        <nav>
          <button type="button">展览</button>
          <button type="button">艺术家</button>
          <button type="button">文献</button>
          <button type="button">关于</button>
        </nav>
        <span class="header-dot">●</span>
      </div>
    </header>

    <main>
      <section class="hero">
        <div class="page-width hero-copy">
          <p class="hero-eyebrow">IN MEMORIAM · A RETROSPECTIVE EXHIBITION</p>
          <span>特别纪念展</span>
          <h1>李然：凝视与回响</h1>
          <em>Li Ran: Gaze and Reverberation</em>
          <p class="hero-credits">主创：李雪&nbsp;&nbsp;陈晖</p>
        </div>

        <div class="page-width exhibition-bar">
          <div>
            <span>展期 / DURATION</span>
            <strong>2014.10.18 — 2015.01.05</strong>
          </div>
          <div>
            <span>地点 / LOCATION</span>
            <strong>澄江当代艺术中心 · 2号纪念展厅</strong>
          </div>
          <button type="button">参观信息 →</button>
        </div>
      </section>

      <section class="featured-work">
        <div class="page-width">
          <div class="artwork-frame large-frame">
            <img :src="memorialArtworkOne" alt="李然作品《无声的肖像 No.1》">
          </div>
          <div class="artwork-caption">
            <div>
              <h2>《无声的肖像 No.1》</h2>
              <p>Silent Portrait No.1, 2012</p>
            </div>
            <span>布面油画　180 × 240 cm</span>
          </div>
        </div>
      </section>

      <section class="artist-section">
        <div class="page-width artist-grid">
          <div class="artist-image">
            <img :src="liRanPortrait" alt="艺术家李然在工作室">
            <p>李然在工作室</p>
          </div>
          <article>
            <span>ARTIST STATEMENT</span>
            <blockquote>“它们是生活，<br>也是被生活遮蔽的人。”</blockquote>
            <p>李然长期以城市、人群与日常生活为主题。他刻意隐去画中人物的面部特征，仅保留动作、距离和环境，让观看者无法借助身份迅速理解他们。</p>
            <p>在这些无名的人物之间，亲密与疏离同时存在。繁华城市成为沉默的背景，每一次凝视都像是对个体存在的一次重新确认。</p>
          </article>
        </div>
      </section>

      <section class="archive-section">
        <div class="page-width">
          <div class="section-heading">
            <div>
              <span>SELECTED ARCHIVE</span>
              <h2>作品与档案</h2>
            </div>
          </div>

          <div class="archive-grid">
            <article v-for="work in archiveWorks" :key="work.title">
              <div class="artwork-frame">
                <img :src="work.image" :alt="work.title">
              </div>
              <div>
                <h3>{{ work.title }}</h3>
                <span>{{ work.note }}</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="visit-section">
        <div class="page-width visit-grid">
          <div>
            <span>展览时间 / EXHIBITION PERIOD</span>
            <strong>2014.10.18 — 2015.01.05</strong>
            <p>每日 10:00—18:00，17:30停止入场<br>每周一闭馆，节假日除外</p>
          </div>
          <div>
            <span>策展与研究 / CURATORIAL</span>
            <strong>澄江当代艺术中心研究部</strong>
            <p>文献整理：李雪  陈晖</p>
          </div>
          <div>
            <span>展览地点 / VENUE</span>
            <strong>澄江当代艺术中心</strong>
            <p>澄江市文化艺术区798号<br>2号纪念展厅</p>
          </div>
          <button type="button">获取参观指南</button>
        </div>
      </section>
    </main>

    <footer>
      <div class="page-width footer-grid">
        <div>
          <strong>澄江当代艺术空间</strong>
          <p>CHENGJIANG CONTEMPORARY ART</p>
        </div>
        <p>本展览所呈作品及文献由李然家属授权使用<br>© 2014 CHENGJIANG CONTEMPORARY ART</p>
        <span>IN MEMORY OF LI RAN, 1975—2014</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.memorial-page {
  min-height: 100vh;
  background: #ebe9e4;
  color: #141414;
  font-family: Arial, "Microsoft YaHei", sans-serif;
}

.page-width {
  width: min(100% - 52px, 1120px);
  margin: 0 auto;
}

.site-header {
  height: 64px;
  background: #f3f2ee;
}

.header-inner {
  height: 100%;
  display: flex;
  align-items: center;
}

.wordmark strong,
.wordmark span {
  display: block;
}

.wordmark strong {
  font-size: 12px;
  letter-spacing: 2px;
}

.wordmark span {
  margin-top: 3px;
  color: #777;
  font-size: 7px;
  letter-spacing: 1.2px;
}

.site-header nav {
  display: flex;
  gap: 30px;
  margin-left: auto;
}

.site-header button {
  padding: 0;
  border: 0;
  background: transparent;
  font-size: 10px;
  pointer-events: none;
}

.header-dot {
  margin-left: 34px;
  font-size: 13px;
}

.hero {
  padding: 92px 0 38px;
  background: #050505;
  color: #fff;
}

.hero-eyebrow {
  margin: 0;
  color: #777;
  font-size: 9px;
  letter-spacing: 2.4px;
}

.hero-copy > span {
  display: block;
  margin-top: 56px;
  color: #989898;
  font-size: 10px;
  letter-spacing: 3px;
}

.hero h1 {
  margin: 13px 0 0;
  font: 400 clamp(38px, 5vw, 66px)/1.2 "SimSun", serif;
  letter-spacing: 4px;
}

.hero em {
  display: block;
  margin-top: 14px;
  color: #a4a4a4;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 15px;
}

.hero-credits {
  margin: 12px 0 0;
  color: #858585;
  font-size: 16px;
  letter-spacing: 1px;
}

.exhibition-bar {
  min-height: 98px;
  display: grid;
  grid-template-columns: 1fr 1.4fr auto;
  align-items: center;
  gap: 32px;
  margin-top: 70px;
  padding: 0 28px;
  background: #111;
  border: 1px solid #1f1f1f;
}

.exhibition-bar span,
.visit-grid span {
  display: block;
  color: #777;
  font-size: 8px;
  letter-spacing: 1.2px;
}

.exhibition-bar strong {
  display: block;
  margin-top: 9px;
  font-family: Georgia, "SimSun", serif;
  font-size: 14px;
  font-weight: 400;
}

.exhibition-bar button,
.visit-grid button {
  padding: 11px 20px;
  border: 0;
  background: #f3f2ee;
  color: #111;
  font-size: 9px;
  pointer-events: none;
}

.featured-work {
  padding: 82px 0 70px;
  background: #dfddd7;
}

.artwork-frame {
  padding: 16px;
  background: #f6f5f1;
}

.large-frame img {
  width: 100%;
  max-height: 670px;
  display: block;
  object-fit: cover;
}

.artwork-caption {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 20px 18px 0;
}

.artwork-caption h2 {
  margin: 0;
  font: 400 22px "SimSun", serif;
}

.artwork-caption p,
.artwork-caption > span {
  color: #777;
  font-size: 9px;
}

.artwork-caption p {
  margin: 7px 0 0;
  font-family: Georgia, "Times New Roman", serif;
}

.artist-section {
  background: #050505;
  color: #fff;
}

.artist-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.artist-image {
  padding: 82px 52px 82px 0;
  background: transparent;
  color: #fff;
}

.artist-image img {
  width: 100%;
  display: block;
  filter: grayscale(1) contrast(1.06);
}

.artist-image p {
  margin: 12px 0 0;
  font: 10px Georgia, serif;
}

.artist-grid article {
  padding: 94px 0 70px 70px;
}

.artist-grid article > span,
.section-heading span {
  color: #777;
  font-size: 8px;
  letter-spacing: 1.8px;
}

blockquote {
  margin: 36px 0 44px;
  font: 400 29px/1.65 "SimSun", serif;
}

.artist-grid article > p {
  margin: 0 0 22px;
  color: #aaa;
  font: 13px/2 "SimSun", serif;
}

.archive-section {
  padding: 75px 0 82px;
  background: #ebe9e4;
}

.section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 34px;
}

.section-heading h2 {
  margin: 8px 0 0;
  font: 400 31px "SimSun", serif;
}

.section-heading > p {
  margin: 0;
  color: #888;
  font-size: 10px;
}

.archive-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.archive-grid article {
  min-width: 0;
}

.archive-grid .artwork-frame {
  aspect-ratio: 4 / 3;
}

.archive-grid img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.archive-grid article > div:last-child {
  display: flex;
  justify-content: space-between;
  padding: 15px 6px 0;
}

.archive-grid h3 {
  margin: 0;
  font: 400 16px "SimSun", serif;
}

.archive-grid span {
  color: #777;
  font-size: 9px;
}

.visit-section {
  padding: 46px 0;
  background: #18171b;
  color: #fff;
}

.visit-grid {
  display: grid;
  grid-template-columns: 1fr 1.1fr 1fr auto;
  align-items: center;
  gap: 42px;
}

.visit-grid strong {
  display: block;
  margin-top: 10px;
  font-size: 11px;
  font-weight: 400;
}

.visit-grid p {
  margin: 8px 0 0;
  color: #888;
  font-size: 9px;
  line-height: 1.7;
}

footer {
  padding: 54px 0 60px;
  background: #f3f2ee;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr 1.3fr 1fr;
  align-items: end;
  gap: 45px;
}

.footer-grid strong {
  font-size: 12px;
  letter-spacing: 2px;
}

.footer-grid p,
.footer-grid span {
  margin: 7px 0 0;
  color: #777;
  font-size: 8px;
  line-height: 1.7;
}

.footer-grid > span {
  text-align: right;
  letter-spacing: 1px;
}

@media (max-width: 800px) {
  .site-header nav {
    display: none;
  }

  .header-dot {
    margin-left: auto;
  }

  .exhibition-bar,
  .visit-grid {
    grid-template-columns: 1fr 1fr;
    padding: 24px;
  }

  .artist-grid {
    grid-template-columns: 1fr;
  }

  .artist-image {
    padding: 45px 0;
  }

  .artist-grid article {
    padding: 60px 0;
  }

  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }

  .archive-grid {
    grid-template-columns: 1fr 1fr;
  }

  .footer-grid > span {
    display: none;
  }
}

@media (max-width: 560px) {
  .page-width {
    width: min(100% - 28px, 1120px);
  }

  .hero {
    padding-top: 65px;
  }

  .hero h1 {
    font-size: 38px;
  }

  .exhibition-bar,
  .visit-grid,
  .archive-grid,
  .footer-grid {
    grid-template-columns: 1fr;
  }

  .exhibition-bar {
    gap: 22px;
  }

  .artwork-caption,
  .section-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 13px;
  }

  blockquote {
    font-size: 25px;
  }
}
</style>
