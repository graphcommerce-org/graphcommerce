import React from 'react'
import Head from 'next/head'
import { getCanonical } from '../Link'
import { GQLPageMetaFragment } from '../../generated/graphql'

const PageMeta: React.FC<GQLPageMetaFragment> = ({
  metaTitle,
  metaDescription,
  metaRobots,
  url,
}) => {
  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name='description' content={metaDescription} />
      <meta name='robots' content={metaRobots!} />
      <link rel='canonical' href={getCanonical(url)} />
      {/* {page.locale === GQLLocale.Nl && [
        <link rel='alternate' hrefLang='nl' href={getCanonical(page.url!)} />,
        <link rel='alternate' hrefLang='x-default' href={getCanonical(page.url!)} />,
      ]} */}
    </Head>
  )
}

export default PageMeta
