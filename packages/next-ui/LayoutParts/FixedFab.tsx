import { styled } from '@mui/material'

export const FixedFab = styled('div')(({ theme }) => ({
  position: 'fixed',
  bottom: 20,
  right: 20,
  zIndex: 100,
  borderRadius: 99,
  maxWidth: 56,
  [theme.breakpoints.up('md')]: {
    pointerEvents: 'all',
    top: `calc(${theme.appShell.headerHeightMd} / 2 - 28px)`,
    left: `calc((100vw - (100vw - 100%)) - ${theme.page.horizontal} - 56px)`,
    bottom: 'unset',
  },
}))
