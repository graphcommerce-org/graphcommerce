import { SxProps, Theme, ThemeProvider } from '@mui/material/styles'
import React from 'react'

type WithSx = { sx?: SxProps<Theme> }

/**
 * It will provide a theme for the underlying tree and will set the color/font and backgroundColor
 * for the child.
 *
 * To use it, wrap your component with it.
 *
 * Example:
 *
 * ```tsx
 * const MyPage = () => {
 *   return <div>Your regular page content</div>
 * }
 * export default MyPage
 * ```
 *
 * Becomes:
 *
 * ```tsx
 * const MyPage = () => {
 *   return <div>Your regular page content, but now in darkMode</div>
 * }
 * export default withTheme(MyPage, darkTheme)
 * ```
 *
 * If you are trying to theme a complete page:
 *
 * ```tsx
 * MyPage.pageOptions = {
 *   Layout: withTheme(LayoutFull, darkTheme),
 * } as PageOptions
 * ```
 */
export function withTheme<T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: (value: T & WithSx) => React.ReactElement<any, any> | null,
  theme: Theme,
): React.FC<T & WithSx> {
  return (data: T & WithSx) => {
    const { sx = [] } = data
    return (
      <ThemeProvider theme={theme}>
        <Component
          {...data}
          sx={[
            {
              typography: 'body1',
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.background.default,
            },
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
        />
      </ThemeProvider>
    )
  }
}
