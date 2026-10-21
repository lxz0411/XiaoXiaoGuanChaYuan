<script setup>
defineProps({ translated: Boolean })
defineEmits(['select'])
</script>

<template>
  <nav class="language-switch" aria-label="Language / 语言">
    <button type="button" lang="en" :aria-pressed="!translated" @click="$emit('select', false)">English</button>
    <span aria-hidden="true">/</span>
    <button type="button" lang="zh-CN" :aria-pressed="translated" @click="$emit('select', true)">中文</button>
  </nav>
</template>

<style scoped>
.language-switch { display: flex; flex-shrink: 0; align-items: center; gap: 7px; margin-left: auto; color: inherit; font: 12px/1.5 Arial, "Microsoft YaHei", sans-serif; white-space: nowrap; }
.language-switch button { padding: 5px 0; border: 0; background: none; color: inherit; font: inherit; cursor: pointer; }
.language-switch span { opacity: .55; }
.language-switch button[aria-pressed="true"] { font-weight: 700; text-decoration: underline; text-underline-offset: 4px; }
.language-switch button:hover { text-decoration: underline; text-underline-offset: 4px; }
.language-switch button:focus-visible { outline: 2px solid currentColor; outline-offset: 3px; }
</style>
