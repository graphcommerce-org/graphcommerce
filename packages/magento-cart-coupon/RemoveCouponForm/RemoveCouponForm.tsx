import { useFormGqlMutationCart, ApolloCartErrorAlert } from '@graphcommerce/magento-cart'
import {
  UseStyles,
  SvgImageSimple,
  iconCancelAlt,
  Button,
  makeStyles,
  useMergedClasses,
} from '@graphcommerce/next-ui'
import { lighten } from '@mui/material'
import React from 'react'
import { CouponFragment } from '../Api/Coupon.gql'
import { RemoveCouponFormDocument } from './RemoveCouponForm.gql'

const useStyles = makeStyles({ name: 'RemoveCouponForm' })((theme) => ({
  inlineCoupon: {
    fontWeight: 600,
    background: lighten(theme.palette.secondary.light, theme.palette.action.hoverOpacity),
    '& svg': {
      stroke: 'transparent',
      fill: theme.palette.secondary.main,
    },
  },
}))

export type CartCouponProps = CouponFragment & UseStyles<typeof useStyles>

export default function RemoveCouponForm(props: CartCouponProps) {
  const { applied_coupons } = props
  const classes = useMergedClasses(useStyles().classes, props.classes)
  const form = useFormGqlMutationCart(RemoveCouponFormDocument)

  const { handleSubmit, error } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <form onSubmit={submitHandler} noValidate>
      <Button
        type='submit'
        variant='text'
        color='secondary'
        className={classes.inlineCoupon}
        endIcon={<SvgImageSimple src={iconCancelAlt} />}
      >
        {applied_coupons?.[0]?.code}
      </Button>
      <ApolloCartErrorAlert error={error} />
    </form>
  )
}
