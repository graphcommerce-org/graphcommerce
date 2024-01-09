import { Metadata, ResolvedMetadata } from 'next'

export type ReducedMetadata = Omit<
  Metadata,
  | 'viewport'
  | 'themeColor'
  | 'colorScheme'
  | 'apple-touch-fullscreen'
  | 'apple-touch-icon-precomposed'
>

export type ReducedResolvedMetadata = Omit<
  ResolvedMetadata,
  | 'viewport'
  | 'themeColor'
  | 'colorScheme'
  | 'apple-touch-fullscreen'
  | 'apple-touch-icon-precomposed'
>

export interface PageContent {
  notFound?: boolean
  title?: string
  metadata: ResolvedMetadata | null
}
