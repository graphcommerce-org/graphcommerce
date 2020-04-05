import { GQLLocale } from '../../generated/graphql'

const parentUrls = (url: string, locale: GQLLocale): string[] => {
  let urlParts: string[] = url.split('/').slice(1, -1)
  const parents = []
  while (urlParts.length) {
    parents.push(`/${urlParts.join('/')}`)
    urlParts = urlParts.slice(0, -1)
  }
  if (locale === GQLLocale.Nl && url !== '/') parents.push('/')
  return parents.reverse()
}

export default parentUrls
