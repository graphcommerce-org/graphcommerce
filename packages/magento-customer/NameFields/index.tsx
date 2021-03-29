import { MenuItem, TextField } from '@material-ui/core'
import InputCheckmark from '@reachdigital/next-ui/Form/InputCheckmark'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import { Controller, RegisterOptions, UseFormMethods } from '@reachdigital/react-hook-form/useForm'
import React from 'react'

type FieldOptions = Pick<RegisterOptions, 'required'> & { name: string }
type NameFieldsProps = Pick<UseFormMethods, 'register' | 'errors' | 'formState' | 'control'> & {
  disableFields: boolean
  fieldOptions: { prefix?: FieldOptions; firstname: FieldOptions; lastname: FieldOptions }
} & {
  validFields: Record<string, boolean>
}

export default function NameFields(props: NameFieldsProps) {
  const { errors, register, formState, disableFields, fieldOptions, control, validFields } = props
  const classes = useFormStyles()
  const required = Object.fromEntries(
    Object.values(fieldOptions).map((r) => [r?.name, r?.required]),
  )
  const checkIcon = <InputCheckmark />

  return (
    <>
      <div className={classes.formRow}>
        {fieldOptions.prefix && (
          <Controller
            defaultValue='Dhr.'
            control={control}
            name={fieldOptions?.prefix.name}
            render={({ onChange, name, value, onBlur }) => (
              <TextField
                variant='outlined'
                select
                error={!!errors[fieldOptions.prefix?.name ?? '']}
                id={fieldOptions.prefix?.name}
                name={name}
                label='Prefix'
                required={!!required.prefix}
                helperText={errors.prefix?.message}
                disabled={formState.isSubmitting}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                value={value}
                key='prefix'
                InputProps={{
                  endAdornment: validFields[fieldOptions.prefix?.name || 'prefix'] && checkIcon,
                }}
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

      <div className={classes.formRow} key='namefields-firstname-lastname'>
        <TextField
          variant='outlined'
          type='text'
          name={fieldOptions.firstname.name}
          label='First Name'
          key='firstname'
          required={!!required.firstname}
          inputRef={register({ required: required.firstname })}
          disabled={disableFields}
          error={!!errors[fieldOptions.firstname.name]}
          helperText={formState.isSubmitted && errors[fieldOptions.firstname.name]?.message}
          InputProps={{
            endAdornment: validFields[fieldOptions.firstname.name] && checkIcon,
          }}
        />
        <TextField
          variant='outlined'
          type='text'
          error={!!errors[fieldOptions.lastname.name]}
          name={fieldOptions.lastname.name}
          label='Last Name'
          key='lastname'
          required={!!required.lastname}
          inputRef={register({ required: required.lastname })}
          helperText={formState.isSubmitted && errors[fieldOptions.lastname.name]?.message}
          disabled={disableFields}
          InputProps={{
            endAdornment: validFields[fieldOptions.lastname.name] && checkIcon,
          }}
        />
      </div>
    </>
  )
}
