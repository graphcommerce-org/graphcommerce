import { useTheme } from '@mui/material'

export function useCompareListStyles() {
  const theme = useTheme()
  return {
    display: 'flex ',
    justifyContent: 'center',
    gap: theme.spacings.md,
    '& > *': {
      width: {
        md: 'calc(100% / 3)',
        xs: 'calc(100% / 2)',
      },
    },
    [theme.breakpoints.down('md')]: {
      '> *:nth-of-type(2) ~ *': {
        display: 'none',
      },
    },
  }
}
