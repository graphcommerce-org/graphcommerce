import { useApolloClient } from '@graphcommerce/graphql'
import Button from '@mui/material/Button'
import { CurrentCartIdDocument } from '../../hooks/CurrentCartId.gql'

export function CartDebugger() {
  const client = useApolloClient()

  return (
    <div style={{ position: 'fixed', bottom: 0, right: 0, zIndex: 1, opacity: 0.3 }}>
      <Button
        type='button'
        variant='text'
        size='small'
        onClick={() => {
          const currentCardId = client.readQuery({ query: CurrentCartIdDocument })
          if (!currentCardId?.currentCartId) {
            // eslint-disable-next-line no-console
            console.log('No customerToken available, nothing to break')
          } else {
            // eslint-disable-next-line no-console
            console.log(`Changing current token to a random one`)

            client.writeQuery({
              query: CurrentCartIdDocument,
              data: {
                currentCartId: {
                  ...currentCardId.currentCartId,
                  id: `${Math.random().toString(36).slice(2)}random-cardId`,
                },
              },
              broadcast: true,
            })
          }
        }}
      >
        break cart
      </Button>
    </div>
  )
}
