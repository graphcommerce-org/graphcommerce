import createCache from '@emotion/cache'
import type { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { Theme } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import {
  createMakeStyles,
  createWithStyles,
  CSSObject,
  useMergedClasses,
  getTssDefaultEmotionCache,
  TssCacheProvider,
} from 'tss-react'

export { useMergedClasses }

const { makeStyles: makeStylesBase } = createMakeStyles({ useTheme })
const { withStyles: withStylesBase } = createWithStyles({ useTheme })

/**
 * **Note: This is a leftover from Material UI 4. To make the migration possible we're using a
 * stopgap solution. This will provide somewhat the same functionality as makeStyles form Material UI 4**
 *
 * Todo: remove this completely and move to Material UI's styling solution
 *
 * @deprecated
 */
export const makeStyles: typeof makeStylesBase = (...args) => makeStylesBase(...args)

/**
 * **Note: This is a leftover from Material UI 4. To make the migration possible we're using a
 * stopgap solution. This will provide somewhat the same functionality as withStyles form Material UI 4**
 *
 * Todo: remove this completely and move to Material UI's styling solution
 *
 * @deprecated
 */
export const withStyles: typeof withStylesBase = (...args) => withStylesBase(...args)

/**
 * **Note: Before you start using this: If you can, please use `<Typography>` instead of spreading
 * typography styles into your makeStyles**
 *
 * **Note: This is a leftover from Material UI 4. To make the migration possible we're using a
 * stopgap solution. This will provide somewhat the same functionality as withStyles form Material UI 4**
 *
 * A type cast from Material UI's `TypographyStyle` type to a more standard `CSSObject` type that
 * `@emotion/core` and `tss-react` can actually handle.
 *
 * For more details around this issue see:
 *
 * Node_modules/@mui/material/styles/createTypography.d.ts => TypographyStyle
 * https://github.com/garronej/tss-react/issues/50
 *
 * @deprecated
 */
export function typography(theme: Theme, key: keyof Theme['typography']): CSSObject {
  return theme.typography[key] as CSSObject
}

let cache: EmotionCache | undefined

/** Creates a single instance of the `@emotion/cache` that is shared between server and client */
export function emotionCache() {
  if (!cache) cache = createCache({ key: 'css', prepend: true })
  return cache
}

/** Provider that is supposed to be used in your `pages/_app.tsx` */
export function EmotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider value={emotionCache()}>
      <TssCacheProvider value={getTssDefaultEmotionCache()}>{children}</TssCacheProvider>
    </CacheProvider>
  )
}
