import { useQuery } from '@apollo/client'
import { CustomerTokenDocument } from 'generated/documents'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function useSignedInGuard() {
  const router = useRouter()
  const { data } = useQuery(CustomerTokenDocument)
  const isValid = !!data?.customerToken?.valid

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (!isValid && router.pathname !== '/account/signin') router.replace('/account/signin?back=1')
  }, [isValid, router])

  return isValid
}
