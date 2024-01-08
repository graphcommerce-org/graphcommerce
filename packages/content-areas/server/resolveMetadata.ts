/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { createDefaultMetadata } from 'next/dist/lib/metadata/default-metadata'
import { resolveAsArrayOrUndefined } from 'next/dist/lib/metadata/generate/utils'
import {
  resolveAlternates,
  resolveAppleWebApp,
  resolveAppLinks,
  resolveRobots,
  resolveVerification,
  resolveItunes,
} from 'next/dist/lib/metadata/resolvers/resolve-basics'
import { resolveIcons } from 'next/dist/lib/metadata/resolvers/resolve-icons'
import {
  resolveOpenGraph,
  resolveTwitter,
} from 'next/dist/lib/metadata/resolvers/resolve-opengraph'
import { resolveTitle } from 'next/dist/lib/metadata/resolvers/resolve-title'
import type {
  Metadata,
  ResolvedMetadata,
  ResolvingMetadata,
  ResolvingViewport,
  Viewport,
} from 'next/dist/lib/metadata/types/metadata-interface'
import type { MetadataContext } from 'next/dist/lib/metadata/types/resolvers'
import { ReducedMetadata, ReducedResolvedMetadata } from '../types'

type MetadataResolver = (parent: ResolvingMetadata) => Metadata | Promise<Metadata>
type ViewportResolver = (parent: ResolvingViewport) => Viewport | Promise<Viewport>

export type MetadataItems = [
  Metadata | MetadataResolver | null,
  Viewport | ViewportResolver | null,
][]

type TitleTemplates = {
  title: string | null
  twitter: string | null
  openGraph: string | null
}

export type BuildState = {
  warnings: Set<string>
}

// Merge the source metadata into the resolved target metadata.
export function resolveMetadata(
  source: ReducedMetadata | null,
  {
    titleTemplates,
    metadataContext,
  }: {
    titleTemplates: TitleTemplates
    metadataContext: MetadataContext
  } = {
    metadataContext: { pathname: '/' },
    titleTemplates: { openGraph: null, title: null, twitter: null },
  },
): ReducedResolvedMetadata {
  const target: ResolvedMetadata = createDefaultMetadata()
  // If there's override metadata, prefer it otherwise fallback to the default metadata.
  const metadataBase =
    typeof source?.metadataBase !== 'undefined' ? source.metadataBase : target.metadataBase
  for (const key_ in source) {
    const key = key_ as keyof ReducedMetadata

    switch (key) {
      case 'title': {
        target.title = resolveTitle(source.title, titleTemplates.title)
        break
      }
      case 'alternates': {
        target.alternates = resolveAlternates(source.alternates, metadataBase, metadataContext)
        break
      }
      case 'openGraph': {
        target.openGraph = resolveOpenGraph(
          source.openGraph,
          metadataBase,
          metadataContext,
          titleTemplates.openGraph,
        )
        break
      }
      case 'twitter': {
        target.twitter = resolveTwitter(source.twitter, metadataBase, titleTemplates.twitter)
        break
      }
      case 'verification':
        target.verification = resolveVerification(source.verification)
        break

      case 'icons': {
        target.icons = resolveIcons(source.icons)
        break
      }
      case 'appleWebApp':
        target.appleWebApp = resolveAppleWebApp(source.appleWebApp)
        break
      case 'appLinks':
        target.appLinks = resolveAppLinks(source.appLinks)
        break
      case 'robots': {
        target.robots = resolveRobots(source.robots)
        break
      }
      case 'archives':
      case 'assets':
      case 'bookmarks':
      case 'keywords': {
        target[key] = resolveAsArrayOrUndefined(source[key])
        break
      }
      case 'authors': {
        target[key] = resolveAsArrayOrUndefined(source.authors)
        break
      }
      case 'itunes': {
        target[key] = resolveItunes(source.itunes, metadataBase, metadataContext)
        break
      }
      // directly assign fields that fallback to null
      case 'applicationName':
      case 'description':
      case 'generator':
      case 'creator':
      case 'publisher':
      case 'category':
      case 'classification':
      case 'referrer':
      case 'formatDetection':
      case 'manifest':
        // @ts-expect-error TODO: support inferring
        target[key] = source[key] || null
        break
      case 'other':
        target.other = { ...target.other, ...source.other }
        break
      case 'metadataBase':
        target.metadataBase = metadataBase
        break

      default: {
        break
      }
    }
  }

  return target
}
