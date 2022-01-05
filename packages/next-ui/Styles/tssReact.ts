import createCache from '@emotion/cache'
import type { EmotionCache } from '@emotion/cache'
import { useTheme } from '@mui/material/styles'

// eslint-disable-next-line @next/next/no-document-import-in-page
import type Document from 'next/document'

import { createMakeStyles, createWithStyles, useMergedClasses } from 'tss-react'
import { withEmotionCache } from 'tss-react/nextJs'

const { makeStyles, useStyles } = createMakeStyles({ useTheme })
const { withStyles } = createWithStyles({ useTheme })

export { makeStyles, useStyles, withStyles, useMergedClasses }

let cache: EmotionCache | undefined
export function emotionCache() {
  if (!cache) cache = createCache({ key: 'css', prepend: true })
  return cache
}

export function withEmotion(Doc: typeof Document) {
  return withEmotionCache({ Document: Doc, getCaches: () => [emotionCache()] })
}
