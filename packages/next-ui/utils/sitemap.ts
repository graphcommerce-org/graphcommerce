import { GetServerSidePropsContext, GetStaticPathsResult } from 'next'
import { getServerSideSitemapLegacy, ISitemapField } from 'next-sitemap'
import { canonicalize } from '../PageMeta/PageMeta'

export function excludeSitemap(excludes: string[]) {
  const regexp = excludes.map((exclude) => new RegExp(exclude.replace(/\*/g, '.*?')))

  return (path: string) => !regexp.some((pattern) => pattern.test(`/${path}`))
}

export function staticPathsToString(
  path: GetStaticPathsResult<{ url: string[] | string }>['paths'][0],
) {
  if (typeof path === 'string') return path
  if (typeof path.params.url === 'string') return path.params.url
  return path.params.url.join('/')
}

export function toSitemapFields(
  context: GetServerSidePropsContext,
  paths: string[],
): ISitemapField[] {
  const lastmod = new Date().toISOString()
  const options = {
    locale: context.locale,
    defaultLocale: context.defaultLocale,
    pathname: '/',
    isLocaleDomain: false,
  }

  const sitemapPaths = paths.map<ISitemapField>((path) => ({
    loc: canonicalize(options, `/${path}`) ?? '',
    lastmod,
    changefreq: 'daily',
    priority: 0.7,
  }))

  return sitemapPaths
}

export function getServerSidePropsSitemap(
  context: GetServerSidePropsContext,
  paths: ISitemapField[],
) {
  context.res.setHeader('Cache-Control', `public, s-maxage=${60 * 60 * 2}`)
  return getServerSideSitemapLegacy(context, paths)
}
