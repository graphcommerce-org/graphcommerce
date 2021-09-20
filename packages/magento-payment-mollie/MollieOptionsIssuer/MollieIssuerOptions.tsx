import { makeStyles, TextField, Theme, Typography } from '@material-ui/core'
import { useFormGqlMutationCart } from '@reachdigital/magento-cart'
import { PaymentOptionsProps } from '@reachdigital/magento-cart-payment-method'
import { FormRow, InputCheckmark } from '@reachdigital/next-ui'
import { useFormCompose, useFormPersist, useFormValidFields } from '@reachdigital/react-hook-form'
import React from 'react'
import { SetMolliePaymentMethodIssuerOnCartDocument } from './SetMolliePaymentMethodIssuerOnCart.gql'

type MollieIssuerOptionsProps = PaymentOptionsProps & { label: string }

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      ...theme.typography.body2,
      paddingLeft: theme.spacings.xs,
      margin: 0,
    },
  }),
  { name: 'MollieIssuerOptions' },
)

export default function MollieIssuerOptions(props: MollieIssuerOptionsProps) {
  const { mollie_available_issuers = [] } = props
  const { code, step, Container, label, title } = props
  const classes = useStyles()

  const form = useFormGqlMutationCart(SetMolliePaymentMethodIssuerOnCartDocument, {
    mode: 'onChange',
    defaultValues: { code },
  })

  const { handleSubmit, muiRegister, formState, required } = form
  const submit = handleSubmit(() => {})
  const valid = useFormValidFields(form, required)

  useFormPersist({ form, name: `PaymentMethodOptions_${code}` })
  useFormCompose({ form, step, submit, key: `PaymentMethodOptions_${code}` })

  return (
    <Container>
      <Typography variant='h5' component='span'>
        Pay with {title}
      </Typography>
      <form onSubmit={submit} noValidate>
        <FormRow>
          <TextField
            defaultValue=''
            variant='outlined'
            select
            SelectProps={{ native: true, displayEmpty: true }}
            error={formState.isSubmitted && !!formState.errors.issuer}
            helperText={formState.isSubmitted && formState.errors.issuer?.message}
            label={label}
            required={required.issuer}
            {...muiRegister('issuer', { required: required.issuer })}
            InputProps={{
              endAdornment: <InputCheckmark show={valid.issuer} />,
            }}
          >
            <option value='' />
            {/* <MenuItem value='' /> */}
            {mollie_available_issuers?.map((issuer) => {
              if (!issuer?.code || !issuer.name) return null

              return (
                <option key={issuer.code} value={issuer.code}>
                  {issuer.name}
                </option>
              )
              // return (
              //   <MenuItem key={issuer.code} value={issuer.code}>
              //     <ListItemIcon>
              //       <SvgImage src={issuer.svg} alt={issuer.name} size='small' />
              //     </ListItemIcon>
              //     <Typography variant='inherit'>{issuer.name}</Typography>
              //   </MenuItem>
              // )
            })}
          </TextField>
        </FormRow>
        <ul className={classes.root}>
          <li>Choose your bank, fill in your details and click "Continue".</li>
          <li>Complete the payment on your bank's website.</li>
          <li>
            As soon as the payment is completed, you will automatically return to the webshop.
          </li>
        </ul>
      </form>
    </Container>
  )
}
