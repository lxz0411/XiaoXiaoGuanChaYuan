<script setup>
import heroImage from '../../素材/画展页/旷野与回声的切面.png'
import structureAndGaze from '../../素材/画展页/结构与凝视.png'
import wildernessAndEcho from '../../素材/画展页/旷野与回声的切面.png'
import anonymous from '../../素材/画展页/匿名者.png'

const artworks = [
  {
    catalog: 'CAT. NO. 2014-PT-01',
    title: '《结构与凝视 No.7》',
    image: structureAndGaze,
    href: '#/art-display/structure-and-gaze',
  },
  {
    catalog: 'CAT. NO. 2014-PT-02',
    title: '《旷野与回声的切面》',
    image: wildernessAndEcho,
    href: '#/art-display/wilderness-and-echo',
  },
  {
    catalog: 'CAT. NO. 2014-PT-03',
    title: '《匿名者》',
    image: anonymous,
    href: '#/art-display/anonymous',
  },
]
</script>

<template>
  <div class="art-display-page">
    <header class="site-header">
      <h1>UCCA当代艺术空间</h1>
      <p>2014当代艺术展</p>
    </header>

    <main>
      <section class="exhibition-intro">
        <div class="hero">
          <img :src="heroImage" alt="">
          <div class="hero-shade"></div>
          <div class="hero-copy">
            <p>AUTUMN ANNUAL CONTEMPORARY MASTER EXHIBITION</p>
            <h2>无界之象 · 2014当代绘画艺术展</h2>
            <em>Boundless Visions: Curated Contemporary Visions 2014</em>
          </div>
        </div>

        <div class="primary-details">
          <div>
            <span>展期时间 / DURATION</span>
            <strong>2014.10.18 — 12.28</strong>
          </div>
          <div>
            <span>展览场地 / LOCATION</span>
            <strong>798 当代艺术中心 · 1号主展厅</strong>
          </div>
        </div>
      </section>

      <section class="catalogue">
        <div class="section-heading">
          <span>CATALOGUE SELECTION</span>
          <h2>参展画作精选</h2>
        </div>

        <div class="artwork-grid">
          <component
            :is="artwork.href ? 'a' : 'article'"
            v-for="artwork in artworks"
            :key="artwork.catalog"
            :href="artwork.href"
            class="artwork-card"
            :class="{ clickable: artwork.href }"
          >
            <div class="artwork-image">
              <img :src="artwork.image" :alt="artwork.title">
            </div>
            <span>{{ artwork.catalog }}</span>
            <h3>{{ artwork.title }}</h3>
          </component>
        </div>
      </section>
    </main>

    <footer>
      <div class="footer-grid">
        <section>
          <span>展期 / EXHIBITION PERIOD</span>
          <strong>2014.10.15 — 2014.12.20</strong>
          <p>每日 10:00 — 19:00（18:30 停止入场）<br>每周一闭馆 / Closed on Mondays</p>
        </section>
        <section>
          <span>展厅场地 / VENUE</span>
          <strong>UCCA 尤伦斯当代艺术中心 · 大展厅</strong>
          <p>澄江市枫叶桥路4号798艺术区<br>No. 4 Fengyeqiao Rd, 798 Art District, Chengjiang</p>
        </section>
        <section>
          <span>文献与典藏 / ARCHIVE &amp; LEGAL</span>
          <strong>展品档案编号：UCCA-CAT-2014-10</strong>
          <p>所有图像版权归艺术家及基金会所有<br>© 2014 UCCA CENTER FOR CONTEMPORARY ART</p>
        </section>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.art-display-page {
  min-height: 100vh;
  background: #fff;
  color: #111;
  font-family: Arial, "Microsoft YaHei", sans-serif;
}

.site-header {
  height: 94px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top: 4px solid #050505;
}

.site-header h1 {
  margin: 0;
  font-size: 15px;
  font-weight: 500;
}

.site-header p {
  margin: 4px 0 0;
  color: #aaa;
  font-size: 8px;
  letter-spacing: 2px;
}

.exhibition-intro {
  width: min(100% - 90px, 1160px);
  margin: 0 auto;
  padding: 34px 0 58px;
}

.hero {
  height: 448px;
  position: relative;
  overflow: hidden;
  display: grid;
  place-items: center;
  background: #eee;
}

.hero > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(1px);
  transform: scale(1.02);
}

.hero-shade {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.76);
}

.hero-copy {
  width: min(90%, 760px);
  position: absolute;
  text-align: center;
}

.hero-copy p {
  margin: 0 0 12px;
  font-size: 9px;
  letter-spacing: 1.7px;
}

.hero-copy h2 {
  margin: 0;
  font-size: clamp(30px, 4vw, 50px);
  font-weight: 400;
  line-height: 1.17;
  letter-spacing: 1px;
}

.hero-copy em {
  display: block;
  margin-top: 19px;
  color: #666;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 17px;
}

.primary-details {
  display: flex;
  gap: 32px;
  margin-top: 36px;
}

.primary-details > div {
  min-width: 200px;
  padding-right: 32px;
  border-right: 1px solid #ddd;
}

.primary-details > div:last-child {
  border-right: 0;
}

.primary-details span,
.section-heading span,
.artwork-card span,
.footer-grid span {
  display: block;
  color: #777;
  font-size: 8px;
  letter-spacing: 1px;
}

.primary-details strong {
  display: block;
  margin-top: 9px;
  font-family: Georgia, "SimSun", serif;
  font-size: 15px;
  font-weight: 400;
}

.catalogue {
  padding: 66px max(45px, calc((100% - 1160px) / 2)) 62px;
  background: #f7f7f7;
}

.section-heading h2 {
  margin: 8px 0 36px;
  font-size: 32px;
  font-weight: 400;
}

.artwork-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
}

.artwork-card {
  padding: 16px 16px 22px;
  background: #fff;
  color: inherit;
  text-decoration: none;
  transition: transform 260ms ease, box-shadow 260ms ease;
}

.artwork-card.clickable {
  cursor: pointer;
}

.artwork-card.clickable:hover,
.artwork-card.clickable:focus-visible {
  transform: scale(1.025);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.16);
  outline: none;
}

.artwork-image {
  height: 250px;
  margin-bottom: 22px;
  overflow: hidden;
  background: #eee;
}

.artwork-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.artwork-card h3 {
  margin: 7px 0 0;
  font-family: "SimSun", serif;
  font-size: 22px;
  font-weight: 400;
}

footer {
  padding: 58px max(45px, calc((100% - 1160px) / 2)) 66px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 0.9fr 1.4fr 1.25fr 1.1fr;
  gap: 44px;
}

.footer-grid strong {
  display: block;
  margin-top: 15px;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.7;
}

.footer-grid p {
  margin: 10px 0 0;
  color: #555;
  font-size: 9px;
  line-height: 1.65;
}

@media (max-width: 900px) {
  .exhibition-intro {
    width: min(100% - 40px, 1160px);
  }

  .hero {
    height: 390px;
  }

  .catalogue,
  footer {
    padding-right: 20px;
    padding-left: 20px;
  }

  .artwork-grid {
    gap: 16px;
  }

  .artwork-image {
    height: 210px;
  }

  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .site-header {
    height: 80px;
  }

  .exhibition-intro {
    padding-top: 18px;
  }

  .hero {
    height: 360px;
  }

  .hero-copy h2 {
    font-size: 31px;
  }

  .hero-copy em {
    font-size: 14px;
  }

  .primary-details {
    display: grid;
    gap: 20px;
  }

  .primary-details > div {
    padding: 0 0 16px;
    border-right: 0;
    border-bottom: 1px solid #ddd;
  }

  .artwork-grid,
  .footer-grid {
    grid-template-columns: 1fr;
  }

  .artwork-grid {
    gap: 24px;
  }

  .artwork-image {
    height: auto;
    aspect-ratio: 4 / 3;
  }
}
</style>
