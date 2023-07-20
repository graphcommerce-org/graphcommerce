import {
  AddToCartItemSelector,
  ProductLinkProps,
  productLink,
} from '@graphcommerce/magento-product'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ConfigurableOptionsFragment } from '../../graphql/ConfigurableOptions.gql'
import { useConfigurableSelectedVariant } from '../../hooks/useConfigurableOptionsSelection'

type ConfigurableProductUrlsProps = {
  product: Partial<ConfigurableOptionsFragment>
} & AddToCartItemSelector

export function ConfigurableProductUrls(props: ConfigurableProductUrlsProps) {
  const { product, index } = props
  const { replace, asPath } = useRouter()
  const variant = useConfigurableSelectedVariant({ url_key: product?.url_key, index })

  const link = variant?.url_key
    ? productLink(variant)
    : productLink({
        __typename: product.__typename as ProductLinkProps['__typename'],
        url_key: product.url_key,
      })

  useEffect(() => {
    const currentUrlPath = asPath.split('/')
    const currentUrlKey = currentUrlPath[currentUrlPath.length - 1]
    const optionUrlKey = variant?.url_key
    const isVisible = variant?.url_rewrites?.length

    if (optionUrlKey && optionUrlKey !== currentUrlKey && isVisible) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      replace(link, undefined, { scroll: false, shallow: true })
    }
  }, [variant, replace, asPath, link])

  return undefined
}
