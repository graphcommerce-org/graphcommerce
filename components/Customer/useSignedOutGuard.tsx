import { useCustomerTokenQuery } from 'generated/apollo'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function useSignedOutGuard() {
  const router = useRouter()
  const { data } = useCustomerTokenQuery()
  const isValid = !!data?.customerToken?.valid

  useEffect(() => {
    if (isValid && router.pathname !== '/account') {
      if (router.query.back) {
        router.back()
      } else {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.push('/account')
      }
    }
  }, [isValid, router])

  return !isValid
}
