import { ApolloCartErrorFullPage, useClearCurrentCartId } from '@graphcommerce/magento-cart'
import { ErrorSnackbar } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Button, Dialog } from '@mui/material'
import { useRouter } from 'next/router'
import { useMolliePaymentTokenHandler } from '../../hooks/useMolliePaymentTokenHandler'

export function MolliePaymentHandler() {
  const { error, data } = useMolliePaymentTokenHandler()
  const clear = useClearCurrentCartId()
  const router = useRouter()

  const paymentStatus = data?.mollieProcessTransaction?.paymentStatus
  if (paymentStatus)
    return (
      <ErrorSnackbar open>
        <Trans>Payment failed with status: {paymentStatus}</Trans>
      </ErrorSnackbar>
    )

  if (!error) return null

  return (
    <Dialog open fullWidth>
      <ApolloCartErrorFullPage
        error={error}
        disableMargin
        button={
          <Button
            variant='contained'
            color='primary'
            size='large'
            onClick={() => {
              clear()
              // eslint-disable-next-line @typescript-eslint/no-floating-promises
              router.push('/')
            }}
          >
            <Trans>Reset Cart and Return to home</Trans>
          </Button>
        }
      >
        <Trans>
          If you’ve successfully paid your order, the order <strong>will</strong> come through, but
          there is a communication error with the website.
        </Trans>
      </ApolloCartErrorFullPage>
    </Dialog>
  )
}
