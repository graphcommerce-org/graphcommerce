import Head from 'next/head'
import { safeJsonLdReplacer } from './safeJsonLdReplacer'

export function JsonLd<T extends { '@type': string }>(props: {
  keyVal?: string
  item: T & { '@context': 'https://schema.org' }
}) {
  const { item, keyVal } = props

  return (
    <Head>
      <script
        key={keyVal ?? 'jsonld'}
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(item, safeJsonLdReplacer) }}
      />
    </Head>
  )
}
