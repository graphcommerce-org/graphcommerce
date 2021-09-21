import { useQuery } from '@apollo/client'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Link,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import { FormDiv } from '@reachdigital/next-ui'
import {
  Controller,
  useForm,
  useFormCompose,
  UseFormComposeOptions,
} from '@reachdigital/react-hook-form'
import PageLink from 'next/link'
import React from 'react'
import { CheckoutAgreementsDocument } from '../../queries/CheckoutAgreements.gql'

type PaymentAgreementsFormProps = Pick<UseFormComposeOptions, 'step'>

const useStyles = makeStyles(
  (theme: Theme) => ({
    formInner: {
      display: 'grid',
    },
  }),
  {
    name: 'PaymentAgreementsForm',
  },
)

export default function PaymentAgreementsForm(props: PaymentAgreementsFormProps) {
  const { step } = props
  const { data } = useQuery(CheckoutAgreementsDocument)
  const classes = useStyles()

  // sort conditions so checkboxes will be placed first
  const sortedAgreements = data?.checkoutAgreements
    ? [...data.checkoutAgreements].sort((a, b) => {
        return a?.mode === 'MANUAL' ? -1 : b?.mode === 'MANUAL' ? 1 : 0
      })
    : []

  const form = useForm({
    mode: 'onSubmit',
    defaultValues: Object.fromEntries(
      sortedAgreements
        ?.filter((am) => am?.mode === 'MANUAL')
        .map((am) => [String(am?.agreement_id), false]) ?? [],
    ),
  })

  const { handleSubmit, formState, control } = form

  const submit = handleSubmit(() => {})

  useFormCompose({ form, step, submit, key: 'PaymentAgreementsForm' })

  return (
    <FormDiv>
      <form noValidate onSubmit={submit}>
        <div className={classes.formInner}>
          {data?.checkoutAgreements &&
            sortedAgreements?.map(
              (agreement) =>
                agreement && (
                  <>
                    {agreement.mode === 'MANUAL' ? (
                      <>
                        <Controller
                          name={String(agreement.agreement_id)}
                          control={control}
                          rules={{ required: 'You have to agree in order to proceed' }}
                          render={({
                            field: { onChange, value, name, ref, onBlur },
                            fieldState: { error },
                          }) => (
                            <FormControl error={!!formState.errors[String(agreement.agreement_id)]}>
                              <FormControlLabel
                                control={<Checkbox color='secondary' required={true} />}
                                label={
                                  <>
                                    {agreement.checkbox_text}{' '}
                                    <PageLink
                                      href={`/legal/view/${agreement.name
                                        ?.toLowerCase()
                                        .replaceAll(' ', '-')}`}
                                      passHref
                                    >
                                      <Link color='secondary'>(open)</Link>
                                    </PageLink>
                                  </>
                                }
                                checked={value}
                                inputRef={ref}
                                onBlur={onBlur}
                                name={name}
                                onChange={(e) =>
                                  onChange(
                                    (e as React.ChangeEvent<HTMLInputElement>).target.checked,
                                  )
                                }
                              />
                              {error && (
                                <>
                                  {error.message ? (
                                    <FormHelperText>{error.message}</FormHelperText>
                                  ) : (
                                    <FormHelperText>Required</FormHelperText>
                                  )}
                                </>
                              )}
                            </FormControl>
                          )}
                        />
                      </>
                    ) : (
                      <Typography component='span' variant='body1'>
                        {agreement.checkbox_text ?? ''}{' '}
                        <PageLink
                          href={`/legal/view/${agreement.name?.toLowerCase().replaceAll(' ', '-')}`}
                          passHref
                        >
                          <Link color='secondary'>(open)</Link>
                        </PageLink>
                      </Typography>
                    )}
                  </>
                ),
            )}
        </div>
      </form>
    </FormDiv>
  )
}
