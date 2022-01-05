import createCache from '@emotion/cache'
import type { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { useTheme } from '@mui/material/styles'
import { createMakeStyles, createWithStyles, useMergedClasses } from 'tss-react'

const { makeStyles, useStyles } = createMakeStyles({ useTheme })
const { withStyles } = createWithStyles({ useTheme })

export { makeStyles, useStyles, withStyles, useMergedClasses }

let cache: EmotionCache | undefined
export function emotionCache() {
  if (!cache) cache = createCache({ key: 'css', prepend: true })
  return cache
}

export function EmotionProvider(props: { children: React.ReactNode }) {
  return <CacheProvider value={emotionCache()} {...props} />
}
