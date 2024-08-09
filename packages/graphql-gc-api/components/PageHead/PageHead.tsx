import { usePageContext } from '@graphcommerce/framer-next-pages'
import { canonicalize } from '@graphcommerce/next-ui'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { PageHeadFragment, GcMetaTagFragment, GcLinkRelTagFragment } from './PageHead.gql'

type PageMetaProps = {
  page: PageHeadFragment
  children?: React.ReactNode
}

export function PageMeta(props: PageMetaProps) {
  const {
    page: { head },
    children,
  } = props

  const { active } = usePageContext()
  const router = useRouter()

  if (!head || !active) return null

  const allLinkRel = new Map<string, GcLinkRelTagFragment>()
  const allMeta = new Map<string, GcMetaTagFragment>()

  const canonical = canonicalize(router, head.canonical.href)
  allLinkRel.set('canonical', { rel: 'canonical', href: canonical })

  if (head?.description) {
    allMeta.set('description', { name: 'description', content: head.description })
    allMeta.set('og:description', { name: 'og:description', content: head.description })
  }

  allMeta.set('og:title', { name: 'og:title', content: head.title })
  allMeta.set('og:url', { name: 'og:url', content: canonical })

  head.link?.forEach((link) => allLinkRel.set(link.rel, link))
  head.robots?.forEach((robot) => allMeta.set(robot.name, robot))
  head.meta?.forEach((meta) => allMeta.set(meta.name, meta))

  return (
    <Head>
      <title>{head.title.trim()}</title>
      {[...allLinkRel.values()].map((link) => (
        <link
          key={`${link.rel}${link.href}${link.hreflang}}`}
          rel={link.rel}
          href={link.href}
          hrefLang={link.hreflang ?? undefined}
        />
      ))}
      {[...allMeta.values()].map((meta) => (
        <meta key={`${meta.name}|${meta.content}`} name={meta.name} content={meta.content.trim()} />
      ))}
      {children}
    </Head>
  )
}
