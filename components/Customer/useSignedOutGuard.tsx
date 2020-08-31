import { useCustomerTokenQuery } from 'generated/apollo'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function useSignedOutGuard() {
  const router = useRouter()
  const { data } = useCustomerTokenQuery()
  useEffect(() => {
    if (data?.customerToken?.token) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push('/account')
    }
  })
  return !data?.customerToken?.token
}
