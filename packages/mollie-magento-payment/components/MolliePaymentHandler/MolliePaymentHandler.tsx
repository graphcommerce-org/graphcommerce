import { ApolloCartErrorFullPage, useClearCurrentCartId } from '@graphcommerce/magento-cart'
import { Button, Dialog } from '@material-ui/core'
import { useRouter } from 'next/router'
import React from 'react'
import { useMolliePaymentTokenHandler } from '../../hooks/useMolliePaymentTokenHandler'

export default function MolliePaymentHandler() {
  const { error } = useMolliePaymentTokenHandler()
  const clear = useClearCurrentCartId()
  const router = useRouter()

  const handle = () => {
    clear()
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push('/')
  }

  if (!error) return null
  return (
    <Dialog open fullWidth>
      <ApolloCartErrorFullPage
        error={error}
        disableMargin
        button={
          <Button variant='contained' color='primary' size='large' onClick={handle}>
            Reset Cart and Return to home
          </Button>
        }
      >
        If you've successfully paid your order, the order <strong>will</strong> come through, but
        there is a communication error with the website.
      </ApolloCartErrorFullPage>
    </Dialog>
  )
}
