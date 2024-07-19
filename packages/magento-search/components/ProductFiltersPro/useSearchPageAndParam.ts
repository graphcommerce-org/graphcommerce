import { extractUrlQuery } from '@graphcommerce/magento-product'
import { useRouter } from 'next/router'

export function useSearchPageAndParam() {
  const router = useRouter()

  const path = router.asPath.startsWith('/c/') ? router.asPath.slice(3) : router.asPath.slice(1)
  const [url, query] = extractUrlQuery({ url: path.split('#')[0].split('/') })
  const searchParam = url?.startsWith('search') ? decodeURI(url.split('/')[1] ?? '') : null
  const searchPage = router.asPath.startsWith('/search')
  return [searchPage, searchParam] as const
}
