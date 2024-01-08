import { ResolvedMetadata } from 'next'
import {
  createDefaultMetadata,
  createDefaultViewport,
} from 'next/dist/lib/metadata/default-metadata'
import { AlternatesMetadata } from 'next/dist/lib/metadata/generate/alternate'
import {
  ViewportMeta,
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
  metadata: ResolvedMetadata
  children?: React.ReactNode
}

export function PageMetaNew(props: PageMetaPropsNew) {
  const { metadata, children } = props

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
