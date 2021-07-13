import { FormControl, makeStyles, TextField, Theme } from '@material-ui/core'
import { useFormGqlMutationCart, ApolloCartErrorAlert } from '@reachdigital/magento-cart'
import { Button, Form, UseStyles } from '@reachdigital/next-ui'
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
  const form = useFormGqlMutationCart(ApplyCouponFormDocument)
  const { handleSubmit, muiRegister, formState, required, error } = form
  const submitHandler = handleSubmit(() => {})
  const classes = useStyles(props)

  return (
    <Form onSubmit={submitHandler} noValidate classes={{ root: classes.couponForm }}>
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

      <ApolloCartErrorAlert error={error} />
    </Form>
  )
}
