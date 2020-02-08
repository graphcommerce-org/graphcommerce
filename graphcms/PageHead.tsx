import Head from 'next/head'
import { GraphCmsPage, isPageNl, isPageEn } from './GraphCmsPage'
import { getCanonical } from './Link'

const GraphCmsPageHead: React.FC<GraphCmsPage> = ({ page }) => {
  let hrefLang
  if (isPageNl(page)) {
    hrefLang = (
      <>
        <link rel='alternate' hrefLang='nl' href={getCanonical(page)} />
        <link rel='alternate' hrefLang='en' href={`/${page.urlEN}`} />
        <link rel='alternate' hrefLang='x-default' href={getCanonical(page)} />
      </>
    )
  } else if (isPageEn(page)) {
    hrefLang = (
      <>
        <link rel='alternate' hrefLang='en' href={getCanonical(page)} />
        <link rel='alternate' hrefLang='nl' href={`/${page.urlNL}`} />
        <link rel='alternate' hrefLang='x-default' href={`/${page.urlNL}`} />
      </>
    )
  }

  return (
    <Head>
      <title>{page.metaTitle}</title>
      <meta name='description' content={page.metaDescription || ''} />
      <meta name='robots' content={page.metaRobots} />
      <link rel='canonical' href={getCanonical(page)} />
      {hrefLang}
    </Head>
  )
}

export { GraphCmsPageHead }
