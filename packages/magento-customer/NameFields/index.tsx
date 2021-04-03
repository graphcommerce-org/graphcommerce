import { MenuItem, TextField } from '@material-ui/core'
import { Maybe } from '@reachdigital/magento-graphql'
import InputCheckmark from '@reachdigital/next-ui/Form/InputCheckmark'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import { Controller, UseFormReturn } from '@reachdigital/react-hook-form/useForm'
import { assertFormGqlOperation } from '@reachdigital/react-hook-form/useFormGqlMutation'
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
  const { disabled, prefix, form } = props
  assertFormGqlOperation<NameFieldValues>(form)

  const { control, formState, muiRegister, required, valid } = form
  const classes = useFormStyles()
  const checkIcon = <InputCheckmark />

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
                InputProps={{ endAdornment: valid.prefix && checkIcon }}
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
          InputProps={{ endAdornment: valid.firstname && checkIcon }}
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
          InputProps={{ endAdornment: valid.lastname && checkIcon }}
          {...muiRegister('lastname', { required: required?.lastname })}
        />
      </div>
    </>
  )
}
