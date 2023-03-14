import { useQuery } from '@graphcommerce/graphql'
import { extendableComponent, FormDiv } from '@graphcommerce/next-ui'
import {
  Controller,
  useForm,
  useFormCompose,
  UseFormComposeOptions,
  useFormPersist,
} from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Link from '@mui/material/Link'
import { SxProps, Theme } from '@mui/material/styles'
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
    ? [...data.checkoutAgreements].sort((a, b) =>
        // eslint-disable-next-line no-nested-ternary
        a?.mode === 'MANUAL' ? -1 : b?.mode === 'MANUAL' ? 1 : 0,
      )
    : []

  const form = useForm()

  const { handleSubmit, formState, control } = form

  const submit = handleSubmit((values) => {
    // eslint-disable-next-line no-console
    console.log(values)
  })

  useFormPersist({ form, name: 'PaymentAgreementsForm' })

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
              return (
                <React.Fragment key={agreement.agreement_id}>
                  {agreement.mode === 'MANUAL' ? (
                    <Controller
                      defaultValue=''
                      name={`agreement[${agreement.agreement_id}]`}
                      control={control}
                      rules={{
                        required: i18n._(/* i18n */ 'You have to agree in order to proceed'),
                      }}
                      render={({
                        field: { onChange, value, name, ref, onBlur },
                        fieldState: { error },
                      }) => (
                        <FormControl
                          error={!!formState.errors[String(agreement.agreement_id)]}
                          className={classes.formControlRoot}
                          sx={{ display: 'block' }}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                color='secondary'
                                required
                                checked={!!value}
                                name={name}
                                inputRef={ref}
                                onBlur={onBlur}
                                onChange={(e) => onChange(e)}
                              />
                            }
                            label={
                              <Link href={href} color='secondary' underline='hover'>
                                {agreement.checkbox_text}
                              </Link>
                            }
                          />
                          {error?.message && <FormHelperText error>{error.message}</FormHelperText>}
                        </FormControl>
                      )}
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
