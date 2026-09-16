<script setup>
import { computed, onMounted, ref } from 'vue'

const iconModules = import.meta.glob('../../素材/医院页/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
})

const activeMenu = ref('就诊记录')
const selectedIndex = ref(null)
const records = ref([])
const registrationTimes = ['08:12', '08:15', '08:21', '08:25', '08:31', '08:36']
const registrationStatuses = ['已就诊', '已就诊', '已就诊', '已就诊', '已就诊', '已就诊']

const selectedPatient = computed(() => {
  if (selectedIndex.value === null) return {}
  return records.value[selectedIndex.value] || {}
})

const icons = name => iconModules[`../../素材/医院页/${name}.png`] || ''

onMounted(async () => {
  const response = await fetch('/patients.json')
  records.value = await response.json()
})
</script>

<template>
  <div class="app">
    <header class="topbar">
      <div class="brand">
        <div class="logo"><img :src="icons('医院图标')" alt="医院图标"></div>
        <div>
          <h1>澄江市儿童医院信息管理系统</h1>
          <span>Hospital Information System</span>
        </div>
      </div>
      <div class="meta">当前用户：林雨晴　　科室：儿童神经内科　　日期：2014-09-15</div>
      <!-- <nav>
        <img :src="icons('密码')" alt="">修改密码　
        <img :src="icons('帮助')" alt="">帮助　
        <img :src="icons('关于')" alt="">关于　
        <img :src="icons('退出')" alt="">退出系统
      </nav> -->
    </header>

    <aside class="sidebar">
      <h3>系统菜单</h3>
      <section v-for="(items, group) in { 门诊管理: ['今日挂号', '待诊患者', '就诊记录', '诊断录入'], 住院管理: ['在院患者', '病程记录', '出院记录'], 电子病历: ['门诊病历', '检验报告', '医学影像', '检查申请'], 统计查询: ['科室病例统计', '疾病分类统计'], 公共功能: ['通知公告', '院内邮件', '文件共享'] }" :key="group">
        <strong>
          <img :src="icons(group === '住院管理' ? '住院系统' : group)" alt="">
          {{ group }}
        </strong>
        <button v-for="item in items" :key="item" :class="{ active: activeMenu === item }">{{ item }}</button>
      </section>
    </aside>

    <main>
      <div class="tab">门诊患者列表</div>
      <div class="toolbar">
        日期：<input value="2014-09-15">
       　科室：<select><option>儿童神经内科</option></select>
       　医生：<select><option>林雨晴</option></select>
        <button>查询</button>
        <span class="actions">
          <button v-for="name in ['保存', '打印', '刷新', '退出']" :key="name"><img :src="icons(name)" alt="">{{ name }}</button>
        </span>
      </div>

      <table>
        <thead><tr><th>序号</th><th>姓名</th><th>性别</th><th>年龄</th><th>挂号时间</th><th>状态</th></tr></thead>
        <tbody>
          <tr v-for="(patient, index) in records" :key="patient.name" :class="{ selected: index === selectedIndex }" @click="selectedIndex = index">
            <td>{{ String(patient.id).padStart(3, '0') }}</td><td>{{ patient.name }}</td><td>{{ patient.sex }}</td><td>{{ patient.age }}岁</td><td>{{ registrationTimes[index] }}</td><td>{{ registrationStatuses[index] }}</td>
          </tr>
        </tbody>
      </table>

      <div class="panel">
        <h2>患者信息</h2>
        <div class="fields patient-fields">
          <label class="form-label">患者姓名：<input class="form-control" :value="selectedPatient.name || ''"></label>
          <label class="form-label">性别：<input class="form-control" :value="selectedPatient.sex || ''"></label>
          <label class="form-label">年龄：<input class="form-control" :value="selectedPatient.age ? `${selectedPatient.age}岁` : ''"></label>
        </div>
        <label class="form-label">主　诉：<input class="wide form-control" :value="selectedPatient.complaint || ''"></label>
        <label class="form-label">现病史：<input class="wide form-control history-control" :value="selectedPatient.history || ''"></label>
        <label class="form-label">家属补充：<input class="wide form-control" :value="selectedPatient.family || ''"></label>
        <label class="form-label">检查结果：<input class="wide form-control" :value="selectedPatient.result || ''"></label>
        <label class="form-label">初步诊断：<input class="wide form-control" :value="selectedPatient.diagnosis || ''"></label>
      </div>
      <div class="bottom"><button>新增病历</button><button>编辑</button><button>查看历史</button></div>
    </main>

    <footer>澄江市儿童医院　　版权所有　2010-2014　　建议使用 IE8.0 及以上版本</footer>
  </div>
</template>
