import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  TextField,
  Switch,
} from '@material-ui/core'
import useFormStyles from '@reachdigital/next-ui/AnimatedForm/useFormStyles'
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
  const submitHandler = handleSubmit(() => {})

  console.log(errors)

  return (
    <form onSubmit={submitHandler} noValidate>
      <div className={classes.formRow}>
        <TextField
          variant='outlined'
          type='password'
          error={!!errors.password}
          id='password'
          name='password'
          label='Password'
          required={required.password}
          inputRef={register({ required: required.password })}
          helperText={errors.password?.message}
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
            validate: (value) => value === watch('password') || "Paswords don't match",
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

      <div className={classes.formRow}>
        <FormControl>
          <Button
            type='submit'
            disabled={formState.isSubmitting}
            variant='contained'
            color='primary'
            size='large'
            className={classes.submitButton}
          >
            Continue
          </Button>
          <FormHelperText error={!!error?.message}>{error?.message}</FormHelperText>
        </FormControl>
      </div>
    </form>
  )
}
