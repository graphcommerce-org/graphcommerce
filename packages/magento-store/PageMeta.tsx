import {
  PageMeta as NextPageMeta,
  PageMetaProps as NextPageMetaProps,
} from '@graphcommerce/next-ui'
import { MagentoEnv } from './storeConfigEnv'

type PageMetaProps = Pick<NextPageMetaProps, 'title' | 'metaDescription' | 'metaRobots'> & {
  canonical?: string
}

export function PageMeta(props: PageMetaProps) {
  const { title, canonical, ...pageMetaProps } = props

  const prefix = (process.env as MagentoEnv).NEXT_PUBLIC_TITLE_PREFIX
  const separator = (process.env as MagentoEnv).NEXT_PUBLIC_TITLE_SEPARATOR
  const defaultTitle = (process.env as MagentoEnv).NEXT_PUBLIC_DEFAULT_TITLE
  const suffix = (process.env as MagentoEnv).NEXT_PUBLIC_TITLE_SUFFIX

  let pageTitle = prefix ?? ''
  if (title ?? defaultTitle) pageTitle += ` ${title ?? defaultTitle}`
  if (separator && suffix) pageTitle += ` ${separator}`
  if (suffix) pageTitle += ` ${suffix}`

  return (
    <NextPageMeta
      title={pageTitle ?? ''}
      canonical={canonical ? `/${canonical}` : canonical}
      {...pageMetaProps}
    />
  )
}
