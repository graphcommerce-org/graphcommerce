import { ComponentsVariants } from '@mui/material'
import { responsiveVal } from '../Styles/responsiveVal'

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    pill: true
  }
}

type ButtonVariants = NonNullable<ComponentsVariants['MuiButton']>

export const MuiButtonResponsive: ButtonVariants = [
  {
    props: {},
    style: ({ theme }) => ({
      textTransform: 'none',
      ...theme.typography.body2,
      fontWeight: 500,
    }),
  },
  {
    props: { size: 'small' },
    style: {
      padding: `${responsiveVal(3, 5)} ${responsiveVal(9, 15)}`,
      '& .MuiLoadingButton-loadingIndicatorEnd': { right: responsiveVal(9, 15) },
      '& .MuiLoadingButton-loadingIndicatorStart': { left: responsiveVal(9, 15) },
    },
  },
  {
    props: { size: 'medium' },
    style: {
      padding: `${responsiveVal(8, 11)} ${responsiveVal(16, 24)}`,
      '& .MuiLoadingButton-loadingIndicatorEnd': { right: responsiveVal(16, 24) },
      '& .MuiLoadingButton-loadingIndicatorStart': { left: responsiveVal(16, 24) },
    },
  },
  {
    props: { size: 'large' },
    style: ({ theme }) => ({
      ...theme.typography.body1,
      fontWeight: theme.typography.fontWeightBold,
      padding: `${responsiveVal(10, 15)} ${responsiveVal(30, 60)}`,
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
      '&:not(.Mui-disabled)': { boxShadow: theme.shadows[2] },
    }),
  },
  {
    props: { variant: 'pill', size: 'medium' },
    style: ({ theme }) => ({
      '&:not(.Mui-disabled)': { boxShadow: theme.shadows[4] },
    }),
  },
  {
    props: { variant: 'pill', size: 'large' },
    style: ({ theme }) => ({
      '&:not(.Mui-disabled)': { boxShadow: theme.shadows[6] },
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
    style: ({ theme }) => ({ backgroundColor: theme.palette.background.paper }),
  },
  {
    props: { variant: 'pill', disabled: true },
    style: ({ theme }) => ({
      backgroundColor: theme.palette.action.disabledBackground,
      color: theme.palette.action.disabled,
    }),
  },
]
