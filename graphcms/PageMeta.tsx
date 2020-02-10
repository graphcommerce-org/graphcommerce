import Head from 'next/head'
import { GraphCmsPageProps, isPageNlHasEn, isPageEnHasNl } from './GraphCmsPage'
import { getCanonical } from './Link'

const PageMeta: React.FC<GraphCmsPageProps> = ({ page }) => {
  if (!page) return <></>

  let hrefLang
  if (isPageNlHasEn(page)) {
    hrefLang = (
      <>
        <link rel='alternate' hrefLang='nl' href={getCanonical(page.url!)} />
        <link rel='alternate' hrefLang='en' href={getCanonical(page.urlEN!)} />
        <link rel='alternate' hrefLang='x-default' href={getCanonical(page.url!)} />
      </>
    )
  } else if (isPageEnHasNl(page)) {
    hrefLang = (
      <>
        <link rel='alternate' hrefLang='en' href={getCanonical(page.url!)} />
        <link rel='alternate' hrefLang='nl' href={getCanonical(page.urlNL!)} />
        <link rel='alternate' hrefLang='x-default' href={getCanonical(page.urlNL!)} />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{page.metaTitle}</title>
        <meta name='description' content={page.metaDescription || ''} />
        <meta name='robots' content={page.metaRobots} />
        <link rel='canonical' href={getCanonical(page.url!)} />
        {hrefLang}
      </Head>
    </>
  )
}

export { PageMeta }
