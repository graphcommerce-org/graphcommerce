import { Theme, ThemeProvider, StyledEngineProvider } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';



declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}



declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


const useStyles = makeStyles(
  {
    // These theme specific styles are copied from
    // https://github.com/mui-org/material-ui/blob/master/packages/mui-material/src/CssBaseline/CssBaseline.js#L18-L24
    root: (theme: Theme) => ({
      color: theme.palette.text.primary,
      ...theme.typography.body1,
      backgroundColor: theme.palette.background.default,
    }),
  },
  { name: 'Theme' },
)

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
export function withTheme<P extends { className?: string }>(Component: React.FC<P>, theme: Theme) {
  return (props: P) => {
    const classes = useStyles(theme)

    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Component {...props} className={classes.root} />
        </ThemeProvider>
      </StyledEngineProvider>
    );
  };
}
