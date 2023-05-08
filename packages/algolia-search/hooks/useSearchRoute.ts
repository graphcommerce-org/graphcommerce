import { useRouter } from 'next/router'

export function useSearchRoute() {
  const router = useRouter()
  return router.asPath.includes('/search')
}
