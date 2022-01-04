import { useFormGqlMutationCart, ApolloCartErrorAlert } from '@graphcommerce/magento-cart'
import { Button, responsiveVal, UseStyles } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { FormControl, TextField, Theme } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import React from 'react'
import { ApplyCouponFormDocument } from './ApplyCouponForm.gql'

const useStyles = makeStyles((theme: Theme) => ({
  couponForm: {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: `1fr minmax(min-content, ${responsiveVal(70, 140)})`,
    gridColumnGap: theme.spacings.sm,
  },
  button: {
    whiteSpace: 'nowrap',
  },
}))

export type ApplyCouponFormProps = UseStyles<typeof useStyles>

export default function ApplyCouponForm(props: ApplyCouponFormProps) {
  const form = useFormGqlMutationCart(ApplyCouponFormDocument)
  const { handleSubmit, muiRegister, formState, required, error } = form
  const submitHandler = handleSubmit(() => {})
  const classes = useStyles(props)

  return (
    <form onSubmit={submitHandler} noValidate className={classes.couponForm}>
      <TextField
        variant='outlined'
        type='text'
        error={!!formState.errors.couponCode || !!error}
        required={required.couponCode}
        {...muiRegister('couponCode', { required: required.couponCode })}
        helperText={formState.errors.couponCode?.message}
        disabled={formState.isSubmitting}
      />
      <FormControl>
        <Button
          type='submit'
          className={classes.button}
          loading={formState.isSubmitting}
          color='secondary'
          variant='pill'
        >
          <Trans>Apply</Trans>
        </Button>
      </FormControl>

      <ApolloCartErrorAlert error={error} />
    </form>
  )
}
