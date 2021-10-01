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
  form: UseFormReturn<any>
  readOnly?: boolean
  prefix?: boolean
}

export default function NameFields(props: NameFieldProps) {
  const { prefix, form, readOnly } = props
  assertFormGqlOperation<NameFieldValues>(form)

  const { control, formState, muiRegister, required, valid } = form

  return (
    <>
      <FormRow>
        {prefix && (
          <Controller
            defaultValue='Dhr.'
            control={control}
            name='prefix'
            render={({ field: { ref, onChange, ...field }, fieldState }) => (
              <TextField
                variant='outlined'
                select
                error={!!fieldState.error}
                label='Prefix'
                required={!!required?.prefix}
                helperText={fieldState.error?.message}
                onChange={(e) => onChange(e.target.value)}
                inputRef={ref}
                InputProps={{
                  readOnly,
                  endAdornment: <InputCheckmark show={valid.prefix} />,
                }}
                {...field}
              >
                {['Dhr.', 'Mevr.'].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        )}
      </FormRow>

      <FormRow>
        <TextField
          variant='outlined'
          type='text'
          label='First Name'
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
          label='Last Name'
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
