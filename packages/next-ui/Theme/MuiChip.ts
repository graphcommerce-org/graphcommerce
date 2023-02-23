import { ComponentsVariants, darken } from '@mui/material'

declare module '@mui/material/Chip/Chip' {
  interface ChipPropsSizeOverrides {
    responsive: true
  }
  interface ChipPropsVariantOverrides {
    ['outlinedHighlighted']: true
  }
}

type ChipVariants = NonNullable<ComponentsVariants['MuiChip']>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const MuiChip: ChipVariants = [
  {
    props: {},
    style: { '& .MuiChip-icon': { fontSize: '1.3em' } },
  },
  {
    props: { size: 'small' },
    style: ({ theme }) =>
      theme.unstable_sx({
        typography: 'caption',
      }),
  },
  {
    props: { size: 'medium' },
    style: ({ theme }) =>
      theme.unstable_sx({
        height: theme.responsiveTemplate`${[26, 30]}px`,
        paddingLeft: theme.responsiveTemplate`${[3, 6]}px`,
        paddingRight: theme.responsiveTemplate`${[3, 6]}px`,
        typography: 'caption',
      }),
  },
  {
    props: { size: 'responsive' },
    style: ({ theme }) =>
      theme.unstable_sx({
        height: theme.responsiveTemplate`${[32, 40]}px`,
        paddingLeft: theme.responsiveTemplate`${[4, 8]}px`,
        paddingRight: theme.responsiveTemplate`${[4, 8]}px`,
        borderRadius: '99em',
        typography: 'body2',
        '& .MuiChip-label': {
          paddingLeft: theme.responsiveTemplate`${[6, 10]}px`,
          paddingRight: theme.responsiveTemplate`${[6, 10]}px`,
        },
      }),
  },
  {
    props: { variant: 'outlined' },
    style: ({ theme }) => ({
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.background.default,
      '&:active': {
        boxShadow: 'none',
      },
      '& .MuiChip-deleteIcon': {
        color: theme.palette.text.primary,
      },
      '&.MuiChip-clickable:hover': {
        backgroundColor: darken(theme.palette.background.default, 0.05),
      },
      '& .MuiChip-deleteIcon:hover': {
        color: theme.palette.text.primary,
      },
    }),
  },
  {
    props: { color: 'primary' },
    style: ({ theme }) => ({
      borderColor: theme.palette.text.primary,
      color: theme.palette.text.primary,
      '&:hover': {
        background: `${theme.palette.background.default} !important`,
        borderColor: `${theme.palette.divider} !important`,
      },
      '&:focus': {
        background: `${theme.palette.background.paper} !important`,
      },
      '& .MuiChip-deleteIcon:hover': {
        color: theme.palette.text.primary,
      },
    }),
  },
]
