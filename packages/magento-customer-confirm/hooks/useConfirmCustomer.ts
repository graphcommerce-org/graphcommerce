import { useMutation } from '@graphcommerce/graphql'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export function useConfirmCustomer() {
  const router = useRouter()

  const [confirmCustomerToken, { error, loading }] = useMutation(confirmCustomerDocument, {
    errorPolicy: 'all',
  })

  useEffect(() => {
    if (!router.isReady) return

    const { id, key } = router.query

    if (!id || !key) {
      console.error('Missing ID and/or KEY parameter')
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    confirmCustomerToken({
      variables: { customerId: Number(id), token: key.toString() },
    })
  }, [router, confirmCustomerToken])
  return { error, loading }
}
