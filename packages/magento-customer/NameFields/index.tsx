import { MenuItem, TextField } from '@material-ui/core'
import InputCheckmark from '@reachdigital/next-ui/Form/InputCheckmark'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import { Controller, UseFormReturn, assertFormGqlOperation } from '@reachdigital/react-hook-form'
import React from 'react'

type NameFieldValues = {
  firstname?: string
  lastname?: string
  prefix?: string
}

type NameFieldProps = {
  form: UseFormReturn<any>
  disabled?: boolean
  prefix?: boolean
}

export default function NameFields(props: NameFieldProps) {
  const { prefix, form, disabled: _disabled } = props
  assertFormGqlOperation<NameFieldValues>(form)

  const { control, formState, muiRegister, required, valid } = form
  const classes = useFormStyles()

  const disabled = _disabled ?? formState.isSubmitting

  return (
    <>
      <div className={classes.formRow}>
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
                disabled={disabled}
                onChange={(e) => onChange(e.target.value)}
                inputRef={ref}
                InputProps={{ endAdornment: <InputCheckmark show={valid.prefix} /> }}
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
      </div>

      <div className={classes.formRow}>
        <TextField
          variant='outlined'
          type='text'
          label='First Name'
          required={!!required}
          disabled={disabled}
          error={!!formState.errors.firstname}
          helperText={formState.isSubmitted && formState.errors.firstname?.message}
          InputProps={{ endAdornment: <InputCheckmark show={valid.firstname} /> }}
          {...muiRegister('firstname', { required: required?.firstname })}
        />
        <TextField
          variant='outlined'
          type='text'
          error={!!formState.errors.lastname}
          label='Last Name'
          required={!!required?.lastname}
          helperText={formState.isSubmitted && formState.errors.lastname?.message}
          disabled={disabled}
          InputProps={{ endAdornment: <InputCheckmark show={valid.lastname} /> }}
          {...muiRegister('lastname', { required: required?.lastname })}
        />
      </div>
    </>
  )
}
