import { mergeDeep } from '@graphcommerce/graphql'
import {
  productLink,
  type AddToCartItemSelector,
  type ProductPageMeta,
} from '@graphcommerce/magento-product'
import type { IfConfig, ReactPlugin } from '@graphcommerce/next-config'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useConfigurableSelectedVariant } from '../../hooks'

export const component = 'ProductPageMeta'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'configurableVariantValues.url'

type PluginType = ReactPlugin<typeof ProductPageMeta, AddToCartItemSelector>

const ConfigurableProductPageMetaUrls: PluginType = (props) => {
  const { Prev, product, index, ...rest } = props
  const { replace, asPath } = useRouter()

  const variant = useConfigurableSelectedVariant({ url_key: product?.url_key, index })

  const isValidVariant = (variant?.url_rewrites ?? []).length > 0 && variant?.url_key
  const targetUrl = isValidVariant ? productLink(variant) : productLink(product)

  useEffect(() => {
    if (targetUrl !== asPath) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      replace(targetUrl, undefined, { scroll: false, shallow: true })
    }
  }, [asPath, replace, targetUrl])

  return <Prev product={variant ? mergeDeep(product, variant) : product} {...rest} />
}

export const Plugin = ConfigurableProductPageMetaUrls
