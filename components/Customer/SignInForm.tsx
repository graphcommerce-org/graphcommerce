import { useApolloClient } from '@apollo/client'
import { TextField, Button, makeStyles, Theme, Link } from '@material-ui/core'
import { useMutationForm, emailPattern } from 'components/useMutationForm'
import {
  CartDocument,
  CustomerCartDocument,
  CustomerDocument,
  MergeCartsDocument,
  SignInDocument,
} from 'generated/apollo'
import NextLink from 'next/link'

const useStyles = makeStyles(
  (theme: Theme) => ({
    form: {
      display: 'grid',
      alignItems: 'center',
      gridRowGap: theme.spacings.sm,
      gridColumnGap: theme.spacings.xs,
    },
    error: {
      color: theme.palette.error.main,
    },
    actions: {
      display: 'grid',
      gridTemplateColumns: 'auto auto',
      paddingBottom: theme.spacings.xs,
      '& :last-child': {
        textAlign: 'right',
      },
    },
  }),
  { name: 'SignIn' },
)

export default function SignInForm() {
  const classes = useStyles()
  const client = useApolloClient()
  const { register, errors, onSubmit, required, result } = useMutationForm<
    GQLSignInMutation,
    GQLSignInMutationVariables
  >({
    mutation: SignInDocument,
    onComplete: async (data) => {
      // Check succesfull login
      if (!data.generateCustomerToken?.token) return

      const awaitCustomerQuery = client.query<GQLCustomerQuery>({
        query: CustomerDocument,
        fetchPolicy: 'network-only',
      })
      const awaitCart = client.query<GQLCartQuery>({ query: CartDocument })
      const awaitCustomerCart = client.query<GQLCustomerCartQuery>({ query: CustomerCartDocument })

      const { data: customerCart, error } = await awaitCustomerCart

      if (!customerCart?.customerCart.id) {
        if (error) throw error
        else throw Error("Cart can't be initialized")
      }

      // Write the result of the customerCart to the cart query so it can be used
      client.cache.writeQuery<GQLCartQuery, GQLCartQueryVariables>({
        query: CartDocument,
        data: { cart: customerCart.customerCart },
        broadcast: true,
      })

      const { data: currentCart } = await awaitCart

      // Merge carts if a customer as a cart
      if (currentCart?.cart?.id && customerCart.customerCart.id !== currentCart.cart.id) {
        await client.mutate<GQLMergeCartsMutation, GQLMergeCartsMutationVariables>({
          mutation: MergeCartsDocument,
          variables: {
            sourceCartId: currentCart.cart.id,
            destinationCartId: customerCart.customerCart.id,
          },
        })
      }

      await awaitCustomerQuery
    },
  })

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
        inputRef={register({
          required: required.email,
          pattern: { value: emailPattern, message: 'Invalid email address' },
        })}
        helperText={errors?.email?.message}
        disabled={result.loading}
      />
      <TextField
        variant='filled'
        type='password'
        error={!!errors.password}
        id='password'
        name='password'
        label='Password'
        required={required.password}
        inputRef={register({ required: required.password })}
        helperText={errors?.password?.message}
        disabled={result.loading}
      />

      <Button
        type='submit'
        disabled={result.loading}
        color='primary'
        variant='contained'
        size='large'
      >
        Log in
      </Button>

      {!result.loading && result.error?.message && (
        <div className={classes.error}>{result.error?.message}</div>
      )}

      <div className={classes.actions}>
        {/* <NextLink href='/account/forgot' passHref> */}
        <Link>Forgot password? (todo)</Link>
        {/* </NextLink> */}
        <NextLink href='/account/create' passHref>
          <Link>Create a new account?</Link>
        </NextLink>
      </div>
    </form>
  )
}
