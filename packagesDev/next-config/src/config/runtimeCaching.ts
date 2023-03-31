import cache from 'next-pwa/cache'

export const runtimeCaching = cache.map((rule) => {
  if (rule.options?.cacheName === 'next-data') {
    rule.handler = 'NetworkFirst'
  }

  return rule
})
