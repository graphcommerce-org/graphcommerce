import { useCustomerTokenQuery } from 'generated/apollo'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export function isCustomerTokenValid(token?: GQLCustomerToken | null) {
  if (!token?.token) return false

  // todo(paales): By default the oAuth token is valid for 1 hour, we should fetch
  const validDuration = 60 * 60 * 1000
  const validUntil = new Date(token?.createdAt).getTime() + validDuration

  return validUntil > new Date().getTime()
}

export default function useSignedInGuard() {
  const router = useRouter()
  const { data } = useCustomerTokenQuery()
  const isValid = isCustomerTokenValid(data?.customerToken)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (!isValid) router.push('/account/signin')
  }, [isValid, router])

  return isValid
}
