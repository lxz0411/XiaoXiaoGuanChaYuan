<script setup>
import { computed } from 'vue'
import anonymous from '../../素材/画展页/匿名者.png'
import structureAndGaze from '../../素材/画展页/结构与凝视.png'
import wildernessAndEcho from '../../素材/画展页/旷野与回声的切面.png'

const artworks = {
  'structure-and-gaze': {
    title: '《结构与凝视 No.7》',
    englishTitle: 'Structure and Gaze No. 7, 2014',
    artist: '林越',
    englishArtist: 'Lin Yue',
    image: structureAndGaze,
    description: '在冷峻的蓝灰与厚重白色的几何交叠中，重构摩擦色块与空间视觉的静默张力。',
  },
  'wilderness-and-echo': {
    title: '《旷野与回声的切面》',
    englishTitle: 'Wilderness and the Section of Echoes, 2014',
    artist: '周砚',
    englishArtist: 'Zhou Yan',
    image: wildernessAndEcho,
    description: '灰白色地景在层层刮擦与覆盖中延伸，微弱的暖色如同远方回声，留存于沉寂旷野的断面之中。',
  },
  anonymous: {
    title: '《匿名者》',
    englishTitle: 'The Anonymous, 2014',
    artist: '李然',
    englishArtist: 'Li Ran',
    image: anonymous,
    description: '暮色中的城市明亮而辽阔，近景人物却隐去面目，以匿名的相聚映照现代都市中既亲近又疏离的关系。',
  },
}

const artworkId = window.location.hash.split('/').pop()
const artwork = computed(() => artworks[artworkId] || artworks['structure-and-gaze'])
</script>

<template>
  <div class="art-detail-page">
    <header>
      <div class="brand">
        <strong>UCCA CONTEMPORARY ART SPACE</strong>
        <span>2014 Contemporary<br>Painting Exhibition</span>
      </div>
    </header>

    <main>
      <nav aria-label="面包屑导航">
        <a href="#/art-display">← 返回展览首页</a>
        <i>·</i>
        <span>2014当代艺术展</span>
      </nav>

      <figure>
        <div class="picture-frame">
          <img :src="artwork.image" :alt="`${artwork.artist}作品${artwork.title}`">
        </div>
        <figcaption>
          <h1>{{ artwork.title }}</h1>
          <em>{{ artwork.englishTitle }}</em>
          <strong>{{ artwork.artist }} <small>{{ artwork.englishArtist }}</small></strong>
          <p>{{ artwork.description }}</p>
        </figcaption>
      </figure>
    </main>

    <footer>UCCA CONTEMPORARY ART SPACE · 2014</footer>
  </div>
</template>

<style scoped>
.art-detail-page {
  min-height: 100vh;
  border-top: 5px solid #050505;
  background: #f8f8f8;
  color: #252525;
  font-family: Arial, "Microsoft YaHei", sans-serif;
}

header {
  height: 66px;
  border-bottom: 1px solid #e7e7e7;
  background: #fff;
}

.brand {
  width: min(100% - 56px, 910px);
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.brand strong {
  font-size: 10px;
  letter-spacing: 1.2px;
}

.brand span {
  margin-top: 5px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 16px;
  line-height: 1.25;
}

main {
  width: min(100% - 40px, 710px);
  margin: 0 auto;
  padding-top: 52px;
}

nav {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 32px;
  color: #777;
  font-size: 10px;
  letter-spacing: 0.5px;
}

nav a {
  color: inherit;
  text-decoration: none;
  transition: color 180ms ease;
}

nav a:hover {
  color: #111;
}

nav i {
  font-style: normal;
}

figure {
  margin: 0;
}

.picture-frame {
  padding: 13px;
  background: #fff;
}

.picture-frame img {
  width: 100%;
  display: block;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

figcaption {
  padding: 48px 20px 0;
  text-align: center;
}

figcaption h1 {
  margin: 0;
  font-family: "SimSun", serif;
  font-size: 31px;
  font-weight: 400;
}

figcaption em {
  display: block;
  margin-top: 11px;
  color: #777;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 16px;
}

figcaption strong {
  display: block;
  margin-top: 12px;
  font-family: "SimSun", serif;
  font-size: 13px;
}

figcaption small {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 12px;
  font-weight: 400;
}

figcaption p {
  margin: 18px auto 0;
  color: #777;
  font-family: "SimSun", serif;
  font-size: 12px;
  line-height: 1.8;
}

footer {
  padding: 53px 20px 50px;
  color: #888;
  font-size: 8px;
  letter-spacing: 1.2px;
  text-align: center;
}

@media (max-width: 640px) {
  header {
    height: 62px;
  }

  .brand {
    width: calc(100% - 32px);
  }

  main {
    width: calc(100% - 28px);
    padding-top: 36px;
  }

  figcaption {
    padding-top: 34px;
  }

  figcaption h1 {
    font-size: 26px;
  }
}
</style>
