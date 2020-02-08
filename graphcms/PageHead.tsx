import Head from 'next/head'
import { getCanonical, PageUrl } from './Link'
import { GQLPage } from '../generated/graphql'

export type PageHead = Pick<GQLPage, 'metaDescription' | 'metaRobots' | 'metaTitle'>

const GraphCmsPageHead: React.FC<{ page: PageHead & PageUrl }> = ({ page }) => {
  // useEffect(() => {
  //   // todo(paales) This should be implemented in _document, because this will not work with SSR.
  //   document.documentElement.lang = language
  // }, [language])

  return (
    <Head>
      <title>{page.metaTitle}</title>
      <meta name='description' content={page.metaDescription || ''} />
      <meta name='robots' content={page.metaRobots} />
      <link rel='canonical' href={getCanonical(page)} />
    </Head>
  )
}

export { GraphCmsPageHead }
