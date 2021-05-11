import { useQuery } from '@apollo/client'
import { IconButton } from '@material-ui/core'
import SvgImage from '@reachdigital/next-ui/SvgImage'
import { iconClose } from '@reachdigital/next-ui/icons'
import { useFormGqlMutation } from '@reachdigital/react-hook-form'
import React from 'react'
import { ClientCartDocument } from '../ClientCart.gql'
import { CartCouponFragment } from './CartCoupon.gql'
import { RemoveCouponDocument } from './RemoveCoupon.gql'
import useCouponFormStyles from './useCouponFormStyles'

type CartCouponProps = CartCouponFragment

export default function CartCoupon(props: CartCouponProps) {
  const { applied_coupons } = props
  const classes = useCouponFormStyles()
  const { data: cartQuery } = useQuery(ClientCartDocument)

  const form = useFormGqlMutation(RemoveCouponDocument, {
    defaultValues: { cartId: cartQuery?.cart?.id },
  })
  const { handleSubmit } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <div className={classes.inlineCoupon}>
      {applied_coupons?.[0]?.code}
      <IconButton
        onClick={(e) => {
          e.stopPropagation()
          return submitHandler()
        }}
      >
        <SvgImage src={iconClose} size='small' alt='clear' />
      </IconButton>
    </div>
  )
}
