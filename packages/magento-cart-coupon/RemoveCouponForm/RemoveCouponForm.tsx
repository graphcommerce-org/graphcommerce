import { useQuery } from '@apollo/client'
import { IconButton } from '@material-ui/core'
import { Clear } from '@material-ui/icons'
import { useFormGqlMutation } from '@reachdigital/react-hook-form'
import React from 'react'
import { CartCouponFragment } from '../CartCoupon.gql'
import { ClientCartDocument } from '../ClientCart.gql'
import useCouponFormStyles from '../useCouponFormStyles'
import { RemoveCouponDocument } from './RemoveCoupon.gql'

type CartCouponProps = CartCouponFragment

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
  const { data: cartQuery } = useQuery(ClientCartDocument)

  const form = useFormGqlMutation(RemoveCouponDocument, {
    defaultValues: { cartId: cartQuery?.cart?.id },
  })
  const { handleSubmit } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <form className={classes.inlineCoupon} onSubmit={submitHandler}>
      {applied_coupons?.[0]?.code}
      <IconButton type='submit'>
        <Clear fontSize='small' />
      </IconButton>
    </form>
  )
}
