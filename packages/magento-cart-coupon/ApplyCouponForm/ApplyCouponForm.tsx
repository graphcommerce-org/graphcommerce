import { FormControl, makeStyles, TextField, Theme } from '@material-ui/core'
import { useFormGqlMutationCart } from '@reachdigital/magento-cart'
import Button from '@reachdigital/next-ui/Button'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import clsx from 'clsx'
import React from 'react'
import { ApplyCouponFormDocument } from './ApplyCouponForm.gql'

const useStyles = makeStyles((theme: Theme) => ({
  couponForm: {
    gridTemplateColumns: '1.5fr 0.5fr',
    gridColumnGap: theme.spacings.sm,
  },
}))

export type ApplyCouponFormProps = UseStyles<typeof useStyles>

export default function ApplyCouponForm(props: ApplyCouponFormProps) {
  const formClasses = useFormStyles()
  const classes = useStyles(props)

  const form = useFormGqlMutationCart(ApplyCouponFormDocument)
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
