import { useQuery } from '@apollo/client'
import { FormControl, FormHelperText, TextField } from '@material-ui/core'
import useFormStyles from '@reachdigital/next-ui/AnimatedForm/useFormStyles'
import Button from '@reachdigital/next-ui/Button'
import { useMutationForm } from '@reachdigital/next-ui/useMutationForm'
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

  const mutationForm = useMutationForm(RemoveCouponDocument, {
    defaultValues: { cartId: cartQuery?.cart?.id },
  })
  const { errors, handleSubmit, formState } = mutationForm

  return (
    <form onSubmit={handleSubmit} noValidate className={clsx(formClasses.form, classes.couponForm)}>
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
          disabled={formState.isSubmitting}
          color='primary'
          variant='contained'
          size='large'
          className={classes.button}
        >
          Remove
        </Button>
        <FormHelperText error={!!errors.submission}>{errors.submission?.message}</FormHelperText>
      </FormControl>
    </form>
  )
}
