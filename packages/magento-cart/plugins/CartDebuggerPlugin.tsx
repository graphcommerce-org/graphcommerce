import type { PagesProps } from '@graphcommerce/framer-next-pages'
import { useApolloClient } from '@graphcommerce/graphql/apollo'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { Button } from '@mui/material'
import { readCartId, writeCartId } from '../hooks/useAssignCurrentCartId'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/framer-next-pages',
  ifConfig: 'debug.cart',
}

export function FramerNextPages(props: PluginProps<PagesProps>) {
  const { Prev, ...rest } = props
  const client = useApolloClient()

  return (
    <>
      <Prev {...rest} />
      <div style={{ position: 'fixed', bottom: 20, right: 0, zIndex: 1, opacity: 0.3 }}>
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
          break cart token
        </Button>
      </div>
    </>
  )
}
