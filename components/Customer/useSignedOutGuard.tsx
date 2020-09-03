import { useCustomerTokenQuery } from 'generated/apollo'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { isCustomerTokenValid } from './useSignedInGuard'

export default function useSignedOutGuard() {
  const router = useRouter()
  const { data } = useCustomerTokenQuery()
  const isValid = isCustomerTokenValid(data?.customerToken)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (isValid && router.pathname !== '/account') router.push('/account')
  }, [isValid, router])

  return !isValid
}
