import { GetStaticProps as NextGetStaticProps } from 'next'
import { GQLLocale } from '../generated/graphql'

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never

export type StaticPageParams = { url: string | string[]; locale: GQLLocale }

type StaticPageVariables = { url: string; locale: GQLLocale }
export type GetStaticData<T> = (props: StaticPageVariables) => Promise<T>

const extractParams = (
  ctx: ArgumentTypes<NextGetStaticProps<{}, StaticPageParams>>[0],
  base: string,
): StaticPageVariables => {
  if (!ctx.params) throw new Error('Can not extract params')

  const url = Array.isArray(ctx.params.url) ? ctx.params.url : [ctx.params.url]
  let locale = GQLLocale.Nl
  const locales = Object.values(GQLLocale)

  if (locales.includes(url[0] as GQLLocale)) {
    locale = url[0] as GQLLocale
  }

  return { url: base + url.join('/'), locale }
}

export default extractParams
