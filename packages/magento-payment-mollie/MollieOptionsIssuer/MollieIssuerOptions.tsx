import { TextField } from '@material-ui/core'
import { useFormGqlMutationCart } from '@reachdigital/magento-cart'
import { PaymentOptionsProps } from '@reachdigital/magento-cart-payment-method'
import { FormRow } from '@reachdigital/next-ui'
import { useFormCompose, useFormPersist } from '@reachdigital/react-hook-form'
import React from 'react'
import { SetMolliePaymentMethodIssuerOnCartDocument } from './SetMolliePaymentMethodIssuerOnCart.gql'

type MollieIssuerOptionsProps = PaymentOptionsProps & { label: string }

export default function MollieIssuerOptions(props: MollieIssuerOptionsProps) {
  const { mollie_available_issuers = [] } = props
  const { code, step, Container } = props

  const form = useFormGqlMutationCart(SetMolliePaymentMethodIssuerOnCartDocument, {
    mode: 'onChange',
    defaultValues: { code },
  })

  const { handleSubmit, muiRegister, formState, required } = form
  const submit = handleSubmit(() => {})

  useFormPersist({ form, name: `PaymentMethodOptions_${code}` })
  useFormCompose({ form, step, submit, key: `PaymentMethodOptions_${code}` })

  return (
    <Container>
      <form onSubmit={submit} noValidate>
        <FormRow>
          <TextField
            defaultValue=''
            variant='outlined'
            select
            SelectProps={{ native: true, displayEmpty: true }}
            error={formState.isSubmitted && !!formState.errors.issuer}
            helperText={formState.isSubmitted && formState.errors.issuer?.message}
            label='Bank'
            required={required.issuer}
            {...muiRegister('issuer', { required: required.issuer })}
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
      </form>
    </Container>
  )
}
