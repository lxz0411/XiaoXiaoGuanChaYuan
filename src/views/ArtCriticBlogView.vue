<script setup>
import blog from '../data/artCriticBlog.json'
import anonymousArtwork from '../../素材/画展页/匿名者.png'

function jumpTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div class="critic-blog-page">
    <div class="critic-utility"><div class="critic-width"><span>艺文博客　/　文化艺术</span><span>文化推荐博客</span></div></div>
    <header class="critic-masthead">
      <div class="critic-width">
        <div><p class="blog-title">{{ blog.blogName }}</p><p class="blog-tagline">{{ blog.tagline }}</p></div>
        <div class="masthead-note"><span>ART &amp; CRITICISM</span><p>作品札记　·　展览观察</p></div>
      </div>
    </header>
    <nav class="critic-navigation" aria-label="博客导航"><div class="critic-width"><button type="button" @click="jumpTo('critic-article')">博文正文</button><button type="button" @click="jumpTo('critic-comments')">读者留言（{{ blog.comments.length }}）</button></div></nav>

    <main class="critic-width critic-layout">
      <aside class="critic-sidebar">
        <section class="critic-panel author-profile">
          <h2>关于博主</h2>
          <strong class="profile-name">{{ blog.blogName }}</strong>
          <span class="profile-badge">文化艺术 · 推荐博主</span>
          <p>{{ blog.profile }}</p>
          <div class="profile-visits"><span>博客访问</span><strong>1,286,430</strong></div>
        </section>
        <section class="critic-panel reading-guide">
          <h2>本篇导读</h2>
          <button type="button" @click="jumpTo('critic-article')">《匿名者》评论</button>
          <button type="button" @click="jumpTo('critic-artwork')">作品配图</button>
          <button type="button" @click="jumpTo('critic-comments')">留言（{{ blog.comments.length }}）</button>
        </section>
        <section class="critic-panel sidebar-note"><h2>博主的话</h2><p>做作品要有勇气，听批评也一样。</p></section>
      </aside>

      <div class="critic-content">
        <article id="critic-article" class="critic-panel critic-article">
          <div class="article-kicker">{{ blog.category }}<span>ART NOTES</span></div>
          <header class="critic-article-header">
            <h1>{{ blog.title }}</h1>
            <div class="critic-article-meta"><time :datetime="blog.date">{{ blog.date.replace('T', ' ') }}</time><span>{{ blog.blogName }}</span><span>阅读 26,418</span><button type="button" @click="jumpTo('critic-comments')">评论 {{ blog.comments.length }}</button></div>
          </header>
          <div class="critic-article-body"><p>{{ blog.intro }}</p></div>
          <figure id="critic-artwork" class="critic-artwork">
            <img :src="anonymousArtwork" alt="李然作品《匿名者》：暮色中的城市与露台上面目模糊的人物">
            <figcaption><span>李然《匿名者》　作品资料图</span><a href="#/art-display/anonymous" target="_blank" rel="noopener noreferrer">查看作品资料</a></figcaption>
          </figure>
          <div class="critic-article-body"><p v-for="(paragraph, index) in blog.paragraphs" :key="index">{{ paragraph }}</p></div>
          <div class="critic-tags"><span>标签：</span><span v-for="tag in blog.tags" :key="tag">{{ tag }}</span></div>
          <div class="article-signature"><span>发表于 {{ blog.date.slice(0, 10) }}</span><span>{{ blog.blogName }}　｜　{{ blog.category }}</span></div>
        </article>

        <section id="critic-comments" class="critic-panel critic-comments" aria-labelledby="critic-comments-title">
          <div class="comments-heading"><h2 id="critic-comments-title">留言与评论 <span>（{{ blog.comments.length }}）</span></h2><span>按时间顺序</span></div>
          <ol class="critic-comment-list">
            <li v-for="(comment, index) in blog.comments" :key="`${comment.author}-${comment.date}`" class="critic-comment">
              <header><strong>{{ comment.author }}</strong><span>{{ index + 1 }}楼</span></header>
              <p>{{ comment.text }}</p>
              <time :datetime="comment.date">{{ comment.date.replace('T', ' ') }}</time>
            </li>
          </ol>
        </section>
      </div>
    </main>
    <footer class="critic-footer"><strong>{{ blog.blogName }}</strong><span>个人文章与评论存档 · 2014</span></footer>
  </div>
</template>

<style scoped>
.critic-blog-page { min-height: 100vh; background: #efede8; color: #383430; font: 14px/1.8 Arial, "Microsoft YaHei", sans-serif; }
.critic-width { width: min(1060px, calc(100% - 40px)); margin: 0 auto; }
.critic-blog-page button { border: 0; background: none; color: inherit; font: inherit; cursor: pointer; }
.critic-blog-page button:focus-visible, .critic-blog-page a:focus-visible { outline: 2px solid #87443d; outline-offset: 4px; }
.critic-utility { border-bottom: 1px solid #e0dcd4; background: #f8f7f4; color: #8d837a; font-size: 11px; }
.critic-utility > div { display: flex; justify-content: space-between; gap: 15px; padding-top: 5px; padding-bottom: 5px; }
.critic-masthead { border-top: 4px solid #703f39; background: #faf8f2; }
.critic-masthead > div { display: flex; align-items: center; justify-content: space-between; gap: 25px; min-height: 144px; }
.blog-title { margin: 0; color: #5e302c; font: 44px/1.4 "STKaiti", "KaiTi", serif; letter-spacing: 8px; }
.blog-tagline { margin: 4px 0 0; color: #9b897b; font: 13px/1.8 SimSun, serif; letter-spacing: 3px; }
.masthead-note { color: #9b897b; text-align: right; }
.masthead-note > span { font: 11px Georgia, serif; letter-spacing: 3px; }
.masthead-note p { margin: 7px 0 0; font-size: 11px; letter-spacing: 2px; }
.critic-navigation { background: #703f39; color: #f6eeea; }
.critic-navigation > div { display: flex; gap: 8px; }
.critic-navigation button { padding: 10px 22px; font-size: 12px; }
.critic-navigation button:hover { background: #62342f; }
.critic-navigation button:focus-visible { outline-color: #fff; outline-offset: -4px; }
.critic-layout { display: grid; grid-template-columns: 216px minmax(0, 1fr); gap: 22px; padding-top: 25px; padding-bottom: 45px; align-items: start; }
.critic-sidebar, .critic-content { min-width: 0; }
.critic-panel { margin-bottom: 18px; border: 1px solid #ddd6cc; background: #fffefa; }
.critic-sidebar section { padding: 17px; }
.critic-sidebar h2 { margin: 0 0 16px; padding-bottom: 9px; border-bottom: 1px solid #e9e2d9; color: #80645a; font-size: 12px; font-weight: 400; }
.profile-name { display: block; color: #653a34; font: 25px "STKaiti", "KaiTi", serif; letter-spacing: 2px; }
.profile-badge { display: inline-block; margin-top: 13px; padding: 2px 7px; border: 1px solid #d7c4a5; background: #f8f0df; color: #9c7234; font-size: 10px; }
.author-profile > p { margin: 16px 0; color: #8d8074; font-size: 12px; line-height: 1.9; }
.profile-visits { border-top: 1px dotted #ddd1c4; padding-top: 12px; color: #a1978d; font-size: 10px; }
.profile-visits strong { display: block; margin-top: 4px; color: #7f6558; font: 17px Georgia, serif; }
.reading-guide button { display: block; padding: 5px 0; color: #836457; font-size: 12px; text-align: left; }
.reading-guide button:hover { text-decoration: underline; }
.sidebar-note p { margin: 0; color: #9d8a78; font: 13px/1.9 SimSun, serif; }
.critic-article { padding: 26px 32px 22px; }
.article-kicker { display: flex; align-items: center; gap: 13px; color: #986d60; font-size: 11px; }
.article-kicker span { padding-left: 12px; border-left: 1px solid #d9cfc4; color: #b1a399; font: 9px Georgia, serif; letter-spacing: 1.5px; }
.critic-article-header { margin: 13px 0 25px; padding-bottom: 21px; border-bottom: 1px solid #e9e1d7; }
.critic-article-header h1 { margin: 0 0 15px; color: #4d322d; font: 600 26px/1.65 "Noto Serif SC", "Songti SC", SimSun, serif; overflow-wrap: anywhere; }
.critic-article-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 5px 16px; color: #a3968a; font-size: 11px; }
.critic-article-meta button { padding: 0; font-size: inherit; color: #8e6558; }
.critic-article-meta button:hover { text-decoration: underline; }
.critic-article-body { color: #514a43; font-size: 15px; line-height: 2.15; }
.critic-article-body p { margin: 0 0 1.4em; text-align: justify; overflow-wrap: anywhere; }
.critic-artwork { margin: 25px 0 29px; padding: 9px; border: 1px solid #e2d9cd; background: #f5f1e9; }
.critic-artwork img { display: block; width: 100%; height: auto; }
.critic-artwork figcaption { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 5px 14px; padding: 9px 2px 1px; color: #a09180; font-size: 10px; }
.critic-artwork a { color: #8e6558; text-decoration: none; }
.critic-artwork a:hover { text-decoration: underline; }
.critic-tags { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin-top: 30px; color: #9f8b79; font-size: 11px; }
.critic-tags > span:not(:first-child) { padding: 1px 7px; border: 1px solid #e0d3c5; background: #f6f1e9; color: #997362; }
.article-signature { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 6px 15px; margin-top: 22px; padding-top: 15px; border-top: 1px dotted #ddd1c4; color: #b1a092; font-size: 10px; }
#critic-article, #critic-artwork, #critic-comments { scroll-margin-top: 22px; }
.comments-heading { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 14px 25px; border-bottom: 1px solid #e5dcd0; background: #f9f5ed; }
.comments-heading h2 { margin: 0; color: #795346; font: 18px/1.5 SimSun, serif; }
.comments-heading h2 span { font: 12px Arial, sans-serif; }
.comments-heading > span { color: #af9e8c; font-size: 10px; white-space: nowrap; }
.critic-comment-list { margin: 0; padding: 0 27px; list-style: none; }
.critic-comment { padding: 22px 0; }
.critic-comment + .critic-comment { border-top: 1px dotted #e2d8cd; }
.critic-comment header { display: flex; align-items: center; justify-content: space-between; gap: 15px; }
.critic-comment header strong { color: #8c6152; font-size: 12px; font-weight: 500; }
.critic-comment header > span { color: #b8a99b; font-size: 10px; }
.critic-comment p { margin: 9px 0; color: #75695d; font-size: 13px; line-height: 1.95; overflow-wrap: anywhere; }
.critic-comment time { color: #b8aa9b; font-size: 10px; }
.critic-footer { display: flex; justify-content: center; align-items: center; gap: 18px; padding: 25px 20px 35px; border-top: 1px solid #ddd2c5; color: #b1a18f; font-size: 10px; }
.critic-footer strong { color: #967966; font: 17px "KaiTi", serif; }
@media (max-width: 760px) {
  .critic-width { width: calc(100% - 24px); }
  .critic-masthead > div { min-height: 125px; }
  .blog-title { font-size: 36px; }
  .masthead-note { display: none; }
  .critic-layout { grid-template-columns: 1fr; gap: 0; padding-top: 18px; }
  .critic-sidebar { display: grid; grid-template-columns: minmax(0, 1fr) 120px; gap: 12px; }
  .critic-sidebar section { padding: 14px; }
  .profile-badge { font-size: 9px; }
  .profile-visits, .sidebar-note { display: none; }
  .author-profile > p { margin-bottom: 0; }
  .critic-article { padding: 22px 19px; }
  .critic-article-header h1 { font-size: 23px; }
  .critic-artwork { margin-left: -4px; margin-right: -4px; padding: 5px; }
  .critic-article-body { font-size: 15px; line-height: 2.05; }
  .critic-comment-list { padding: 0 20px; }
  .comments-heading { padding: 14px 18px; }
}
@media (max-width: 360px) {
  .critic-sidebar { grid-template-columns: 1fr; }
  .reading-guide { display: none; }
}
</style>
