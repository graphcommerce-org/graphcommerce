import { ResolvedMetadata } from 'next'
import { createDefaultMetadata } from 'next/dist/lib/metadata/default-metadata'
import { AlternatesMetadata } from 'next/dist/lib/metadata/generate/alternate'
import {
  AppleWebAppMeta,
  BasicMeta,
  FormatDetectionMeta,
  ItunesMeta,
  VerificationMeta,
} from 'next/dist/lib/metadata/generate/basic'
import { IconsMetadata } from 'next/dist/lib/metadata/generate/icons'
import { MetaFilter } from 'next/dist/lib/metadata/generate/meta'
import {
  AppLinksMeta,
  OpenGraphMetadata,
  TwitterMetadata,
} from 'next/dist/lib/metadata/generate/opengraph'
import Head from 'next/head'
import React from 'react'

export type PageMetaPropsNew = {
  metadata?: Partial<ResolvedMetadata> | null
  children?: React.ReactNode
}

export function PageMetaNew(props: PageMetaPropsNew) {
  const { metadata: metaIncoming, children } = props

  if (!metaIncoming) return null

  const metadata: ResolvedMetadata = {
    ...createDefaultMetadata(),
    ...metaIncoming,
    metadataBase: new URL(import.meta.graphCommerce.canonicalBaseUrl),
  }

  const elements = MetaFilter([
    BasicMeta({ metadata }),
    AlternatesMetadata({ alternates: metadata.alternates }),
    ItunesMeta({ itunes: metadata.itunes }),
    FormatDetectionMeta({ formatDetection: metadata.formatDetection }),
    VerificationMeta({ verification: metadata.verification }),
    AppleWebAppMeta({ appleWebApp: metadata.appleWebApp }),
    OpenGraphMetadata({ openGraph: metadata.openGraph }),
    TwitterMetadata({ twitter: metadata.twitter }),
    AppLinksMeta({ appLinks: metadata.appLinks }),
    IconsMetadata({ icons: metadata.icons }),
  ])

  return (
    <Head>
      {elements.map((el, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={idx}>{el}</React.Fragment>
      ))}
      {children}
    </Head>
  )
}
