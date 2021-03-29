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
  const { register, errors, handleSubmit, required, watch, control, formState, error } = form
  const [remainingError, inputError] = graphqlErrorByCategory('graphql-input', error)

  const submitHandler = handleSubmit(() => {})

  return (
    <form onSubmit={submitHandler} noValidate>
      <div className={classes.formRow}>
        <TextField
          variant='outlined'
          type='password'
          error={!!errors.password || !!inputError}
          id='signup-password'
          name='password'
          label='Password'
          required={required.password}
          inputRef={register({
            required: required.password,
            minLength: { value: 8, message: 'Password must have at least 8 characters' },
          })}
          helperText={
            errors.password?.message ||
            inputError?.message ||
            'At least 8 characters long, must contain a symbol'
          }
          disabled={formState.isSubmitting}
        />
        <TextField
          variant='outlined'
          type='password'
          error={!!errors.confirmPassword}
          id='confirmPassword'
          name='confirmPassword'
          label='Confirm Password'
          required
          inputRef={register({
            required: true,
            validate: (value) => value === watch('password') || "Passwords don't match",
          })}
          helperText={errors.confirmPassword?.message}
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
              error={!!errors.prefix}
              id='prefix'
              name={name}
              label='Prefix'
              required={required.prefix}
              helperText={errors.prefix?.message}
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
          error={!!errors.firstname}
          id='firstname'
          name='firstname'
          label='First Name'
          required={required.firstname}
          inputRef={register({ required: required.firstname })}
          helperText={errors.firstname?.message}
          disabled={formState.isSubmitting}
        />
        <TextField
          variant='outlined'
          type='text'
          error={!!errors.lastname}
          id='lastname'
          name='lastname'
          label='Last Name'
          required={required.lastname}
          inputRef={register({ required: required.lastname })}
          helperText={errors.lastname?.message}
          disabled={formState.isSubmitting}
        />
      </div>

      <FormControlLabel
        control={<Switch color='primary' />}
        name='isSubscribed'
        inputRef={register({ required: required.isSubscribed })}
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
