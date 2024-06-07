import { ApolloError } from '@graphcommerce/graphql'
import { useRouter } from 'next/router'

export function useConfirmCustomer(): { error: ApolloError | undefined; loading: boolean } {
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  router.push('/404')
  return { error: undefined, loading: false }
}
