import { Theme } from '@mui/material'

export const sxLargeItem = (theme: Theme) => ({
  [theme.breakpoints.up('xl')]: {
    '& > :nth-of-type(7n + 3)': {
      gridColumn: 'span 2',
      gridRow: 'span 2',
      display: 'grid',
      gridAutoFlow: 'row',
      gridTemplateColumns: '100%',
      gridTemplateRows: '1fr auto',
      '& > div:first-of-type': {
        position: 'relative',
        height: '100%',
      },
    },
  },
})
