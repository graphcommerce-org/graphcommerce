import { useApolloClient } from '@graphcommerce/graphql'
import { CustomerTokenDocument } from '@graphcommerce/magento-customer'
import Button from '@mui/material/Button'

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
            console.log(`Changing current token to a random one)`)

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
        break magento token
      </Button>
    </div>
  )
}
