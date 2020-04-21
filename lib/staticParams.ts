import { GetStaticProps as NextGetStaticProps } from 'next'

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never

export type StaticPageParams = { url: string | string[]; locale: GQLLocale }

export type StaticPageVariables = { url: string; locale: GQLLocale }
export type GQLGetStaticProps<T> = (variables: StaticPageVariables) => Promise<T>

const extractParams = (
  ctx: ArgumentTypes<NextGetStaticProps<{}, StaticPageParams>>[0],
  base: string,
): StaticPageVariables => {
  if (!ctx.params) throw new Error('Can not extract params')

  const baseParts = base.split('/').filter(Boolean)
  const url = Array.isArray(ctx.params.url)
    ? [...baseParts, ...ctx.params.url]
    : [...baseParts, ctx.params.url]
  let locale: GQLLocale = 'nl'
  const locales = ['en']

  if (locales.includes(url[0] as GQLLocale)) {
    locale = url[0] as GQLLocale
  }

  return { url: `/${url.join('/')}`, locale }
}

export default extractParams
