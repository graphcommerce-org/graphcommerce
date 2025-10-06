import type { ComponentsVariants, Theme } from '@mui/material'

type SnackbarVariants = NonNullable<ComponentsVariants<Theme>['MuiSnackbar']>

/**
 * The current implementation of the MuiSnackbar will only be 50% wide if no width is specificed,
 * this fixes that.
 */
export const MuiSnackbar: SnackbarVariants = [
  {
    props: {},
    style: ({ theme }) => ({
      '&.MuiSnackbar-anchorOriginBottomCenter, &.MuiSnackbar-anchorOriginBottomLeft, &.MuiSnackbar-anchorOriginBottomRight':
        {
          [theme.breakpoints.down('md')]: {
            bottom: 0,
            left: 0,
            right: 0,
          },
          [theme.breakpoints.up('md')]: {
            bottom: theme.page.vertical,
          },
        },
      '&.MuiSnackbar-anchorOriginBottomCenter': {
        [theme.breakpoints.up('md')]: {
          left: theme.page.horizontal,
          right: theme.page.horizontal,
        },
        transform: 'unset',
      },
    }),
  },
]
