import { styled } from '@mui/material/styles'

export const DesktopNavActions = styled('div', { name: 'DesktopNavActions' })(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'grid',
    pointerEvents: 'none !important' as 'none',
    '& > *': {
      pointerEvents: 'all',
    },
    alignItems: 'center',
    gridAutoFlow: 'column',
    columnGap: 6,
  },
}))
