import { useQuery } from '@apollo/client'
import { FormControl, TextField } from '@material-ui/core'
import Button from '@reachdigital/next-ui/Button'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import { useFormGqlMutation } from '@reachdigital/react-hook-form'
import clsx from 'clsx'
import React from 'react'
import { ClientCartDocument } from '../ClientCart.gql'
import { ApplyCouponToCartDocument } from './ApplyCouponCode.gql'

const useStyles = makeStyles((theme: Theme) => ({
  couponForm: {
    gridTemplateColumns: '1.5fr 0.5fr',
    gridColumnGap: theme.spacings.sm,
  },
}))

export default function ApplyCouponForm() {
  const formClasses = useFormStyles()
  const classes = useStyles()
  const { data: cartQuery } = useQuery(ClientCartDocument)

  const form = useFormGqlMutation(ApplyCouponToCartDocument, {
    defaultValues: { cartId: cartQuery?.cart?.id },
  })
  const { handleSubmit, muiRegister, formState, required, error } = form
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
        error={!!formState.errors.couponCode || !!error}
        label='Discount code'
        required={required.couponCode}
        {...muiRegister('couponCode', { required: required.couponCode })}
        helperText={formState.errors.couponCode?.message}
        disabled={formState.isSubmitting}
      />
      <FormControl>
        <Button
          type='submit'
          loading={formState.isSubmitting}
          color='secondary'
          variant='pill'
          size='small'
        >
          Apply
        </Button>
      </FormControl>

      <ApolloErrorAlert error={error} />
    </form>
  )
}
