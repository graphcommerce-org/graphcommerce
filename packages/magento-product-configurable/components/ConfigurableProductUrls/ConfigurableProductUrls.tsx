import {
  ProductLinkProps,
  useProductLink,
} from '@graphcommerce/magento-product/hooks/useProductLink'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ConfigurableOptionsFragment } from '../../graphql/ConfigurableOptions.gql'
import { useConfigurableOptionsSelection } from '../../hooks/useConfigurableOptionsSelection'

type ConfigurableProductUrlsProps = {
  index?: number
  product: Partial<ConfigurableOptionsFragment>
}

export function ConfigurableProductUrls(props: ConfigurableProductUrlsProps) {
  const { product, index = 0 } = props
  const router = useRouter()
  const variant = useConfigurableOptionsSelection({ url_key: product?.url_key, index }).configured
    ?.configurable_product_options_selection?.variant
  const urlKey = variant?.url_key ?? product?.url_key

  const productLink = useProductLink({
    url_key: urlKey,
    __typename: variant?.__typename as ProductLinkProps['__typename'],
  })

  useEffect(() => {
    const currentUrlPath = router.asPath.split('/')
    const currentUrlKey = currentUrlPath[currentUrlPath.length - 1]
    const optionUrlKey = variant?.url_key
    const isVisible = variant?.url_rewrites?.length

    if (optionUrlKey && optionUrlKey !== currentUrlKey && isVisible) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.replace(productLink, undefined, { scroll: false, shallow: true })
    }
  }, [variant, router, productLink])

  return undefined
}
