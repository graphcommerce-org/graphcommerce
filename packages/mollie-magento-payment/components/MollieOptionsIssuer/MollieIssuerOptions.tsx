import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { PaymentOptionsProps } from '@graphcommerce/magento-cart-payment-method'
import { extendableComponent, FormRow, InputCheckmark } from '@graphcommerce/next-ui'
import { useFormCompose, useFormPersist, useFormValidFields } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/macro'
import { Box, TextField, Typography } from '@mui/material'
import { SetMolliePaymentMethodIssuerOnCartDocument } from './SetMolliePaymentMethodIssuerOnCart.gql'

type MollieIssuerOptionsProps = PaymentOptionsProps & { label: string }

const compName = 'MollieIssuerOptions' as const
const parts = ['root', 'list'] as const
const { classes } = extendableComponent(compName, parts)

export function MollieIssuerOptions(props: MollieIssuerOptionsProps) {
  const { mollie_available_issuers = [] } = props
  const { code, step, Container, label, title = '' } = props

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
        <Trans>Pay with {title}</Trans>
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
              endAdornment: <InputCheckmark show={valid.issuer} select />,
            }}
          >
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
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
              //       <IconSvg src={issuer.svg} alt={issuer.name} size='small' />
              //     </ListItemIcon>
              //     <Typography variant='inherit'>{issuer.name}</Typography>
              //   </MenuItem>
              // )
            })}
          </TextField>
        </FormRow>
        <Box
          component='ul'
          className={classes.list}
          sx={(theme) => ({
            typography: 'body2',
            paddingLeft: theme.spacings.xs,
            margin: 0,
          })}
        >
          <li>
            <Trans>Choose your bank, and place your order.</Trans>
          </li>
          <li>
            <Trans>Complete the payment on your bank's website.</Trans>
          </li>
          <li>
            <Trans>
              As soon as the payment is completed, you will automatically return to the webshop.
            </Trans>
          </li>
        </Box>
      </form>
    </Container>
  )
}
