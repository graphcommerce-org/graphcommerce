import { useQuery } from '@apollo/client'
import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@material-ui/core'
import { FormDiv, FormRow } from '@reachdigital/next-ui'
import {
  Controller,
  useForm,
  useFormCompose,
  UseFormComposeOptions,
} from '@reachdigital/react-hook-form'
import React from 'react'
import { CheckoutAgreementsDocument } from '../../queries/CheckoutAgreements.gql'

type PaymentAgreementsFormProps = Pick<UseFormComposeOptions, 'step'>

export default function PaymentAgreementsForm(props: PaymentAgreementsFormProps) {
  const { step } = props
  const { loading, data } = useQuery(CheckoutAgreementsDocument)

  // sort conditions so checkboxes will be placed on top
  const sortedAgreements = data?.checkoutAgreements
    ? [...data.checkoutAgreements].sort((a, b) => {
        return a.mode === 'MANUAL' ? -1 : b.mode === 'MANUAL' ? 1 : 0
      })
    : []

  const form = useForm({
    mode: 'onSubmit',
    defaultValues: Object.fromEntries(
      //   data?.checkoutAgreements
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
        <>
          {data?.checkoutAgreements &&
            sortedAgreements?.map(
              (agreement) =>
                agreement && (
                  <FormRow key={'agreement-' + String(agreement.agreement_id)}>
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
                                control={<Checkbox color='primary' required={true} />}
                                label={agreement.checkbox_text}
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
                      <i>{agreement.checkbox_text ?? ''}</i>
                    )}
                  </FormRow>
                ),
            )}
        </>
      </form>
    </FormDiv>
  )
}
