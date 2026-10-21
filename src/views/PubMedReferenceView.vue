<script setup>
import { computed, ref } from 'vue'
import ReferenceTranslationBar from '../components/ReferenceTranslationBar.vue'
import references from '../data/blogReferences.json'

const translated = ref(false)
const language = computed(() => translated.value ? 'zh' : 'en')
const paper = references.pubmed
const labels = computed(() => translated.value ? {
  type: '病例报告', abstract: '摘要', affiliation: '作者单位', navigation: '本页导航', citation: '文献记录', terms: '主题词', footer: '美国国家医学图书馆', back: '返回陈晖的博文',
} : {
  type: 'Case Reports', abstract: 'Abstract', affiliation: 'Affiliation', navigation: 'PAGE CONTENTS', citation: 'Citation', terms: 'MeSH terms', footer: 'National Library of Medicine', back: 'Back to Chen Hui’s post',
})

function jumpTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div class="pubmed-page">
    <header>
      <div class="institution-bar"><div class="pubmed-width"><strong>NCBI</strong><span class="institution-name">U.S. National Library of Medicine</span><span class="institution-name">National Institutes of Health</span><ReferenceTranslationBar :translated="translated" @select="translated = $event" /></div></div>
      <div class="search-header">
        <div class="pubmed-width search-inner">
          <div class="pubmed-logo">Pub<span>Med</span><sup>®</sup><small>gov</small></div>
          <div class="record-search"><span>PubMed</span><div>9860071</div><span class="record-label">MEDLINE</span></div>
        </div>
      </div>
      <div class="record-strip"><div class="pubmed-width">PubMed <span>›</span> PMID: 9860071</div></div>
    </header>

    <main class="pubmed-width">
      <div class="paper-layout">
        <article :lang="translated ? 'zh-CN' : 'en'">
          <div id="citation" class="paper-citation"><span>{{ labels.type }}</span><p><strong>Epilepsia.</strong> 1998 Dec;39(12):1340–4.</p></div>
          <h1>{{ paper.title[language] }}</h1>
          <p class="authors">{{ paper.authors }}</p>
          <details class="affiliation"><summary>{{ labels.affiliation }}</summary><p>{{ paper.affiliation[language] }}</p></details>
          <p class="record-identifiers"><span><strong>PMID:</strong> 9860071</span><span><strong>DOI:</strong> 10.1111/j.1528-1157.1998.tb01334.x</span></p>
          <section id="abstract" class="abstract">
            <h2>{{ labels.abstract }}</h2>
            <p class="summary-note">{{ translated ? '根据文献摘要整理 · 非官方译文' : 'Summary of the indexed abstract' }}</p>
            <p v-for="(section, index) in paper.sections" :key="index"><strong>{{ section.label[language] }}: </strong>{{ section.text[language] }}</p>
          </section>
          <section id="mesh" class="mesh">
            <h2>{{ labels.terms }}</h2>
            <p>{{ translated ? '青少年 / 光刺激的不良反应 / 电视 / 发作的诊断' : 'Adolescent / Photic stimulation, adverse effects / Television / Seizures, diagnosis' }}</p>
          </section>
        </article>
        <aside class="paper-sidebar">
          <h2>{{ labels.navigation }}</h2>
          <button type="button" @click="jumpTo('citation')">{{ labels.citation }}</button>
          <button type="button" @click="jumpTo('abstract')">{{ labels.abstract }}</button>
          <button type="button" @click="jumpTo('mesh')">{{ labels.terms }}</button>
          <div class="record-box"><strong>MEDLINE</strong><p>PMID: 9860071</p><p>Epilepsia · 1998</p></div>
        </aside>
      </div>
      <div class="source-footer"><span>pubmed.ncbi.nlm.nih.gov/9860071/</span><a href="#/blog?post=what-children-see-and-hear">← {{ labels.back }}</a></div>
    </main>
    <footer class="pubmed-footer"><div class="pubmed-width"><strong>{{ labels.footer }}</strong><span>NCBI · NLM · NIH</span></div></footer>
  </div>
</template>

<style scoped>
.pubmed-page { min-height: 100vh; background: #fff; color: #222; font: 15px/1.65 Arial, "Microsoft YaHei", sans-serif; }
.pubmed-width { width: min(1120px, calc(100% - 48px)); margin: 0 auto; }
.institution-bar { background: #315778; color: #fff; font-size: 12px; }
.institution-bar > div { display: flex; align-items: center; gap: 24px; min-height: 35px; }
.institution-bar strong { font-size: 18px; letter-spacing: 1px; }
.search-header { border-bottom: 1px solid #b6c7d2; background: linear-gradient(#f3f6f8, #dce5ec); }
.search-inner { display: flex; align-items: center; gap: 55px; min-height: 114px; }
.pubmed-logo { color: #234f75; font: 700 41px Georgia, serif; white-space: nowrap; }
.pubmed-logo > span { padding: 5px 2px; background: #315d80; color: #fff; border-radius: 2px 10px 0 0; }
.pubmed-logo sup { position: relative; top: -13px; font: 11px Arial, sans-serif; }
.pubmed-logo small { margin-left: 3px; color: #71808a; font: 17px Arial, sans-serif; }
.record-search { display: flex; align-items: stretch; width: 680px; min-width: 0; font-size: 14px; }
.record-search > span { padding: 7px 14px; border: 1px solid #a4b5c2; background: #f7f8f9; }
.record-search > div { flex: 1; padding: 7px 14px; border-top: 1px solid #a4b5c2; border-bottom: 1px solid #a4b5c2; background: #fff; color: #444; }
.record-search .record-label { background: #426887; color: #fff; font-size: 12px; }
.record-strip { padding: 9px 0; border-bottom: 1px solid #dce2e7; background: #fafbfc; color: #5e707e; font-size: 12px; }
.record-strip span { margin: 0 12px; color: #99a7b1; }
main { padding-top: 26px; padding-bottom: 32px; }
.paper-layout { display: grid; grid-template-columns: minmax(0, 1fr) 220px; gap: 64px; }
article { min-width: 0; }
.paper-citation > span { color: #5f6c75; font-size: 12px; }
.paper-citation p { margin: 3px 0 12px; color: #436986; font-size: 14px; }
h1 { margin: 0 0 18px; color: #222; font-size: 27px; line-height: 1.35; font-weight: 600; }
.authors { margin: 0 0 10px; color: #22618a; font-size: 15px; }
.affiliation { margin-bottom: 16px; font-size: 13px; color: #5b6770; }
.affiliation summary { width: fit-content; color: #22618a; cursor: pointer; }
.affiliation p { margin: 6px 0; }
.record-identifiers { display: flex; flex-wrap: wrap; gap: 6px 24px; margin: 15px 0 28px; font-size: 13px; overflow-wrap: anywhere; }
.abstract h2, .mesh h2 { margin: 28px 0 10px; font-size: 22px; font-weight: 500; }
.abstract, .mesh, .paper-citation { scroll-margin-top: 24px; }
.abstract p { margin: 0 0 18px; }
.abstract .summary-note { margin-bottom: 18px; color: #76828c; font-size: 12px; }
.abstract p > strong { font-size: 13px; }
.mesh { margin-top: 30px; padding-top: 2px; border-top: 1px solid #ddd; }
.mesh p { color: #22618a; font-size: 14px; }
.paper-sidebar { border-left: 1px solid #dce2e7; padding-left: 24px; }
.paper-sidebar h2 { margin: 0 0 14px; color: #596e7f; font-size: 12px; font-weight: 700; letter-spacing: 1px; }
.paper-sidebar button { display: block; width: 100%; padding: 8px 0; border: 0; background: none; color: #22618a; font: inherit; font-size: 14px; text-align: left; cursor: pointer; }
.paper-sidebar button:hover { text-decoration: underline; }
.record-box { margin-top: 25px; padding: 15px; border: 1px solid #d6e0e8; background: #f5f8fa; font-size: 12px; color: #617584; }
.record-box p { margin: 5px 0 0; }
.source-footer { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 15px; margin-top: 35px; padding-top: 18px; border-top: 1px solid #dce2e7; color: #78848c; font-size: 12px; overflow-wrap: anywhere; }
.source-footer a { color: #22618a; }
.pubmed-footer { padding: 25px 0; border-top: 1px solid #bbcbd8; background: #e6edf3; color: #496377; font-size: 13px; }
.pubmed-footer > div { display: flex; justify-content: space-between; gap: 15px; }
@media (max-width: 760px) {
  .pubmed-width { width: calc(100% - 32px); }
  .institution-bar .institution-name { display: none; }
  .search-inner { flex-wrap: wrap; gap: 12px; padding-top: 18px; padding-bottom: 18px; }
  .pubmed-logo { font-size: 34px; }
  .record-search { width: 100%; font-size: 12px; }
  .record-search > span { padding: 7px 10px; }
  .paper-layout { grid-template-columns: 1fr; gap: 30px; }
  .paper-sidebar { border-top: 1px solid #dce2e7; border-left: 0; padding: 20px 0 0; }
  .paper-sidebar button { display: inline-block; width: auto; margin-right: 25px; }
  .record-box { display: none; }
  h1 { font-size: 24px; }
  .pubmed-footer > div { flex-direction: column; }
}
</style>
