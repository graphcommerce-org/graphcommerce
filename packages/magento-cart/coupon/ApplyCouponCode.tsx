import { useQuery } from '@apollo/client'
import { FormControl, TextField } from '@material-ui/core'
import useFormStyles from '@reachdigital/next-ui/AnimatedForm/useFormStyles'
import Button from '@reachdigital/next-ui/Button'
import useFormGqlMutation from '@reachdigital/react-hook-form/useFormGqlMutation'
import clsx from 'clsx'
import React from 'react'
import { ClientCartDocument } from '../ClientCart.gql'
import { ApplyCouponToCartDocument } from './ApplyCouponCode.gql'
import useCouponFormStyles from './useCouponFormStyles'

export default function ApplyCouponCode() {
  const formClasses = useFormStyles()
  const classes = useCouponFormStyles()
  const { data: cartQuery } = useQuery(ClientCartDocument)

  const form = useFormGqlMutation(ApplyCouponToCartDocument, {
    defaultValues: { cartId: cartQuery?.cart?.id },
  })
  const { errors, handleSubmit, register, formState, required, clearErrors, error } = form
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
        error={!!errors.couponCode || !!error}
        id='couponCode'
        name='couponCode'
        label='Coupon Code'
        required={required.couponCode}
        inputRef={register({ required: required.couponCode })}
        helperText={errors.couponCode?.message || error?.message}
        disabled={formState.isSubmitting}
        onChange={() => clearErrors('submission')}
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
          Apply
        </Button>
      </FormControl>
    </form>
  )
}
