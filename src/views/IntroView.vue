<script setup>
import googleIcon from '../../素材/引入页/google.png'
import hospitalIcon from '../../素材/引入页/医院图标.png'
</script>

<template>
  <main class="intro-page">
    <section class="intro-card" aria-labelledby="case-title">
      <p class="intro-eyebrow">CASE FILE</p>
      <h1 id="case-title">儿童医院调查事件</h1>
      <div class="intro-rule" aria-hidden="true"></div>

      <p class="intro-description">
        你叫李雨晴，是澄江市儿童医院的一名儿童神经内科医生。近期，你发现院内收治了许多症状相似的患儿，在和同事聊天，以及网上查询的过程中，你发现这些相似的病例在全国范围内都开始大范围地出现。敏锐的你意识到，这也许并不是一个简单的病症。你决定着手对其进行调查。
      </p>

      <div class="intro-entrances" aria-label="调查入口">
        <a
          class="intro-entrance intro-entrance--hospital"
          href="#/hospital"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="在新标签页打开澄江市儿童医院信息管理系统"
        >
          <span class="entrance-icon entrance-icon--hospital" aria-hidden="true">
            <img :src="hospitalIcon" alt="">
          </span>
          <span>医院系统</span>
        </a>

        <a
          class="intro-entrance intro-entrance--search"
          href="#/gologolo"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="在新标签页打开 Gologolo 搜索引擎"
        >
          <span class="entrance-icon entrance-icon--search" aria-hidden="true">
            <img :src="googleIcon" alt="">
          </span>
          <span>Gologolo 搜索引擎</span>
        </a>
      </div>
    </section>
  </main>
</template>

<style scoped>
.intro-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  box-sizing: border-box;
  padding: 48px 24px;
  background:
    radial-gradient(circle at 50% 42%, rgba(255, 255, 255, 0.055), transparent 38%),
    #101010;
  color: #e9e9e9;
  font-family: "Microsoft YaHei", "PingFang SC", sans-serif;
}

.intro-card {
  width: min(760px, 100%);
  text-align: center;
}

.intro-eyebrow {
  margin: 0 0 18px;
  color: #777;
  font-size: 12px;
  letter-spacing: 0.42em;
}

h1 {
  margin: 0;
  color: #e9e9e9;
  font-family: "Noto Serif SC", "Songti SC", SimSun, serif;
  font-size: clamp(34px, 5vw, 58px);
  font-weight: 500;
  letter-spacing: 0.13em;
}

.intro-rule {
  width: 54px;
  height: 1px;
  margin: 30px auto;
  background: #777;
}

.intro-description {
  max-width: 680px;
  margin: 0 auto;
  color: #bdbdbd;
  font-size: clamp(16px, 1.7vw, 19px);
  line-height: 2;
  text-align: left;
  text-indent: 2em;
}

.intro-entrances {
  display: flex;
  justify-content: center;
  gap: clamp(36px, 8vw, 72px);
  margin-top: 42px;
}

.intro-entrance {
  display: grid;
  justify-items: center;
  gap: 12px;
  color: #a9a9a9;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.18s ease, transform 0.18s ease;
}

.intro-entrance:hover {
  color: #fff;
  transform: translateY(-3px);
}

.intro-entrance:active {
  transform: translateY(0) scale(0.96);
}

.intro-entrance:focus-visible {
  border-radius: 8px;
  outline: 2px solid #d8d8d8;
  outline-offset: 8px;
}

.entrance-icon {
  display: grid;
  place-items: center;
  width: 98px;
  height: 98px;
  box-sizing: border-box;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.35);
}

.entrance-icon img {
  display: block;
  width: 78px;
  height: 78px;
  object-fit: contain;
}

.entrance-icon--hospital img {
  width: 88px;
  height: 88px;
}

.entrance-icon--search img {
  width: 70px;
  height: 70px;
}

@media (max-width: 600px) {
  .intro-page {
    padding: 36px 22px;
  }

  .intro-description {
    line-height: 1.85;
  }

  .intro-entrances {
    gap: 34px;
    margin-top: 34px;
  }

  .entrance-icon {
    width: 84px;
    height: 84px;
  }

  .entrance-icon--hospital img {
    width: 76px;
    height: 76px;
  }

  .entrance-icon--search img {
    width: 60px;
    height: 60px;
  }
}
</style>
