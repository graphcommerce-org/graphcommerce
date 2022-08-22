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
            console.log(`Changing current token to a random one`)

            client.writeQuery({
              query: CustomerTokenDocument,
              data: {
                customerToken: {
                  ...currentToken?.customerToken,
                  token: `${Math.random().toString(36).slice(2)}random-token`,
                },
              },
              broadcast: true,
            })
          }
        }}
      >
        break auth
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
            console.log(`Changing current jwtToken to a random one)`)

            client.writeQuery({
              query: CustomerTokenDocument,
              data: {
                customerToken: {
                  ...currentToken?.customerToken,
                  token: `${Math.random().toString(36).slice(2)}random-jwt-token`,
                },
              },
              broadcast: true,
            })
          }
        }}
      >
        break jwt
      </Button>
    </div>
  )
}
