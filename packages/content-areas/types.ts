import { ResolvedMetadata } from 'next'

export interface PageContent {
  notFound?: boolean
  title?: string

  metadata: ResolvedMetadata
}
