import { t, Trans } from '@graphcommerce/lingui-next'
import { FormRow, InputCheckmark } from '@graphcommerce/next-ui'
import { assertFormGqlOperation, Controller, UseFormReturn } from '@graphcommerce/react-hook-form'
import { MenuItem, TextField } from '@mui/material'
import React from 'react'

type NameFieldValues = {
  firstname?: string
  lastname?: string
  prefix?: string
}

type NameFieldProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>
  readOnly?: boolean
  prefix?: boolean
  prefixes?: string[]
}

export function NameFields(props: NameFieldProps) {
  const { prefix, form, readOnly, prefixes = [t`Mr`, t`Mrs`, t`Other`] } = props
  assertFormGqlOperation<NameFieldValues>(form)

  const { control, formState, muiRegister, required, valid } = form

  return (
    <>
      {prefix && (
        <FormRow>
          <Controller
            defaultValue={prefixes[0]}
            control={control}
            name='prefix'
            render={({ field: { ref, onChange, ...field }, fieldState }) => (
              <TextField
                variant='outlined'
                select
                error={!!fieldState.error}
                label={<Trans>Prefix</Trans>}
                required={!!required?.prefix}
                helperText={fieldState.error?.message}
                onChange={(e) => onChange(e.target.value)}
                inputRef={ref}
                InputProps={{
                  readOnly,
                  endAdornment: <InputCheckmark show={valid.prefix} select />,
                }}
                {...field}
              >
                {prefixes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </FormRow>
      )}

      <FormRow>
        <TextField
          variant='outlined'
          type='text'
          label={<Trans>First Name</Trans>}
          required={!!required}
          error={!!formState.errors.firstname}
          helperText={formState.isSubmitted && formState.errors.firstname?.message}
          InputProps={{
            readOnly,
            endAdornment: <InputCheckmark show={valid.firstname} />,
          }}
          {...muiRegister('firstname', { required: required?.firstname })}
        />
        <TextField
          variant='outlined'
          type='text'
          error={!!formState.errors.lastname}
          label={<Trans>Last Name</Trans>}
          required={!!required?.lastname}
          helperText={formState.isSubmitted && formState.errors.lastname?.message}
          InputProps={{
            readOnly,
            endAdornment: <InputCheckmark show={valid.lastname} />,
          }}
          {...muiRegister('lastname', { required: required?.lastname })}
        />
      </FormRow>
    </>
  )
}
