import { useQuery } from '@apollo/client'
import { FormControl, FormHelperText, TextField } from '@material-ui/core'
import Button from '@reachdigital/next-ui/Button'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import useFormGqlMutation from '@reachdigital/react-hook-form/useFormGqlMutation'
import clsx from 'clsx'
import React from 'react'
import { ClientCartDocument } from '../ClientCart.gql'
import { RemoveCouponDocument } from './RemoveCoupon.gql'
import useCouponFormStyles from './useCouponFormStyles'

type RemoveCouponProps = { coupon: string }

export default function RemoveCoupon(props: RemoveCouponProps) {
  const { coupon } = props
  const formClasses = useFormStyles()
  const classes = useCouponFormStyles()
  const { data: cartQuery } = useQuery(ClientCartDocument)

  const form = useFormGqlMutation(RemoveCouponDocument, {
    defaultValues: { cartId: cartQuery?.cart?.id },
  })
  const { errors, handleSubmit, formState, error } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <form
      onSubmit={submitHandler}
      noValidate
      className={clsx(formClasses.form, classes.couponForm)}
    >
      <TextField
        variant='outlined'
        type='text'
        id='couponCode'
        name='couponCode'
        label='Coupon Code'
        disabled
        value={coupon}
      />

      <FormControl>
        <Button
          type='submit'
          loading={formState.isSubmitting}
          color='primary'
          variant='contained'
          size='large'
          className={classes.button}
        >
          Remove
        </Button>
      </FormControl>

      <ApolloErrorAlert error={error} />
    </form>
  )
}
