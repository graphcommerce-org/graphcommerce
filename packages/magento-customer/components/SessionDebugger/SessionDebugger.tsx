/* eslint-disable no-console */
import { useApolloClient } from '@graphcommerce/graphql'
import { Button } from '@mui/material'
import { CustomerTokenDocument } from '../../hooks/CustomerToken.gql'

export function SessionDebugger() {
  const client = useApolloClient()

  return (
    <div style={{ position: 'fixed', bottom: 0, right: 0, zIndex: 1, opacity: 0.3 }}>
      <Button
        type='button'
        variant='text'
        size='small'
        onClick={() => {
          const currentToken = client.readQuery({ query: CustomerTokenDocument })
          if (!currentToken?.customerToken?.token) {
            console.log('No customerToken available, nothing to break')
          } else {
            console.log(`Invalidating session`)
            client.writeQuery({
              query: CustomerTokenDocument,
              data: {
                customerToken: {
                  ...currentToken?.customerToken,
                  valid: false,
                },
              },
              broadcast: true,
            })
          }
        }}
      >
        Invalidate session
      </Button>
      <Button
        type='button'
        variant='text'
        size='small'
        onClick={() => {
          const currentToken = client.readQuery({ query: CustomerTokenDocument })
          if (!currentToken?.customerToken?.token) {
            console.log('No customerToken available, nothing to break')
          } else {
            console.log(`Changing current token to a random one`)

            client.writeQuery({
              query: CustomerTokenDocument,
              data: {
                customerToken: {
                  ...currentToken?.customerToken,
                  token: 'hihaho',
                },
              },
              broadcast: true,
            })
          }
        }}
      >
        Invalidate token
      </Button>
    </div>
  )
}
