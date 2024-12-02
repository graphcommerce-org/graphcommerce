import { mergeDeep } from '@graphcommerce/graphql'
import type { ProductPageMetaProps } from '@graphcommerce/magento-product'
import { type AddToCartItemSelector, productLink } from '@graphcommerce/magento-product'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useConfigurableSelectedVariant } from '../../hooks'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-product',
  ifConfig: 'configurableVariantValues.url',
}

export function ProductPageMeta(props: PluginProps<ProductPageMetaProps> & AddToCartItemSelector) {
  const { Prev, product, index, ...rest } = props
  const { replace, asPath } = useRouter()

  const variant = useConfigurableSelectedVariant({ url_key: product?.url_key, index })

  const isValidVariant = (variant?.url_rewrites ?? []).length > 0 && variant?.url_key
  const targetUrl = isValidVariant ? productLink(variant) : productLink(product)

  useEffect(() => {
    // Filter asPath with #, for zoomed gallery
    // Note for future use: This might be a dangerous way to
    // navigate to simple products, since it will trigger on every
    // navigation action on the product page.
    if (targetUrl !== asPath.split('#')[0]) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      replace(targetUrl, undefined, { scroll: false, shallow: true })
    }
  }, [asPath, replace, targetUrl])

  return <Prev product={variant ? mergeDeep(product, variant) : product} {...rest} />
}
