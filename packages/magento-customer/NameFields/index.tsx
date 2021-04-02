import { MenuItem, TextField } from '@material-ui/core'
import InputCheckmark from '@reachdigital/next-ui/Form/InputCheckmark'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import { Controller, UseFormMethods } from '@reachdigital/react-hook-form/useForm'
import React from 'react'

type RequiredFields = 'firstname' | 'lastname'
type OptionalFields = 'prefix'
type Fields = Record<RequiredFields, string> & Partial<Record<OptionalFields, string>>
type Required = Record<RequiredFields, boolean> & Partial<Record<OptionalFields, boolean>>

type NameFieldsProps = Fields & {
  form: UseFormMethods
  disabled?: boolean
  required?: Required
  validFields: Partial<Record<RequiredFields | OptionalFields, boolean>>
}

export default function NameFields(props: NameFieldsProps) {
  const { form, disabled, required, prefix, firstname, lastname, validFields } = props
  const { errors, register, formState, control } = form
  const classes = useFormStyles()
  const checkIcon = <InputCheckmark />

  return (
    <>
      <div className={classes.formRow}>
        {prefix && (
          <Controller
            defaultValue='Dhr.'
            control={control}
            name={prefix}
            render={({ onChange, name, value, onBlur }) => (
              <TextField
                variant='outlined'
                select
                error={!!errors[prefix]}
                name={name}
                label='Prefix'
                required={!!required?.prefix}
                helperText={errors.prefix?.message}
                disabled={disabled}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                value={value}
                InputProps={{ endAdornment: validFields[prefix] && checkIcon }}
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
          name={firstname}
          label='First Name'
          required={!!required}
          inputRef={register({ required: required?.firstname })}
          disabled={disabled}
          error={!!errors[firstname]}
          helperText={formState.isSubmitted && errors[firstname]?.message}
          InputProps={{ endAdornment: validFields[firstname] && checkIcon }}
        />
        <TextField
          variant='outlined'
          type='text'
          error={!!errors[lastname]}
          name={lastname}
          label='Last Name'
          required={!!required?.lastname}
          inputRef={register({ required: required?.lastname })}
          helperText={formState.isSubmitted && errors[lastname]?.message}
          disabled={disabled}
          InputProps={{ endAdornment: validFields[lastname] && checkIcon }}
        />
      </div>
    </>
  )
}
