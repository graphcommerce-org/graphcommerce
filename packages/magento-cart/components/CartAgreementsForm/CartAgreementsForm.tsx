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
import { Box, Link, SxProps, Theme, Typography } from '@mui/material'
import React from 'react'
import { CartAgreementsDocument } from './CartAgreements.gql'

export type CartAgreementsFormProps = Pick<UseFormComposeOptions, 'step'> & { sx?: SxProps<Theme> }

const componentName = 'CartAgreementsForm' as const
const parts = ['form', 'formInner', 'formControlRoot', 'manualCheck'] as const
const { classes } = extendableComponent(componentName, parts)

/**
 * Checks if a string contains an anchor tag (<a> ... </a>).
 * @param {string} str - The string to check.
 * @returns {boolean} - True if the string contains an anchor tag, otherwise false.
 */
const containsAnchorTag = (str: string): boolean => {
  const anchorTagRegex = /<a\s+[^>]*>(.*?)<\/a>/i
  return anchorTagRegex.test(str)
}

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
      <form noValidate onSubmit={submit} name='cartAgreements'>
        <Box className={classes.formInner} sx={{ typography: 'body1', display: 'inline-block' }}>
          {data?.checkoutAgreements &&
            sortedAgreements?.map((agreement) => {
              if (!agreement) return null
              const href = `/checkout/terms/${agreement.name?.toLowerCase().replace(/\s+/g, '-')}`
              const agreementTextParts = agreement.checkbox_text.split(agreement.name)
              // check if the agreement text contains an anchor tag
              const containsLink = containsAnchorTag(agreement.checkbox_text)
              let labelContent: React.ReactNode

              if (containsLink) {
                labelContent = (
                  <Typography
                    dangerouslySetInnerHTML={{ __html: agreement.checkbox_text }}
                    sx={{
                      '& a': {
                        color: 'secondary.main',
                        textDecoration: 'none',
                        '&:hover, &:focus, &:active': {
                          textDecoration: 'underline',
                        },
                      },
                    }}
                  />
                )
              } else if (
                agreement.mode === 'MANUAL' &&
                agreement.checkbox_text.includes(agreement.name)
              ) {
                labelContent = (
                  <>
                    {agreementTextParts[0]}
                    <Link href={href} color='secondary' underline='hover'>
                      {agreement.name}
                    </Link>
                    {agreementTextParts[1]}
                  </>
                )
              } else {
                labelContent = (
                  <Link href={href} color='secondary' underline='hover'>
                    {agreement.checkbox_text}
                  </Link>
                )
              }

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
                      label={labelContent}
                    />
                  ) : (
                    <Box className={classes.manualCheck} sx={{ padding: `9px 0` }}>
                      {labelContent}
                    </Box>
                  )}
                </React.Fragment>
              )
            })}
        </Box>
      </form>
      <FormPersist form={form} name='PaymentAgreementsForm' />
    </FormDiv>
  )
}
