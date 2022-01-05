import { ThemeProvider } from '@mui/material'
import React from 'react'
import { makeStyles } from './tssReact'

const useStyles = makeStyles({ name: 'Theme' })((theme) => ({
  // These theme specific styles are copied from
  // https://github.com/mui-org/material-ui/blob/master/packages/mui-material/src/CssBaseline/CssBaseline.js#L18-L20
  root: {
    color: theme.palette.text.primary,
    ...theme.typography.body1,
    backgroundColor: theme.palette.background.default,
  },
}))

function RenderComponent(
  props: { Component: React.FC<Record<string, unknown>> } & Record<string, unknown>,
) {
  const { Component, ...componentProps } = props
  const { classes } = useStyles()
  return <Component {...componentProps} className={classes.root} />
}

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
 *
 * export default withTheme(MyPage, darkTheme)
 * ```
 */
export function withTheme<P extends { className?: string }>(Component: React.FC<P>, theme) {
  return (props: P) => (
    <ThemeProvider theme={theme}>
      <RenderComponent Component={Component} {...props} />
    </ThemeProvider>
  )
}
