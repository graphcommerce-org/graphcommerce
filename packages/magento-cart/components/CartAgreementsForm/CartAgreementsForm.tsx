import { CheckboxElement } from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import { extendableComponent, FormDiv } from '@graphcommerce/next-ui'
import {
  FormPersist,
  useForm,
  useFormCompose,
  UseFormComposeOptions,
} from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { Box, Link, SxProps, Theme } from '@mui/material'
import React from 'react'
import { CartAgreementsDocument } from './CartAgreements.gql'

export type CartAgreementsFormProps = Pick<UseFormComposeOptions, 'step'> & { sx?: SxProps<Theme> }

const componentName = 'CartAgreementsForm' as const
const parts = ['form', 'formInner', 'formControlRoot', 'manualCheck'] as const
const { classes } = extendableComponent(componentName, parts)

export function CartAgreementsForm(props: CartAgreementsFormProps) {
  const { step, sx = [] } = props
  const { data } = useQuery(CartAgreementsDocument)

  // sort conditions so checkboxes will be placed first
  const sortedAgreements = data?.checkoutAgreements
    ? [...data.checkoutAgreements]?.sort((a, b) => {
        if (a?.mode === 'MANUAL') return -1
        if (b?.mode === 'MANUAL') return 1
        return 0
      })
    : []

  const form = useForm()

  const { handleSubmit, control } = form

  const submit = handleSubmit((values) => {
    // eslint-disable-next-line no-console
    console.log(values)
  })

  useFormCompose({ form, step, submit, key: 'PaymentAgreementsForm' })

  if (data?.checkoutAgreements?.length === 0) return null

  return (
    <FormDiv
      className={classes.form}
      sx={[(theme) => ({ pt: theme.spacings.md }), ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <FormPersist form={form} name='PaymentAgreementsForm' />
      <form noValidate onSubmit={submit} name='cartAgreements'>
        <Box className={classes.formInner} sx={{ typography: 'body1', display: 'inline-block' }}>
          {data?.checkoutAgreements &&
            sortedAgreements?.map((agreement) => {
              if (!agreement) return null
              const href = `/checkout/terms/${agreement.name?.toLowerCase().replace(/\s+/g, '-')}`
              const agreementTextParts = agreement.checkbox_text.split(agreement.name)

              return (
                <React.Fragment key={agreement.agreement_id}>
                  {agreement.mode === 'MANUAL' ? (
                    <CheckboxElement
                      control={control}
                      color='secondary'
                      formControl={{
                        sx: {
                          display: 'block',
                        },
                      }}
                      name={`agreement${agreement.agreement_id}`}
                      rules={{
                        required: i18n._(/* i18n */ 'You have to agree in order to proceed'),
                      }}
                      label={
                        agreement.checkbox_text.includes(agreement.name) ? (
                          <>
                            {agreementTextParts[0]}
                            <Link href={href} color='secondary' underline='hover'>
                              {agreement.name}
                            </Link>
                            {agreementTextParts[1]}
                          </>
                        ) : (
                          <Link href={href} color='secondary' underline='hover'>
                            {agreement.checkbox_text}
                          </Link>
                        )
                      }
                    />
                  ) : (
                    <Box className={classes.manualCheck} sx={{ padding: `9px 0` }}>
                      <Link href={href} color='secondary' underline='hover'>
                        {agreement.checkbox_text}
                      </Link>
                    </Box>
                  )}
                </React.Fragment>
              )
            })}
        </Box>
      </form>
    </FormDiv>
  )
}
