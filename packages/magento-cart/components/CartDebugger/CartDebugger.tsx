import { useApolloClient } from '@graphcommerce/graphql'
import { Button } from '@mui/material'
import { readCartId, writeCartId } from '../../hooks'

export function CartDebugger() {
  const client = useApolloClient()

  return (
    <div style={{ position: 'fixed', bottom: 0, right: 0, zIndex: 1, opacity: 0.3 }}>
      <Button
        type='button'
        variant='text'
        size='small'
        onClick={() => {
          const currentCartId = readCartId(client.cache)
          if (!currentCartId) {
            // eslint-disable-next-line no-console
            console.log('No customerToken available, nothing to break')
          } else {
            // eslint-disable-next-line no-console
            console.log('Changing current token to a random one')
            writeCartId(client.cache, `${Math.random().toString(36).slice(2)}random-cardId`)
          }
        }}
      >
        break cart
      </Button>
    </div>
  )
}
