import { ComponentsVariants, Theme } from '@mui/material'
import { responsiveVal, darken } from '../Styles'

declare module '@mui/material/Chip/Chip' {
  interface ChipPropsSizeOverrides {
    responsive: true
  }
  interface ChipPropsVariantOverrides {
    ['outlinedHighlighted']: true
  }
}

type ChipVariants = NonNullable<ComponentsVariants<Theme>['MuiChip']>

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
        height: responsiveVal(26, 30),
        paddingLeft: responsiveVal(3, 6),
        paddingRight: responsiveVal(3, 6),
        typography: 'caption',
      }),
  },
  {
    props: { size: 'responsive' },
    style: ({ theme }) =>
      theme.unstable_sx({
        height: responsiveVal(32, 40),
        paddingLeft: responsiveVal(4, 8),
        paddingRight: responsiveVal(4, 8),
        borderRadius: '99em',
        typography: 'body2',
        '& .MuiChip-label': {
          paddingLeft: responsiveVal(6, 10),
          paddingRight: responsiveVal(6, 10),
        },
      }),
  },
  {
    props: { variant: 'outlined' },
    style: ({ theme }) => ({
      borderColor: theme.vars.palette.divider,
      backgroundColor: theme.vars.palette.background.default,
      '&:active': {
        boxShadow: 'none',
      },
      '& .MuiChip-deleteIcon': {
        color: theme.vars.palette.text.primary,
      },
      '&.MuiChip-clickable:hover': {
        ...darken('backgroundColor', theme.vars.palette.background.default, 0.05),
      },
      '& .MuiChip-deleteIcon:hover': {
        color: theme.vars.palette.text.primary,
      },
    }),
  },
  {
    props: { color: 'primary' },
    style: ({ theme }) => ({
      borderColor: theme.vars.palette.text.primary,
      color: theme.vars.palette.text.primary,
      '&:hover': {
        background: `${theme.vars.palette.background.default} !important`,
        borderColor: `${theme.vars.palette.divider} !important`,
      },
      '&:focus': {
        background: `${theme.vars.palette.background.paper} !important`,
      },
      '& .MuiChip-deleteIcon:hover': {
        color: theme.vars.palette.text.primary,
      },
    }),
  },
]
