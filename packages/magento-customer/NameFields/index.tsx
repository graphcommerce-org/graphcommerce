import { TextField } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import { RegisterOptions, UseFormMethods } from '@reachdigital/react-hook-form/useForm'
import React from 'react'

type FieldOptions = Pick<RegisterOptions, 'required'> & { name: string }
type NameFieldsProps = Pick<UseFormMethods, 'register' | 'errors' | 'formState'> & {
  disableFields: boolean
  fieldOptions: { [key: string]: FieldOptions }
}

export default function NameFields(props: NameFieldsProps) {
  const { errors, register, formState, disableFields, fieldOptions } = props
  const classes = useFormStyles()
  const required = Object.fromEntries(Object.values(fieldOptions).map((r) => [r.name, r.required]))

  return (
    <>
      <TextField
        variant='outlined'
        type='text'
        name={fieldOptions.firstname.name}
        label='First Name'
        required={!!required.firstname}
        inputRef={register({ required: required.firstname })}
        disabled={disableFields}
        error={!!errors[fieldOptions.firstname.name]}
        helperText={formState.isSubmitted && errors[fieldOptions.firstname.name]?.message}
        InputProps={{
          endAdornment: !errors[fieldOptions.firstname.name] && (
            <CheckIcon className={classes.checkmark} />
          ),
        }}
      />
      <TextField
        variant='outlined'
        type='text'
        error={!!errors[fieldOptions.lastname.name]}
        name={fieldOptions.lastname.name}
        label='Last Name'
        required={!!required.lastname}
        inputRef={register({ required: required.lastname })}
        helperText={formState.isSubmitted && errors[fieldOptions.lastname.name]?.message}
        disabled={disableFields}
        InputProps={{
          endAdornment: !errors[fieldOptions.lastname.name] && (
            <CheckIcon className={classes.checkmark} />
          ),
        }}
      />
    </>
  )
}
