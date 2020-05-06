import React, { useEffect } from 'react'
import Head from 'next/head'

const PageMeta: React.FC<GQLPageMetaFragment> = ({
  metaTitle,
  metaDescription,
  metaRobots,
  url,
  locale,
  localizations,
  title,
  asset,
}) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = locale
      document.documentElement.dir = 'ltr'
    }
  })

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name='description' content={metaDescription} />
      <meta name='robots' content={metaRobots} />
      <link rel='canonical' href={url} />

      <meta name='twitter:card' content='summary' />
      <meta name='twitter:url' content={url} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={metaDescription} />
      {asset && <meta name='twitter:image' content={asset.url} />}
      <meta name='twitter:creator' content='@ReachNL' />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={metaDescription} />
      <meta property='og:site_name' content='Reach Digital' />
      <meta property='og:url' content='https://yourdomain.com' />
      {asset && <meta property='og:image' content={asset.url} />}

      {localizations.map((localization) => (
        <link
          key={localization.id}
          rel='alternate'
          hrefLang={localization.locale === 'nl' ? 'x-default' : localization.locale}
          href={localization.url}
        />
      ))}
    </Head>
  )
}

export default PageMeta
