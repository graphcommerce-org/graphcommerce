import React, { useEffect } from 'react'
import Head from 'next/head'

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
      <meta name='robots' content={metaRobots} />
      <link rel='canonical' href={url} />

      {localizations.map((localization) => (
        <link
          key={localization.id}
          rel='alternate'
          hrefLang={localization.locale === 'nl' ? 'x-default' : localization.locale}
          href={localization.url!}
        />
      ))}
    </Head>
  )
}

export default PageMeta
