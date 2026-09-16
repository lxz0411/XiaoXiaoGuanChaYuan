<script setup>
import { computed } from 'vue'
import pianoCompetition from '../../素材/新闻页/少儿钢琴大赛.jpg'
import anonymousArtwork from '../../素材/画展页/匿名者.png'

const winners = [
  {
    award: '一等奖',
    people: [
      { name: '唐昊然', school: '澄江市育才小学', grade: '四年级' },
    ],
  },
  {
    award: '二等奖',
    people: [
      { name: '宋佳宁', school: '澄江市第二小学', grade: '四年级' },
      { name: '陈晓雨', school: '澄江实验小学', grade: '三年级' },
    ],
  },
  {
    award: '三等奖',
    people: [
      { name: '郑文博', school: '澄江市滨河小学', grade: '四年级' },
      { name: '何雨桐', school: '澄江市新城小学', grade: '四年级' },
      { name: '孙浩铭', school: '澄江市光明小学', grade: '三年级' },
    ],
  },
]

const articles = {
  'piano-competition': {
    issueDate: '2014年7月1日　星期二',
    category: '教育新闻',
    title: '第三届少儿钢琴大赛圆满结束',
    subtitle: '六名小选手分获一、二、三等奖',
    meta: '2014年7月1日 09:18　来源：澄江晚报　记者：顾文清',
    blocks: [
      {
        type: 'paragraph',
        text: '本报讯　6月29日下午，由澄江市文化馆、市青少年活动中心联合举办的第三届少儿钢琴大赛在市文化艺术中心圆满落下帷幕。来自全市各小学的四十余名选手参加比赛，现场演奏了多首中外经典钢琴作品。',
      },
      {
        type: 'image',
        src: pianoCompetition,
        alt: '第三届少儿钢琴大赛获奖选手合影',
        caption: '获奖选手在颁奖仪式上合影留念。',
      },
      {
        type: 'paragraph',
        text: '比赛分为初赛和决赛两个阶段。决赛中，小选手们沉着登台，以流畅的演奏和富有感染力的舞台表现赢得评委及观众的掌声。评审组从演奏技巧、作品完成度、音乐表现力和舞台仪态等方面进行综合评分，最终评出一等奖一名、二等奖两名、三等奖三名。',
      },
      { type: 'winners' },
      {
        type: 'paragraph',
        text: '主办方表示，少儿钢琴大赛旨在为全市少年儿童提供展示艺术才华、交流学习成果的平台，进一步丰富学生的课余文化生活。今后，我市还将继续开展形式多样的青少年艺术活动，为孩子们营造健康、积极的成长环境。',
      },
    ],
  },
  'li-ran-death': {
    issueDate: '2014年9月14日　星期日',
    category: '文化新闻',
    title: '青年艺术家李然于家中离世 曾因作品“匿名者”引发争议',
    subtitle: '',
    meta: '2014年9月14日 09:05　来源：澄江晚报　记者：赵敏',
    blocks: [
      {
        type: 'paragraph',
        text: '本报讯（记者 赵敏）近日，澄江市青年艺术家李然于家中轻生，年仅39岁。',
      },
      {
        type: 'image',
        src: anonymousArtwork,
        alt: '李然作品《匿名者》',
        caption: '李然生前作品《匿名者》。资料图片',
      },
      {
        type: 'paragraph',
        text: '李然生前长期从事绘画创作，其作品主要以城市、人群及日常生活为题材，画面中大量人物被刻意弱化面部特征，仅保留身体轮廓、动作以及所处环境。这一独特创作方式曾在艺术界引发讨论。',
      },
      {
        type: 'paragraph',
        text: '部分评论认为，李然的作品过度强调形式与概念，人物缺少明确身份和情感表达，削弱了传统绘画中对于人物形象的塑造。有评论指出，其作品“更像是一种思想表达，而不是完整的绘画叙事”。',
      },
      {
        type: 'paragraph',
        text: '也有艺术评论人士认为，李然试图通过去除人物面部特征，探讨现代城市环境下个体与身份之间的关系，其创作具有一定实验性。',
      },
      {
        type: 'paragraph',
        text: '据了解，李然早年曾展现出较强的绘画天赋，少年时期多次参加青少年艺术活动。成年后，由于坚持个人创作理念，其作品长期处于争议之中，长期的负面评价和拮据生活或许使他备受精神上的折磨。',
      },
      {
        type: 'paragraph',
        text: '据悉，李然部分作品目前由其家人和好友保存，相关公益纪念展览于近日筹备当中。',
      },
    ],
  },
  'chen-hui-interview': {
    issueDate: '2014年5月10日　星期六',
    category: '人物访谈',
    title: '让孩子重新发现世界——专访儿童教育栏目《小小观察员》制片人陈晖',
    subtitle: '',
    meta: '2014年5月10日 10:20　来源：澄江晚报　记者：赵敏',
    blocks: [
      {
        type: 'dialogue',
        speaker: '主持人',
        text: '陈老师，您好。近年来，《小小观察员》受到了很多孩子和家长的喜爱。很多家长认为，这个节目不像以往的节目直接教会孩子们知识，而是引导孩子自己发现答案。您为什么会想到制作这样一档节目？',
      },
      {
        type: 'dialogue',
        speaker: '陈晖',
        text: '其实最开始的时候，我只是发现了一件很简单的事情。很多成年人习惯于快速地认识一件事，或一个人。看到一棵树，我们会说“这是一棵树”；看到一片叶子，我们会说“这是一片叶子”，然后我们的观察就结束了。但在孩子们的世界里，定义往往是最不重要的。他们会继续观察，开动脑筋思考：“为什么树叶是绿色的？”“为什么这些树叶长得都不一样？”我觉得这种探索过程非常珍贵。',
      },
      {
        type: 'dialogue',
        speaker: '主持人',
        text: '所以《小小观察员》希望培养的是孩子们的好奇心？',
      },
      {
        type: 'dialogue',
        speaker: '陈晖',
        text: '不仅仅是好奇心。成年人的脑海中比孩子们多了许多成型概念，也因此少了许多思考的过程。我更希望孩子们学会一件事情：在没有仔细观察过之前，不要急着给一个东西下结论。世界比我们想象得复杂，很多时候，我们以为自己已经了解了一件事，其实只是看到了它的一部分。',
      },
      {
        type: 'dialogue',
        speaker: '主持人',
        text: '有人说，成年人的优势是拥有更多知识和经验，而孩子的优势是想象力。您怎么看？',
      },
      {
        type: 'dialogue',
        speaker: '陈晖',
        text: '我觉得成年人和孩子们看到的是两个不同的世界。成年人拥有经验，所以能够用已有的知识快速理解事物，这是成长过程中不可缺少的能力。但是经验有时也会限制我们，当我们习惯用已经成型的认识世界的模型来匹配所有事物时，就很少再去观察事物的细节和本质。孩子们面对一个陌生事物，不会也做不到马上判断，反而会先去观察和探索。我认为这是孩子所拥有的一种很珍贵的能力。',
      },
      {
        type: 'dialogue',
        speaker: '主持人',
        text: '说得真好。那未来《小小观察员》还有哪些计划？',
      },
      {
        type: 'dialogue',
        speaker: '陈晖',
        text: '我们希望能够走进更多学校，让更多的孩子亲身参与观察活动。《小小观察员》这个节目只是一个开始，我们希望能通过节目、线下活动等更多方式，让更多孩子在生活中保持观察世界的能力。',
      },
      {
        type: 'dialogue',
        speaker: '主持人',
        text: '谢谢陈老师。也希望《小小观察员》能够陪伴更多孩子成长。',
      },
    ],
  },
}

const articleId = window.location.hash.split('/').pop()
const article = computed(() => articles[articleId] || articles['piano-competition'])
</script>

<template>
  <div class="evening-news-page">
    <header class="newspaper-header">
      <div class="top-line">
        <span>澄江市重点新闻网站</span>
        <span>{{ article.issueDate }}</span>
      </div>
      <div class="masthead">
        <div>
          <h1>澄江晚报</h1>
          <p>CHENGJIANG EVENING NEWS</p>
        </div>
        <strong>关注民生　记录澄江</strong>
      </div>
      <nav>
        <button type="button">首页</button>
        <button type="button">澄江新闻</button>
        <button type="button">社会</button>
        <button type="button">教育</button>
        <button type="button">文化</button>
        <button type="button">生活</button>
      </nav>
    </header>

    <main>
      <div class="breadcrumb">当前位置：澄江晚报 &gt; {{ article.category }} &gt; 正文</div>

      <article>
        <h2>{{ article.title }}</h2>
        <p v-if="article.subtitle" class="subtitle">{{ article.subtitle }}</p>
        <div class="article-meta">{{ article.meta }}</div>

        <div class="article-body">
          <template v-for="(block, index) in article.blocks" :key="index">
            <p v-if="block.type === 'paragraph'">{{ block.text }}</p>

            <p v-else-if="block.type === 'dialogue'" class="interview-line">
              <strong>{{ block.speaker }}：</strong>{{ block.text }}
            </p>

            <figure v-else-if="block.type === 'image'">
              <img :src="block.src" :alt="block.alt">
              <figcaption>{{ block.caption }}</figcaption>
            </figure>

            <section v-else-if="block.type === 'winners'" class="winner-list">
              <h3>获奖名单</h3>
              <div v-for="group in winners" :key="group.award" class="award-group">
                <h4>{{ group.award }}</h4>
                <p v-for="person in group.people" :key="person.name">
                  <strong>{{ person.name }}</strong>
                  <span>{{ person.school }}　{{ person.grade }}</span>
                </p>
              </div>
            </section>
          </template>
        </div>
      </article>
    </main>

    <footer>
      澄江晚报社版权所有　未经许可不得转载
    </footer>
  </div>
</template>

<style scoped>
.evening-news-page {
  min-height: 100vh;
  background: #f4f1ea;
  color: #282828;
  font-family: "SimSun", "宋体", serif;
}

.newspaper-header,
main,
footer {
  width: min(100% - 32px, 1000px);
  margin: 0 auto;
}

.top-line {
  display: flex;
  justify-content: space-between;
  padding: 8px 4px;
  border-bottom: 1px solid #b9b3a8;
  color: #666;
  font-size: 13px;
}

.masthead {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 8px 16px;
}

.masthead h1 {
  margin: 0;
  color: #9d1f18;
  font: 700 52px/1 "STKaiti", "KaiTi", serif;
  letter-spacing: 8px;
}

.masthead p {
  margin: 6px 0 0 3px;
  color: #777;
  font: 11px/1 Arial, sans-serif;
  letter-spacing: 4px;
}

.masthead strong {
  color: #555;
  font-size: 15px;
  letter-spacing: 4px;
}

nav {
  display: flex;
  justify-content: center;
  border-top: 4px solid #9d1f18;
  border-bottom: 1px solid #9d1f18;
  background: #fff;
}

nav button {
  padding: 11px 30px;
  border: 0;
  background: transparent;
  color: #333;
  font: 16px "Microsoft YaHei", sans-serif;
  pointer-events: none;
}

main {
  padding-bottom: 48px;
  background: #fff;
}

.breadcrumb {
  padding: 15px 24px;
  border-bottom: 1px solid #ddd;
  color: #777;
  font-size: 13px;
}

article {
  max-width: 760px;
  margin: 0 auto;
  padding: 38px 28px 20px;
}

article h2 {
  margin: 0;
  color: #222;
  font: 700 34px/1.35 "Microsoft YaHei", sans-serif;
  text-align: center;
}

.subtitle {
  margin: 10px 0 0;
  color: #777;
  font-size: 18px;
  text-align: center;
}

.article-meta {
  margin: 24px 0 30px;
  padding: 10px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  color: #888;
  font-size: 13px;
  text-align: center;
}

.article-body {
  font-size: 18px;
  line-height: 2;
}

.article-body > p {
  margin: 0 0 20px;
  text-indent: 2em;
}

.article-body > .interview-line {
  text-indent: 0;
}

.interview-line strong {
  color: #8f2e28;
  font-family: "Microsoft YaHei", sans-serif;
}

.article-body figure {
  margin: 24px 0 28px;
}

.article-body figure img {
  display: block;
  width: 100%;
  height: auto;
}

.article-body figcaption {
  margin-top: 7px;
  color: #777;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
}

.winner-list {
  margin: 28px 18px 32px;
  padding: 20px 34px;
  border-top: 2px solid #9d1f18;
  border-bottom: 1px solid #bbb;
  background: #faf9f6;
}

.winner-list h3 {
  margin: 0 0 16px;
  color: #9d1f18;
  font: 700 22px "Microsoft YaHei", sans-serif;
  text-align: center;
}

.award-group {
  display: grid;
  grid-template-columns: 92px 1fr;
  padding: 10px 0;
  border-top: 1px dotted #c8c3ba;
}

.award-group h4 {
  margin: 0;
  color: #8b312b;
  font-size: 17px;
}

.award-group p {
  grid-column: 2;
  display: flex;
  justify-content: space-between;
  gap: 18px;
  margin: 0 0 5px;
}

.award-group p:first-of-type {
  grid-row: 1;
}

.award-group span {
  color: #555;
}

footer {
  padding: 24px;
  border-top: 1px solid #bbb;
  color: #777;
  font-size: 13px;
  text-align: center;
}

@media (max-width: 700px) {
  .masthead {
    align-items: flex-start;
  }

  .masthead h1 {
    font-size: 40px;
  }

  .masthead strong {
    display: none;
  }

  nav {
    overflow-x: auto;
    justify-content: flex-start;
  }

  nav button {
    padding: 10px 18px;
    white-space: nowrap;
  }

  article {
    padding: 30px 18px 10px;
  }

  article h2 {
    font-size: 28px;
  }

  .winner-list {
    margin-right: 0;
    margin-left: 0;
    padding: 18px;
  }

  .award-group {
    grid-template-columns: 72px 1fr;
  }

  .award-group p {
    display: block;
  }

  .award-group span {
    display: block;
  }
}
</style>
