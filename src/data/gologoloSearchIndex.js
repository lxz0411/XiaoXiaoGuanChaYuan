const searchEntries = [
  {
    keywords: ['澄江市儿童医院', '儿童医院', '澄江儿童医院'],
    results: [
      {
        title: '澄江市儿童医院信息管理系统',
        description: '澄江市儿童医院院内医疗信息系统入口。',
        href: '#/hospital',
      },
    ],
  },
  {
    keywords: ['澄江实验小学', '澄江实小', '实验小学'],
    results: [
      {
        title: '澄江实验小学官方网站',
        description: '澄江实验小学学校概况、校园快讯、通知公告与家校服务。',
        href: '#/school',
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
