import { ApolloErrorSnackbar } from '@graphcommerce/ecommerce-ui'
import { useMutation, useQuery } from '@graphcommerce/graphql'
import { useAssignCurrentCartId, useCartQuery } from '@graphcommerce/magento-cart'
import { BillingPageDocument } from '@graphcommerce/magento-cart-checkout'
import { CurrentCartIdDocument } from '@graphcommerce/magento-cart/hooks/CurrentCartId.gql'
import { Button, FullPageMessage, iconShoppingBag, IconSvg } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useMSPCartLock } from '../../hooks/useMSPCartLock'
import { MSPPaymentHandlerDocument } from '../MSPPaymentHandler/MSPPaymentHandler.gql'

const DialogDynamic = dynamic(() => import('@mui/material').then((mod) => mod.Dialog), {
  ssr: false,
})

export function MSPRestoreLocked() {
  const [, , unlock] = useMSPCartLock()
  const assignCurrentCartId = useAssignCurrentCartId()
  const router = useRouter()

  const [restore, { loading, error }] = useMutation(MSPPaymentHandlerDocument)
  const status = useQuery(CurrentCartIdDocument).data?.currentCartId
  const { locked } = status ?? {}
  const cart = useCartQuery(BillingPageDocument)
  const cartId = cart.data?.cart?.id
  const isMsp = cart.data?.cart?.selected_payment_method?.code.startsWith('multisafepay_')
  const isPaymentPage = router.pathname.startsWith('/checkout/payment')
  const shouldRestore = locked && cartId && isMsp && !isPaymentPage

  return (
    <>
      <ApolloErrorSnackbar error={error} />
      {isMsp && (
        <DialogDynamic open={Boolean(shouldRestore)} fullWidth>
          <FullPageMessage
            disableMargin
            icon={<IconSvg src={iconShoppingBag} />}
            title={<Trans>Your cart is locked.</Trans>}
            button={
              <Button
                variant='pill'
                onClick={async () => {
                  if (!cartId) return
                  const res = await restore({ variables: { cartId } })
                  if (!res.data?.getPaymentMeta) return
                  assignCurrentCartId(res.data.getPaymentMeta)
                  await unlock({ success: null })
                }}
                loading={loading}
              >
                <Trans>Cancel payment and unlock cart</Trans>
              </Button>
            }
          >
            <Trans>
              1. You are still paying in another window: Close this window and continue there.
            </Trans>
            <br />
            <Trans>2. You don't have an open payment window: Press the button below.</Trans>
          </FullPageMessage>
        </DialogDynamic>
      )}
    </>
  )
}
