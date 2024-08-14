import { ComponentsVariants, Theme, alpha, darken, lighten } from '@mui/material'
import { responsiveVal } from '../Styles/responsiveVal'

declare module '@mui/material/Button/Button' {
  interface ButtonPropsVariantOverrides {
    pill: true
    inline: true
  }
}

type ButtonVariants = NonNullable<ComponentsVariants<Theme>['MuiButton']>

export const MuiButtonResponsive: ButtonVariants = [
  {
    props: {},
    style: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  {
    props: { size: 'small' },
    style: ({ theme }) => ({
      ...theme.typography.body2,
      padding: `${responsiveVal(3, 5)} ${responsiveVal(8, 15)}`,
      '&.MuiLoadingButton-loading:hover': {
        backgroundColor: theme.palette.action.disabledBackground,
      },
      '& .MuiLoadingButton-loadingIndicatorEnd': { right: responsiveVal(9, 15) },
      '& .MuiLoadingButton-loadingIndicatorStart': { left: responsiveVal(9, 15) },
    }),
  },
  {
    props: { size: 'medium' },
    style: ({ theme }) => ({
      ...theme.typography.body1,
      padding: `${responsiveVal(7, 9)} ${responsiveVal(15, 22)}`,
      '&.MuiLoadingButton-loading:hover': {
        backgroundColor: theme.palette.action.disabledBackground,
      },
      '& .MuiLoadingButton-loadingIndicatorEnd': { right: responsiveVal(16, 24) },
      '& .MuiLoadingButton-loadingIndicatorStart': { left: responsiveVal(16, 24) },
    }),
  },
  {
    props: { size: 'large' },
    style: ({ theme }) => ({
      ...theme.typography.subtitle1,
      fontWeight: theme.typography.fontWeightBold,
      padding: `${responsiveVal(10, 15)} ${responsiveVal(28, 58)}`,
      '&.MuiLoadingButton-loading:hover': {
        backgroundColor: theme.palette.action.disabledBackground,
      },
      '& .MuiLoadingButton-loadingIndicatorEnd': { right: responsiveVal(30, 60) },
      '& .MuiLoadingButton-loadingIndicatorStart': { left: responsiveVal(30, 60) },
    }),
  },
  {
    props: { variant: 'text', size: 'small' },
    style: {
      padding: '3px 9px',
      '& .MuiLoadingButton-loadingIndicatorEnd': { right: 3 },
      '& .MuiLoadingButton-loadingIndicatorStart': { left: 9 },
    },
  },
  {
    props: { variant: 'text', size: 'medium' },
    style: {
      padding: `${responsiveVal(3, 5)} ${responsiveVal(9, 15)}`,
      '& .MuiLoadingButton-loadingIndicatorEnd': { right: responsiveVal(9, 15) },
      '& .MuiLoadingButton-loadingIndicatorStart': { left: responsiveVal(9, 15) },
    },
  },
  {
    props: { variant: 'text', size: 'large' },
    style: {
      padding: `${responsiveVal(8, 10)} ${responsiveVal(12, 22)}`,
      '& .MuiLoadingButton-loadingIndicatorEnd': { right: responsiveVal(16, 24) },
      '& .MuiLoadingButton-loadingIndicatorStart': { left: responsiveVal(16, 24) },
    },
  },
]

export const MuiButtonPill: ButtonVariants = [
  {
    props: { variant: 'pill' },
    style: { borderRadius: '99em' },
  },
  {
    props: { variant: 'pill', size: 'small' },
    style: ({ theme }) => ({
      '&:not(.Mui-disabled):not(.MuiButton-disableElevation)': { boxShadow: theme.shadows[2] },
    }),
  },
  {
    props: { variant: 'pill', size: 'medium' },
    style: ({ theme }) => ({
      '&:not(.Mui-disabled):not(.MuiButton-disableElevation)': { boxShadow: theme.shadows[4] },
    }),
  },
  {
    props: { variant: 'pill', size: 'large' },
    style: ({ theme }) => ({
      '&:not(.Mui-disabled):not(.MuiButton-disableElevation)': { boxShadow: theme.shadows[6] },
    }),
  },
  {
    props: { variant: 'pill', disableElevation: true },
    style: { boxShadow: 'none' },
  },
  {
    props: { variant: 'pill', color: 'primary' },
    style: ({ theme }) => ({
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover:not(.Mui-disabled)': { backgroundColor: theme.palette.primary.dark },
    }),
  },
  {
    props: { variant: 'pill', color: 'secondary' },
    style: ({ theme }) => ({
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      '&:hover:not(.Mui-disabled)': { backgroundColor: theme.palette.secondary.dark },
    }),
  },
  {
    props: { variant: 'pill', color: 'inherit' },
    style: ({ theme }) => ({
      backgroundColor: theme.palette.background.paper,
      '&:hover:not(.Mui-disabled)': {
        backgroundColor:
          theme.palette.mode === 'light'
            ? darken(theme.palette.background.default, 0.05)
            : lighten(theme.palette.background.default, 0.2),
      },
    }),
  },
  {
    props: { variant: 'pill', disabled: true },
    style: ({ theme }) => ({
      backgroundColor: theme.palette.action.disabledBackground,
      color: theme.palette.action.disabled,
    }),
  },
]

export const MuiButtonInline: ButtonVariants = [
  {
    props: { variant: 'inline', color: 'primary' },
    style: ({ theme }) => ({
      color: theme.palette.primary.main,
      '&:hover:not(.Mui-disabled)': { backgroundColor: alpha(theme.palette.primary.main, 0.19) },
    }),
  },
  {
    props: { variant: 'inline', color: 'secondary' },
    style: ({ theme }) => ({
      color: theme.palette.secondary.main,
      '&:hover:not(.Mui-disabled)': {
        backgroundColor: theme.palette.secondary.light,
      },
    }),
  },
  {
    props: { variant: 'inline' },
    style: { textTransform: 'none', fontWeight: 500 },
  },
  {
    props: { variant: 'inline', size: 'small' },
    style: ({ theme }) => ({
      margin: `calc(${theme.spacings.xxs} * -1 )`,
      padding: '3px 9px',

      '& .MuiLoadingButton-loadingIndicatorEnd': { right: 3 },
      '& .MuiLoadingButton-loadingIndicatorStart': { left: 9 },
    }),
  },
  {
    props: { variant: 'inline', size: 'medium' },
    style: ({ theme }) => ({
      margin: `calc(${theme.spacings.xxs} * -1 )`,
      padding: `${responsiveVal(3, 5)} ${responsiveVal(9, 15)}`,

      '& .MuiLoadingButton-loadingIndicatorEnd': { right: responsiveVal(9, 15) },
      '& .MuiLoadingButton-loadingIndicatorStart': { left: responsiveVal(9, 15) },
    }),
  },
  {
    props: { variant: 'inline', size: 'large' },
    style: ({ theme }) => ({
      margin: `calc(${theme.spacings.xs} * -1)`,
      padding: `${responsiveVal(8, 10)} ${responsiveVal(12, 22)}`,

      '& .MuiLoadingButton-loadingIndicatorEnd': { right: responsiveVal(16, 24) },
      '& .MuiLoadingButton-loadingIndicatorStart': { left: responsiveVal(16, 24) },
    }),
  },
  {
    props: { variant: 'inline', disableRipple: true },
    style: {
      '&:hover:not(.Mui-disabled)': {
        backgroundColor: 'transparent',
      },
    },
  },
]
