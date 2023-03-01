import { ComponentsVariants } from '@mui/material'
import { createResponsiveTemplate } from '../Styles/spreadVal'
import { themeBaseDefaults } from './themeDefaults'

declare module '@mui/material/Button/Button' {
  interface ButtonPropsVariantOverrides {
    pill: true
    inline: true
  }
}

const rv = createResponsiveTemplate(themeBaseDefaults.breakpoints.values)

type ButtonVariants = NonNullable<ComponentsVariants['MuiButton']>

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
      padding: rv`${[3, 5]}px ${[8, 15]}px`,
      '&.MuiLoadingButton-loading:hover': {
        backgroundColor: theme.palette.action.disabledBackground,
      },
      '& .MuiLoadingButton-loadingIndicatorEnd': { right: rv`${[9, 15]}px` },
      '& .MuiLoadingButton-loadingIndicatorStart': { left: rv`${[9, 15]}px` },
    }),
  },
  {
    props: { size: 'medium' },
    style: ({ theme }) => ({
      ...theme.typography.body1,
      padding: rv`${[7, 9]}px ${[15, 22]}px`,
      '&.MuiLoadingButton-loading:hover': {
        backgroundColor: theme.palette.action.disabledBackground,
      },
      '& .MuiLoadingButton-loadingIndicatorEnd': { right: rv`${[16, 24]}px` },
      '& .MuiLoadingButton-loadingIndicatorStart': {
        left: rv`${[16, 24]}px`,
      },
    }),
  },
  {
    props: { size: 'large' },
    style: ({ theme }) => ({
      ...theme.typography.subtitle1,
      fontWeight: theme.typography.fontWeightBold,
      padding: rv`${[10, 15]}px ${[28, 58]}px`,
      '&.MuiLoadingButton-loading:hover': {
        backgroundColor: theme.palette.action.disabledBackground,
      },
      '& .MuiLoadingButton-loadingIndicatorEnd': { right: rv`${[30, 60]}px` },
      '& .MuiLoadingButton-loadingIndicatorStart': {
        left: rv`${[30, 60]}px`,
      },
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
    style: ({ theme }) => ({
      padding: rv`${[3, 5]}px ${[9, 15]}px`,
      '& .MuiLoadingButton-loadingIndicatorEnd': { right: rv`${[9, 15]}px` },
      '& .MuiLoadingButton-loadingIndicatorStart': { left: rv`${[9, 15]}px` },
    }),
  },
  {
    props: { variant: 'text', size: 'large' },
    style: ({ theme }) => ({
      padding: rv`${[8, 10]}px ${[12, 22]}px`,
      '& .MuiLoadingButton-loadingIndicatorEnd': { right: rv`${[16, 24]}px` },
      '& .MuiLoadingButton-loadingIndicatorStart': {
        left: rv`${[16, 24]}px`,
      },
    }),
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

export const MuiButtonInline: ButtonVariants = [
  {
    props: { variant: 'inline', color: 'primary' },
    style: ({ theme }) => ({
      color: theme.palette.primary.main,
      '&:hover:not(.Mui-disabled)': { backgroundColor: `${theme.palette.primary.main}30` },
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
      margin: rv`calc(${theme.spacings.xxs} / 2 * -1 )`,
      padding: '3px 9px',

      '& .MuiLoadingButton-loadingIndicatorEnd': { right: 3 },
      '& .MuiLoadingButton-loadingIndicatorStart': { left: 9 },
    }),
  },
  {
    props: { variant: 'inline', size: 'medium' },
    style: ({ theme }) => ({
      margin: rv`calc(${theme.spacings.xxs} * -1 )`,
      padding: rv`${[3, 5]}px {[9, 15]}px`,
      '& .MuiLoadingButton-loadingIndicatorEnd': { right: rv`${[9, 15]}px` },
      '& .MuiLoadingButton-loadingIndicatorStart': { left: rv`${[9, 15]}px` },
    }),
  },
  {
    props: { variant: 'inline', size: 'large' },
    style: ({ theme }) => ({
      margin: rv`calc(${theme.spacings.xs} * -1)`,
      padding: rv`${[8, 10]}px ${[12, 22]}px`,
      '& .MuiLoadingButton-loadingIndicatorEnd': { right: rv`${[16, 24]}px` },
      '& .MuiLoadingButton-loadingIndicatorStart': {
        left: rv`${[16, 24]}px`,
      },
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
