import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  makeStyles,
  MenuItem,
  TextField,
  Theme,
} from '@material-ui/core'
import useFormStyles from '@reachdigital/next-ui/AnimatedForm/useFormStyles'
import { Controller, useMutationForm } from '@reachdigital/next-ui/useMutationForm'
import clsx from 'clsx'
import { SignUpDocument, SignUpMutation, SignUpMutationVariables } from './SignUp.gql'
import onCompleteSignInUp from './onCompleteSignInUp'

type SignUpFormProps = {
  email?: string
}

const useStyles = makeStyles(
  (theme: Theme) => ({
    signUpForm: {
      paddingTop: 0,
    },
    submitBtn: {
      maxWidth: '50%',
      width: '100%',
      margin: '20px auto',
      display: 'block',
      borderRadius: theme.spacings.xs,
      '& > button': {
        maxWidth: 'unset',
        width: '100%',
      },
    },
  }),
  { name: 'SignUpForm' },
)

export default function SignUpForm(props: SignUpFormProps) {
  const { email } = props
  const formClasses = useFormStyles()
  const classes = useStyles()
  const mutationForm = useMutationForm<
    SignUpMutation,
    SignUpMutationVariables & { confirmPassword?: string }
  >(SignUpDocument, {
    defaultValues: {
      email,
    },
    onComplete: onCompleteSignInUp, // TODO: correct callback without cart dependency
  })
  const { register, errors, handleSubmit, required, watch, control, formState } = mutationForm

  return (
    <form onSubmit={handleSubmit} noValidate className={clsx(formClasses.form, classes.signUpForm)}>
      <div className={formClasses.formRow}>
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
            validate: (value) => value === watch('password') || "Passwords don't match",
          })}
          helperText={errors.confirmPassword?.message}
          disabled={formState.isSubmitting}
        />
      </div>
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

      <div className={formClasses.formRow}>
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
        id='isSubscribed'
        name='isSubscribed'
        control={<Checkbox color='primary' />}
        inputRef={register({
          required: required.isSubscribed,
        })}
        disabled={formState.isSubmitting}
        label='Subscribe to newsletter'
      />

      <FormControl className={classes.submitBtn}>
        <Button
          type='submit'
          disabled={formState.isSubmitting}
          variant='contained'
          color='primary'
          size='large'
        >
          Continue
        </Button>
        <FormHelperText error={!!errors.submission?.message}>
          {errors.submission?.message}
        </FormHelperText>
      </FormControl>
    </form>
  )
}
