import { useTheme } from '@mui/material'

export function useCompareListStyles(columnCount: number) {
  const theme = useTheme()
  return {
    display: 'grid',
    gridColumnGap: theme.spacings.md,
    gridRowGap: theme.spacings.md,
    gridTemplateColumns: {
      lg: `repeat(${columnCount ?? 3}, 1fr)`,
      md: `repeat(${columnCount ?? 3}, 1fr)`,
      xs: `repeat(2, 1fr)`,
    },
    [theme.breakpoints.down('md')]: {
      '> *:nth-of-type(2) ~ *': {
        display: 'none',
      },
    },
  }
}
