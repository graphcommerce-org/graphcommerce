import React, { useEffect } from 'react'
import Head from 'next/head'
import { getCanonical } from '../Link'
import { GQLPageMetaFragment, GQLLocale } from '../../generated/graphql'

const PageMeta: React.FC<GQLPageMetaFragment> = ({
  metaTitle,
  metaDescription,
  metaRobots,
  url,
  locale,
  localizations,
}) => {
  useEffect(() => {
    if (typeof window !== 'undefined') document.documentElement.lang = locale
  })

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name='description' content={metaDescription} />
      <meta name='robots' content={metaRobots!} />
      <link rel='canonical' href={getCanonical(url)} />

      {localizations.map((localization) => (
        <link
          key={localization.id}
          rel='alternate'
          hrefLang={localization.locale === GQLLocale.Nl ? 'x-default' : localization.locale}
          href={getCanonical(localization.url!)}
        />
      ))}
    </Head>
  )
}

export default PageMeta
