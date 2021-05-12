import { IconButton, makeStyles, Theme } from '@material-ui/core'
import { Clear } from '@material-ui/icons'
import { useFormGqlMutationCart } from '@reachdigital/magento-cart'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import React from 'react'
import { CouponFragment } from '../Api/Coupon.gql'
import { RemoveCouponFormDocument } from './RemoveCouponForm.gql'

type CartCouponProps = CouponFragment

const useCouponFormStyles = makeStyles((theme: Theme) => ({
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

export default function RemoveCouponForm(props: CartCouponProps) {
  const { applied_coupons } = props
  const classes = useCouponFormStyles()
  const form = useFormGqlMutationCart(RemoveCouponFormDocument)

  const { handleSubmit, error } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <form className={classes.inlineCoupon} onSubmit={submitHandler} noValidate>
      {applied_coupons?.[0]?.code}
      <IconButton type='submit'>
        <Clear fontSize='small' />
      </IconButton>

      <ApolloErrorAlert error={error} />
    </form>
  )
}
