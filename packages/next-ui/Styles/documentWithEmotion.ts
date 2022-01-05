// eslint-disable-next-line @next/next/no-document-import-in-page
import type Document from 'next/document'
import { withEmotionCache } from 'tss-react/nextJs'
import { emotionCache } from './tssReact'

export function documentWithEmotion(Doc: typeof Document) {
  return withEmotionCache({ Document: Doc, getCaches: () => [emotionCache()] })
}
