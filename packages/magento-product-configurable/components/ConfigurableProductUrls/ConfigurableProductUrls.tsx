import { ProductLinkFragment } from '@graphcommerce/magento-product/hooks/ProductLink.gql'
import { useProductLink } from '@graphcommerce/magento-product/hooks/useProductLink'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useConfigurableOptionsSelection } from '../../hooks/useConfigurableOptionsSelection'

type ConfigurableProductUrlsProps = ProductLinkFragment & {
  index?: number
}

export function ConfigurableProductUrls(props: ConfigurableProductUrlsProps) {
  const { url_key, __typename: productType, index = 0 } = props
  const router = useRouter()
  const { configured } = useConfigurableOptionsSelection({ url_key, index })
  const urlKey = configured?.configurable_product_options_selection?.variant?.url_key ?? url_key

  const productLink = useProductLink({
    url_key: urlKey,
    __typename: productType,
  })

  useEffect(() => {
    const currentUrlPath = router.asPath.split('/')
    const currentUrlKey = currentUrlPath[currentUrlPath.length - 1]
    const optionUrlKey = configured?.configurable_product_options_selection?.variant?.url_key

    if (optionUrlKey && optionUrlKey !== currentUrlKey) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.replace(productLink, undefined, { scroll: false, shallow: true })
    }
  }, [configured, router, productLink])

  return undefined
}
