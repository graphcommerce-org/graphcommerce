import { makeStyles, Theme } from '@material-ui/core'

const useCouponFormStyles = makeStyles((theme: Theme) => ({
  couponForm: {
    gridTemplateColumns: '1.5fr 0.5fr',
    gridColumnGap: theme.spacings.sm,
  },
  button: {
    borderRadius: theme.spacings.xxs,
  },
  inlineCoupon: {
    background: `${theme.palette.secondary.main}12`,
    padding: `4px ${theme.spacings.xxs} 4px ${theme.spacings.xxs}`,
    color: theme.palette.secondary.main,
    textTransform: 'uppercase',
    borderRadius: 4,
    ...theme.typography.h6,
    display: 'flex',
    alignItems: 'center',
    '& .MuiIconButton-root': {
      width: 14,
      height: 14,
      marginLeft: 4,
      color: theme.palette.grey[400],
      '& .MuiSvgIcon-root': {
        padding: 2,
      },
    },
  },
}))

export default useCouponFormStyles
