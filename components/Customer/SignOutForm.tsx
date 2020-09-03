import { useApolloClient } from '@apollo/client'
import { Button, makeStyles, Theme } from '@material-ui/core'
import { useMutationForm } from 'components/useMutationForm'
import { SignOutDocument, useCartQuery, useCustomerQuery } from 'generated/apollo'

const useStyles = makeStyles(
  (theme: Theme) => ({
    form: {
      display: 'grid',
      alignItems: 'center',
      gridRowGap: theme.spacings.sm,
      gridColumnGap: theme.spacings.xs,
      paddingBottom: theme.spacings.xs,
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
  { name: 'SignOut' },
)

export default function SignOutForm() {
  const client = useApolloClient()
  const { data: cart } = useCartQuery()
  const { data: customer } = useCustomerQuery()
  const classes = useStyles()
  const { onSubmit, result } = useMutationForm<GQLSignOutMutation, GQLSignOutMutationVariables>({
    mutation: SignOutDocument,
    onComplete: (data) => {
      if (!data.revokeCustomerToken?.result) throw Error('Could not sign out')

      if (cart?.cart) {
        client.cache.evict({ id: client.cache.identify(cart.cart), broadcast: true })
      }
      if (customer?.customer) {
        client.cache.evict({ id: client.cache.identify(customer.customer), broadcast: true })
      }
    },
  })

  return (
    <form onSubmit={onSubmit} noValidate className={classes.form}>
      <Button
        type='submit'
        disabled={result.loading}
        color='primary'
        variant='contained'
        size='large'
      >
        Sign out
      </Button>

      {!result.loading && result.error?.message && (
        <div className={classes.error}>{result.error?.message}</div>
      )}
    </form>
  )
}
