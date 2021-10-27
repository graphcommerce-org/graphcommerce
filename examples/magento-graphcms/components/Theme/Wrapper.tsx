import { Box, styled } from '@material-ui/core'

const ThemeWrapper = styled(Box)(
  ({ theme }) => ({
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
  }),
  { name: 'ThemeWrapper' },
)

export default ThemeWrapper
