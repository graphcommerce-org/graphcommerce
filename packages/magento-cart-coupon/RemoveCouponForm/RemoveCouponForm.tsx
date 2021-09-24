import { IconButton, makeStyles, Theme } from '@material-ui/core'
import { useFormGqlMutationCart, ApolloCartErrorAlert } from '@graphcommerce/magento-cart'
import { UseStyles, iconClose, SvgImageSimple } from '@graphcommerce/next-ui'
import React from 'react'
import { CouponFragment } from '../Api/Coupon.gql'
import { RemoveCouponFormDocument } from './RemoveCouponForm.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    inlineCoupon: {
      background: `${theme.palette.secondary.main}12`,
      margin: `-1px 0 -2px`,
      padding: `4px ${theme.spacings.xxs} 4px ${theme.spacings.xxs}`,
      color: theme.palette.secondary.main,
      borderRadius: 4,
      ...theme.typography.body2,
      fontWeight: 600,
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
  }),
  { name: 'RemoveCouponForm' },
)

export type CartCouponProps = CouponFragment & UseStyles<typeof useStyles>

export default function RemoveCouponForm(props: CartCouponProps) {
  const { applied_coupons } = props
  const classes = useStyles(props)
  const form = useFormGqlMutationCart(RemoveCouponFormDocument)

  const { handleSubmit, error } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <form className={classes.inlineCoupon} onSubmit={submitHandler} noValidate>
      {applied_coupons?.[0]?.code}
      <IconButton type='submit'>
        <SvgImageSimple src={iconClose} size='small' muted />
      </IconButton>

      <ApolloCartErrorAlert error={error} />
    </form>
  )
}
