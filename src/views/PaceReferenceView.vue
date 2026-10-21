<script setup>
import { computed, ref } from 'vue'
import ReferenceTranslationBar from '../components/ReferenceTranslationBar.vue'
import references from '../data/blogReferences.json'

const translated = ref(false)
const language = computed(() => translated.value ? 'zh' : 'en')
const recommendation = references.pace
const labels = computed(() => translated.value ? {
  institution: '欧洲委员会议会大会', council: '欧洲委员会', home: '首页', work: '大会工作', documents: '文件', texts: '已通过文件', heading: '建议第1930号（2010年）', status: '已通过文本', author: '作者', assembly: '议会大会', origin: '通过信息', adoption: '2010年6月25日 · 第27次会议通过', contents: '文件内容', summary: '文件要点', note: '按相关段落整理，编号对应原文件段落，非完整文本。', reference: '相关文件', report: '文化、科学与教育委员会报告', opinion: '社会、健康与家庭事务委员会意见', back: '返回陈晖的博文',
} : {
  institution: 'Parliamentary Assembly', council: 'Council of Europe', home: 'Home', work: 'Work', documents: 'Documents', texts: 'Adopted texts', heading: 'Recommendation 1930 (2010)', status: 'Adopted text', author: 'Author', assembly: 'Parliamentary Assembly', origin: 'Adoption', adoption: '25 June 2010 · 27th Sitting', contents: 'IN THIS DOCUMENT', summary: 'Document summary', note: 'Condensed reading notes; numbers refer to source paragraphs. Not the full text.', reference: 'Related documents', report: 'Committee on Culture, Science and Education report', opinion: 'Social, Health and Family Affairs Committee opinion', back: 'Back to Chen Hui’s post',
})

function jumpTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div class="pace-page">
    <header class="pace-header">
      <div class="pace-top"><div class="pace-width"><span>{{ labels.council }}</span><ReferenceTranslationBar :translated="translated" @select="translated = $event" /></div></div>
      <div class="pace-width pace-masthead">
        <div class="europe-mark" aria-hidden="true"><span v-for="index in 12" :key="index" :style="{ '--angle': `${index * 30}deg` }">★</span><b>e</b></div>
        <div class="assembly-brand"><strong>{{ labels.institution }}</strong><span>{{ labels.council }}</span></div>
        <span class="pace-wordmark">PACE</span>
      </div>
      <div class="pace-nav"><div class="pace-width"><span>{{ labels.home }}</span><span>{{ labels.work }}</span><strong>{{ labels.documents }}</strong><span>{{ labels.texts }}</span></div></div>
    </header>

    <main class="pace-width">
      <div class="pace-breadcrumb">{{ labels.home }} <span>›</span> {{ labels.documents }} <span>›</span> {{ labels.texts }}</div>
      <div class="document-layout">
        <article :lang="translated ? 'zh-CN' : 'en'">
          <div class="document-type"><span>{{ labels.status }}</span><strong>{{ labels.heading }}</strong></div>
          <h1>{{ recommendation.title[language] }}</h1>
          <dl id="document-info" class="document-info"><div><dt>{{ labels.author }}</dt><dd>{{ labels.assembly }}</dd></div><div><dt>{{ labels.origin }}</dt><dd>{{ labels.adoption }}</dd></div></dl>
          <section id="document-text" class="document-text">
            <h2>{{ labels.summary }}</h2>
            <p class="document-note">{{ labels.note }}{{ translated ? ' 中文为非官方译文。' : '' }}</p>
            <div v-for="(section, index) in recommendation.sections" :key="index" class="numbered-paragraph"><span>{{ section.number }}</span><p>{{ section.text[language] }}</p></div>
          </section>
          <section id="related-documents" class="related-documents"><h2>{{ labels.reference }}</h2><p><strong>Doc. 12186</strong><span>{{ labels.report }}</span></p><p><strong>Doc. 12261</strong><span>{{ labels.opinion }}</span></p></section>
        </article>
        <aside class="document-sidebar">
          <h2>{{ labels.contents }}</h2>
          <button type="button" @click="jumpTo('document-info')">{{ labels.origin }}</button>
          <button type="button" @click="jumpTo('document-text')">{{ labels.summary }}</button>
          <button type="button" @click="jumpTo('related-documents')">{{ labels.reference }}</button>
          <div class="document-register"><span>{{ translated ? '建议' : 'RECOMMENDATION' }}</span><strong>1930</strong><span>2010</span><hr><p>{{ labels.status }}</p><time datetime="2010-06-25">25 / 06 / 2010</time></div>
        </aside>
      </div>
      <div class="pace-source"><span>pace.coe.int/en/files/17891/html</span><a href="#/blog?post=what-children-see-and-hear">← {{ labels.back }}</a></div>
    </main>
    <footer class="pace-footer"><div class="pace-width"><strong>{{ labels.institution }}</strong><span>{{ labels.council }} · Strasbourg</span></div></footer>
  </div>
</template>

<style scoped>
.pace-page { min-height: 100vh; background: #fff; color: #303b47; font: 15px/1.8 Arial, "Microsoft YaHei", sans-serif; }
.pace-width { width: min(1160px, calc(100% - 48px)); margin: 0 auto; }
.pace-top { background: #eff2f4; color: #657382; font-size: 11px; letter-spacing: .4px; }
.pace-top > div { display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 35px; }
.pace-masthead { display: flex; align-items: center; gap: 22px; min-height: 126px; }
.europe-mark { position: relative; flex-shrink: 0; width: 85px; height: 71px; border-radius: 2px; background: #073e82; }
.europe-mark > span { position: absolute; left: calc(50% - 3px); top: calc(50% - 6px); color: #ffdc00; font-size: 8px; line-height: 12px; transform: rotate(var(--angle)) translateY(-24px) rotate(calc(-1 * var(--angle))); }
.europe-mark b { position: absolute; left: 25px; top: 10px; color: #fff; font: italic 49px Georgia, serif; }
.assembly-brand strong, .assembly-brand span { display: block; }
.assembly-brand strong { color: #174679; font-size: 27px; font-weight: 400; letter-spacing: -.6px; line-height: 1.35; }
.assembly-brand span { color: #718196; font-size: 13px; }
.pace-wordmark { margin-left: auto; color: #174679; font-size: 35px; font-weight: 700; letter-spacing: 3px; }
.pace-nav { border-bottom: 4px solid #d4a746; background: #174679; color: #fff; }
.pace-nav > div { display: flex; gap: 38px; align-items: center; min-height: 49px; font-size: 14px; }
.pace-nav strong { font-weight: 400; border-bottom: 2px solid #fff; }
.pace-breadcrumb { padding: 20px 0; color: #7a8793; font-size: 12px; }
.pace-breadcrumb span { padding: 0 10px; color: #a5afb8; }
.document-layout { display: grid; grid-template-columns: minmax(0, 1fr) 240px; gap: 70px; padding-top: 8px; }
article { min-width: 0; }
.document-type { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 20px; margin-bottom: 20px; color: #57708b; font-size: 13px; }
.document-type > span { padding: 3px 11px; border: 1px solid #a9bac9; }
.document-type > strong { font-weight: 400; }
h1 { margin: 0 0 28px; color: #174679; font-size: 33px; font-weight: 400; line-height: 1.35; }
.document-info { margin: 0 0 30px; padding: 18px 0; border-top: 1px solid #e1e6ea; border-bottom: 1px solid #e1e6ea; font-size: 13px; }
.document-info > div { display: grid; grid-template-columns: 100px minmax(0, 1fr); padding: 3px 0; }
.document-info dt { color: #738292; }
.document-info dd { margin: 0; color: #42576d; }
.document-text, .document-info, .related-documents { scroll-margin-top: 24px; }
.document-text h2, .related-documents h2 { margin: 0 0 10px; color: #174679; font-size: 20px; font-weight: 400; }
.document-note { margin: 0 0 24px; color: #81909e; font-size: 12px; }
.numbered-paragraph { display: grid; grid-template-columns: 48px minmax(0, 1fr); gap: 6px; margin: 0 0 23px; }
.numbered-paragraph > span { color: #174679; font-size: 13px; padding-top: 2px; }
.numbered-paragraph p { margin: 0; }
.related-documents { margin-top: 35px; padding: 24px 0 10px; border-top: 1px solid #e1e6ea; }
.related-documents p { display: flex; gap: 16px; margin: 12px 0; font-size: 13px; }
.related-documents strong { color: #174679; white-space: nowrap; font-weight: 400; }
.related-documents p span { color: #738292; }
.document-sidebar h2 { padding-bottom: 10px; border-bottom: 2px solid #174679; color: #174679; font-size: 12px; font-weight: 400; letter-spacing: 1px; }
.document-sidebar button { display: block; width: 100%; padding: 10px 0; border: 0; border-bottom: 1px solid #e4e9ee; background: none; color: #5f7489; font: inherit; font-size: 13px; text-align: left; cursor: pointer; }
.document-sidebar button:hover { color: #174679; text-decoration: underline; }
.document-register { margin-top: 30px; padding: 24px; background: #f1f4f7; color: #6c7d8f; text-align: center; font-size: 11px; }
.document-register > span, .document-register strong { display: block; }
.document-register > strong { color: #174679; font: 400 45px/1.4 Georgia, serif; }
.document-register hr { margin-top: 22px; border: 0; border-top: 1px solid #d1dbe3; }
.document-register p { margin-bottom: 2px; }
.pace-source { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 14px; margin: 28px 0 35px; padding-top: 20px; border-top: 1px solid #dce3e9; font-size: 12px; color: #81909e; overflow-wrap: anywhere; }
.pace-source a { color: #174679; }
.pace-footer { padding: 28px 0; background: #174679; color: #fff; font-size: 13px; }
.pace-footer > div { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 14px; }
.pace-footer strong { font-weight: 400; }
.pace-footer span { color: #bbcde0; }
@media (max-width: 760px) {
  .pace-width { width: calc(100% - 32px); }
  .pace-masthead { gap: 13px; min-height: 110px; }
  .assembly-brand strong { font-size: 22px; }
  .assembly-brand span { font-size: 12px; }
  .pace-wordmark { display: none; }
  .pace-nav > div { gap: 24px; flex-wrap: wrap; padding-top: 12px; padding-bottom: 12px; font-size: 12px; }
  .document-layout { grid-template-columns: 1fr; gap: 25px; }
  h1 { font-size: 27px; }
  .document-info > div { grid-template-columns: 75px minmax(0, 1fr); }
  .numbered-paragraph { grid-template-columns: 38px minmax(0, 1fr); }
  .document-register { display: none; }
  .document-sidebar { padding-top: 5px; }
  .document-sidebar button { display: inline-block; width: auto; margin-right: 20px; border-bottom: 0; }
}
</style>
