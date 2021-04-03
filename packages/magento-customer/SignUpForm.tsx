import { FormControlLabel, MenuItem, Switch, TextField } from '@material-ui/core'
import graphqlErrorByCategory from '@reachdigital/magento-graphql/graphqlErrorByCategory'
import Button from '@reachdigital/next-ui/Button'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import { Controller } from '@reachdigital/react-hook-form/useForm'
import useFormGqlMutation from '@reachdigital/react-hook-form/useFormGqlMutation'
import useFormPersist from '@reachdigital/react-hook-form/useFormPersist'
import React from 'react'
import { SignUpDocument, SignUpMutation, SignUpMutationVariables } from './SignUp.gql'
import onCompleteSignInUp from './onCompleteSignInUp'

type SignUpFormProps = {
  email?: string
}

export default function SignUpForm(props: SignUpFormProps) {
  const { email } = props
  const classes = useFormStyles()
  const form = useFormGqlMutation<
    SignUpMutation,
    SignUpMutationVariables & { confirmPassword?: string }
  >(SignUpDocument, {
    defaultValues: { email },
    onComplete: onCompleteSignInUp,
  })
  useFormPersist({ form, name: 'SignUp', exclude: ['password', 'confirmPassword'] })
  const { muiRegister, handleSubmit, required, watch, control, formState, error } = form
  const [remainingError, inputError] = graphqlErrorByCategory('graphql-input', error)

  const submitHandler = handleSubmit(() => {})

  return (
    <form onSubmit={submitHandler} noValidate>
      <div className={classes.formRow}>
        <TextField
          variant='outlined'
          type='password'
          error={!!formState.errors.password || !!inputError}
          label='Password'
          required={required.password}
          {...muiRegister('password', {
            required: required.password,
            minLength: { value: 8, message: 'Password must have at least 8 characters' },
          })}
          helperText={
            formState.errors.password?.message ||
            inputError?.message ||
            'At least 8 characters long, must contain a symbol'
          }
          disabled={formState.isSubmitting}
        />
        <TextField
          variant='outlined'
          type='password'
          error={!!formState.errors.confirmPassword}
          label='Confirm Password'
          required
          {...muiRegister('confirmPassword', {
            required: true,
            validate: (value) => value === watch('password') || "Passwords don't match",
          })}
          helperText={formState.errors.confirmPassword?.message}
          disabled={formState.isSubmitting}
        />
      </div>
      <div className={classes.formRow}>
        <Controller
          defaultValue='Dhr.'
          control={control}
          name='prefix'
          render={({ onChange, name, value, onBlur }) => (
            <TextField
              variant='outlined'
              select
              error={!!formState.errors.prefix}
              name={name}
              label='Prefix'
              required={required.prefix}
              helperText={formState.errors.prefix?.message}
              disabled={formState.isSubmitting}
              onChange={(e) => onChange(e.target.value)}
              onBlur={onBlur}
              value={value}
            >
              {['Dhr.', 'Mevr.'].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </div>

      <div className={classes.formRow}>
        <TextField
          variant='outlined'
          type='text'
          error={!!formState.errors.firstname}
          label='First Name'
          required={required.firstname}
          {...muiRegister('firstname', { required: required.firstname })}
          helperText={formState.errors.firstname?.message}
          disabled={formState.isSubmitting}
        />
        <TextField
          variant='outlined'
          type='text'
          error={!!formState.errors.lastname}
          label='Last Name'
          required={required.lastname}
          {...muiRegister('lastname', { required: required.lastname })}
          helperText={formState.errors.lastname?.message}
          disabled={formState.isSubmitting}
        />
      </div>

      <FormControlLabel
        control={<Switch color='primary' />}
        {...muiRegister('isSubscribed', { required: required.isSubscribed })}
        disabled={formState.isSubmitting}
        label='Subscribe to newsletter'
      />

      <ApolloErrorAlert error={remainingError} />

      <div className={classes.actions}>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          size='large'
          loading={formState.isSubmitting}
        >
          Create Account
        </Button>
      </div>
    </form>
  )
}
