import Head from 'next/head'
import { GraphCmsPageProps } from './GraphCmsPage'
import { getCanonical } from './Link'

const PageMeta: React.FC<GraphCmsPageProps> = ({ page }) => {
  if (!page) return <></>

  return (
    <Head>
      <title>{page.metaTitle}</title>
      <meta name='description' content={page.metaDescription || ''} />
      <meta name='robots' content={page.metaRobots!} />
      <link rel='canonical' href={getCanonical(page.url!)} />
      {/* {page.locale === GQLLocale.Nl && [
        <link rel='alternate' hrefLang='nl' href={getCanonical(page.url!)} />,
        <link rel='alternate' hrefLang='x-default' href={getCanonical(page.url!)} />,
      ]} */}
    </Head>
  )
}

export { PageMeta }
