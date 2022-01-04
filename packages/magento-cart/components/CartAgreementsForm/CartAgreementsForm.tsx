import { useQuery } from '@apollo/client'
import { FormDiv } from '@graphcommerce/next-ui'
import {
  Controller,
  useForm,
  useFormCompose,
  UseFormComposeOptions,
  useFormPersist,
} from '@graphcommerce/react-hook-form'
import { t } from '@lingui/macro'
import { Checkbox, FormControl, FormControlLabel, FormHelperText, Link, Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import PageLink from 'next/link'
import React from 'react'
import { CartAgreementsDocument } from './CartAgreements.gql'

export type CartAgreementsFormProps = Pick<UseFormComposeOptions, 'step'>

const useStyles = makeStyles(
  (theme: Theme) => ({
    formDiv: {
      paddingTop: theme.spacings.sm,
    },
    formInner: {
      ...theme.typography.body1,
      display: 'inline-block',
    },
    formControlRoot: {
      display: 'block',
    },
    manualCheck: {
      padding: `9px 0`,
    },
  }),
  {
    name: 'CartAgreements',
  },
)

export default function CartAgreementsForm(props: CartAgreementsFormProps) {
  const { step } = props
  const { data } = useQuery(CartAgreementsDocument)
  const classes = useStyles()

  // sort conditions so checkboxes will be placed first
  const sortedAgreements = data?.checkoutAgreements
    ? [...data.checkoutAgreements].sort((a, b) =>
        a?.mode === 'MANUAL' ? -1 : b?.mode === 'MANUAL' ? 1 : 0,
      )
    : []

  const form = useForm({ mode: 'onChange' })

  const { handleSubmit, formState, control } = form

  const submit = handleSubmit(() => {})

  useFormPersist({ form, name: 'PaymentAgreementsForm' })

  useFormCompose({ form, step, submit, key: 'PaymentAgreementsForm' })

  return (
    <FormDiv classes={{ root: classes.formDiv }}>
      <form noValidate onSubmit={submit} name='cartAgreements'>
        <div className={classes.formInner}>
          {data?.checkoutAgreements &&
            sortedAgreements?.map((agreement) => {
              if (!agreement) return null
              const href = `/checkout/terms/${agreement.name?.toLowerCase().replace(/\s+/g, '-')}`
              return (
                <React.Fragment key={agreement.agreement_id}>
                  {agreement.mode === 'MANUAL' ? (
                    <Controller
                      defaultValue=''
                      name={String(agreement.agreement_id)}
                      control={control}
                      rules={{ required: t`You have to agree in order to proceed` }}
                      render={({
                        field: { onChange, value, name, ref, onBlur },
                        fieldState: { error },
                      }) => (
                        <FormControl
                          error={!!formState.errors[String(agreement.agreement_id)]}
                          classes={{ root: classes.formControlRoot }}
                        >
                          <FormControlLabel
                            control={<Checkbox color='secondary' required />}
                            label={
                              <PageLink href={href} passHref>
                                <Link color='secondary'>{agreement.checkbox_text}</Link>
                              </PageLink>
                            }
                            checked={!!value}
                            inputRef={ref}
                            onBlur={onBlur}
                            name={name}
                            onChange={(e) => onChange(e as React.ChangeEvent<HTMLInputElement>)}
                          />
                          {error?.message && <FormHelperText>{error.message}</FormHelperText>}
                        </FormControl>
                      )}
                    />
                  ) : (
                    <div className={classes.manualCheck}>
                      <PageLink href={href} passHref>
                        <Link color='secondary'>{agreement.checkbox_text}</Link>
                      </PageLink>
                    </div>
                  )}
                </React.Fragment>
              )
            })}
        </div>
      </form>
    </FormDiv>
  );
}
