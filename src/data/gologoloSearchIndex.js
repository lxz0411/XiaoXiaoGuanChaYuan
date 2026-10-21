import artCriticBlog from './artCriticBlog.json'

const searchEntries = [
  {
    keywords: ['澄江市儿童医院'],
    results: [
      {
        title: '澄江市儿童医院信息管理系统',
        description: '澄江市儿童医院院内医疗信息系统入口。',
        href: '#/hospital',
      },
    ],
  },
  {
    keywords: ['澄江实验小学'],
    results: [
      {
        title: '澄江实验小学官方网站',
        description: '澄江实验小学学校概况、校园快讯、通知公告与家校服务。',
        href: '#/school',
      },
    ],
  },
  {
    keywords: ['陈晓雨'],
    results: [
      {
        title: '第三届少儿钢琴大赛圆满结束',
        description: '澄江市第三届少儿钢琴大赛落幕。',
        href: '#/news/piano-competition',
      },
    ],
  },
  {
    keywords: ['周子昂', '李然'],
    results: [
      {
        title: '2011年澄江市少儿绘画奖揭晓',
        description: '全市少年儿童用画笔描绘美丽家园，周子昂等学生在比赛中获奖。',
        href: '#/news/children-painting-award-2011',
      },
    ],
  },
  {
    keywords: ['李然'],
    results: [
      {
        title: '无界之象 · 2014当代绘画艺术展',
        description: 'UCCA当代艺术空间2014年度当代绘画艺术展览信息与参展画作精选。',
        href: '#/art-display',
      },
    ],
  },
  {
    keywords: ['李然', '青年艺术家李然', '李然离世'],
    results: [
      {
        title: '青年艺术家李然于家中离世 曾因作品“匿名者”引发争议',
        description: '澄江市青年艺术家李然于家中离世，生前作品及创作理念曾在艺术界引发讨论。',
        href: '#/news/li-ran-death',
      },
    ],
  },
  {
    keywords: ['小小观察员'],
    results: [
      {
        title: '澄江少儿频道',
        description: '少儿节目直播、热门动画点播及全国少儿才艺作品展示平台。',
        href: '#/youth-channel',
      },
    ],
  },
  {
    keywords: ['陈晖', '小小观察员'],
    results: [
      {
        title: '陈晖的博客',
        description: '陈晖的个人博客页面。',
        href: '#/blog',
      },
      {
        title: '让孩子重新发现世界——专访儿童教育栏目“小小观察员”制片人陈晖',
        description: '《小小观察员》制片人陈晖谈儿童的好奇心、观察能力与节目未来计划。',
        href: '#/news/chen-hui-interview',
      },
    ],
  },
  {
    keywords: ['李然', '匿名者', '《匿名者》', '观画录', '艺术评论', '艺术评论家'],
    results: [
      {
        title: `${artCriticBlog.title} - ${artCriticBlog.blogName}`,
        description: `艺术评论博客“${artCriticBlog.blogName}”对李然《匿名者》的评论及读者留言。`,
        href: '#/art-critic-blog',
      },
    ],
  },
]

export function getGologoloSearchResults(query) {
  const normalizedQuery = query.trim()
  if (!normalizedQuery) return []

  return searchEntries
    .filter(({ keywords }) => keywords.includes(normalizedQuery))
    .flatMap(({ results }) => results)
}
