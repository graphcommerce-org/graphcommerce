import Head from 'next/head'
import { safeJsonLdReplacer } from './safeJsonLdReplacer'

export function JsonLd<T extends { '@type': string }>(props: {
  item: T & { '@context': 'https://schema.org' }
}) {
  const { item } = props

  return (
    <Head>
      <script
        key='jsonld'
        type='application/ld+json'
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(item, safeJsonLdReplacer) }}
      />
    </Head>
  )
}
