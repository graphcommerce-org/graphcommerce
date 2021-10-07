import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { UseMolliePaymentTokenHandlerDocument } from './UseMolliePaymentTokenHandler.gql'

export function useMolliePaymentTokenHandler() {
  const router = useRouter()

  const paymentToken = router.query.paymentToken
  const orderHash = router.query.orderHash
  const [mut, data] = useMutation(UseMolliePaymentTokenHandlerDocument)

  useEffect(() => {
    if (!paymentToken) return

    mut({ variables: { paymentToken } })
    console.log(paymentToken)
  }, [mut, paymentToken])
}
