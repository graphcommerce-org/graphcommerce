import { useApolloClient } from '@apollo/client'
import { TextField, Button, makeStyles, Theme, MenuItem } from '@material-ui/core'
import { useMutationForm, emailPattern } from 'components/useMutationForm'
import { CreateCustomerDocument, IsEmailAvailableDocument } from 'generated/apollo'
import useSignedOutGuard from './useSignedOutGuard'

const useStyles = makeStyles(
  (theme: Theme) => ({
    form: {
      display: 'grid',
      gridTemplateAreas: `
        "email email ."
        "prefix . ."
        "firstname middlename lastname"
        "password confirmPassword ."
        "submit error error"
      `,
      alignItems: 'center',
      gridTemplateColumns: 'repeat(3, 1fr)',
      // gridTemplateRows: '1fr 1fr 1fr',

      gridRowGap: theme.spacings.sm,
      gridColumnGap: theme.spacings.xs,
    },
    email: { gridArea: 'email' },
    prefix: { gridArea: 'prefix' },
    firstname: { gridArea: 'firstname' },
    middlename: { gridArea: 'middlename' },
    lastname: { gridArea: 'lastname' },
    suffix: { gridArea: 'suffix' },
    password: { gridArea: 'password' },
    confirmPassword: { gridArea: 'confirmPassword' },
    submit: { gridArea: 'submit' },
    error: {
      gridArea: 'error',
      color: theme.palette.error.main,
    },
  }),
  { name: 'CreateCustomer' },
)

export default function CreateCustomerForm() {
  const classes = useStyles()
  const client = useApolloClient()
  const { register, errors, onSubmit, required, result, watch } = useMutationForm<
    GQLCreateCustomerMutation,
    GQLCreateCustomerMutationVariables & { confirmPassword: string }
  >({ mutation: CreateCustomerDocument })

  return (
    <form onSubmit={onSubmit} noValidate className={classes.form}>
      <TextField
        variant='filled'
        type='text'
        error={!!errors.email}
        id='email'
        name='email'
        label='Email'
        required={required.email}
        className={classes.email}
        inputRef={register({
          required: required.email,
          pattern: { value: emailPattern, message: 'Invalid email address' },
          validate: async (email) => {
            const { data } = await client.query<
              GQLIsEmailAvailableQuery,
              GQLIsEmailAvailableQueryVariables
            >({ query: IsEmailAvailableDocument, variables: { email } })

            return (
              Boolean(data?.isEmailAvailable?.is_email_available) ||
              'Email address is not available'
            )
          },
        })}
        helperText={errors.email?.message}
        disabled={result.loading}
      />

      <TextField
        variant='filled'
        select
        error={!!errors.prefix}
        id='prefix'
        name='prefix'
        label='Prefix'
        required={required.prefix}
        className={classes.prefix}
        inputRef={register({ required: required.prefix })}
        helperText={errors.prefix?.message}
        disabled={result.loading}
      >
        <MenuItem value={undefined} />
        {['Dhr.', 'Mevr.'].map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        variant='filled'
        type='text'
        error={!!errors.firstname}
        id='firstname'
        name='firstname'
        label='First Name'
        required={required.firstname}
        className={classes.firstname}
        inputRef={register({ required: required.firstname })}
        helperText={errors.firstname?.message}
        disabled={result.loading}
      />

      <TextField
        variant='filled'
        type='text'
        error={!!errors.middlename}
        id='middlename'
        name='middlename'
        label='Middle Name'
        required={required.middlename}
        className={classes.middlename}
        inputRef={register({ required: required.middlename })}
        helperText={errors.middlename?.message}
        disabled={result.loading}
      />

      <TextField
        variant='filled'
        type='text'
        error={!!errors.lastname}
        id='lastname'
        name='lastname'
        label='Last Name'
        required={required.lastname}
        className={classes.lastname}
        inputRef={register({ required: required.lastname })}
        helperText={errors.lastname?.message}
        disabled={result.loading}
      />

      {/* <TextField
          variant='filled'
          type='text'
          // inputProps={{ className: classes.quantityInput, min: 1 }}
          error={!!errors.suffix}
          id='suffix'
          name='suffix'
          label='Suffix'
          required={required.suffix}
          className={classes.suffix}
          inputRef={register({ required: required.suffix })}
          helperText={errors.suffix?.message}
          disabled={result.loading}
        /> */}

      <TextField
        variant='filled'
        type='password'
        // inputProps={{ className: classes.quantityInput, min: 1 }}
        error={!!errors.password}
        id='password'
        name='password'
        label='Password'
        required={required.password}
        className={classes.password}
        inputRef={register({ required: required.password })}
        helperText={errors.password?.message}
        disabled={result.loading}
      />

      <TextField
        variant='filled'
        type='password'
        error={!!errors.confirmPassword}
        id='confirmPassword'
        className={classes.confirmPassword}
        name='confirmPassword'
        label='Confirm Password'
        required
        inputRef={register({
          required: true,
          validate: (value) => value === watch('password') || "Paswords don't match",
        })}
        helperText={errors.confirmPassword?.message}
        disabled={result.loading}
      />

      <Button
        type='submit'
        disabled={result.loading}
        className={classes.submit}
        variant='contained'
        color='primary'
        size='large'
      >
        Submit
      </Button>

      {result.error?.message && <div className={classes.error}>{result.error?.message}</div>}
    </form>
  )
}
