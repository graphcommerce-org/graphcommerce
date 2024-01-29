import { Maybe, execute } from '@graphcommerce/graphql-mesh'
import { ProductListDocument, ProductListQuery } from '@graphcommerce/magento-product'
import { filterNonNullableKeys, nonNullable } from '@graphcommerce/next-ui'
import { getAdvanced } from '../../utils'
import type { ProductsContentType } from './types'

export const productsAggregator: ProductsContentType['configAggregator'] = async (node, props) => {
  const skus = [...node.querySelectorAll<HTMLElement>('[data-product-sku]')]
    .map((el) => el.dataset.productSku)
    .filter(nonNullable)

  const products = filterNonNullableKeys(
    (
      (await execute(ProductListDocument, { filters: { sku: { in: skus } } }))
        .data as Maybe<ProductListQuery>
    )?.products?.items,
  )

  return {
    ...props,
    products,
    autoplay: node.getAttribute('data-autoplay') === 'true',
    autoplaySpeed: parseInt(node.getAttribute('data-autoplay-speed') ?? '0', 10),
    infinite: node.getAttribute('data-infinite-loop') === 'true',
    arrows: node.getAttribute('data-show-arrows') === 'true',
    dots: node.getAttribute('data-show-dots') === 'true',
    carouselMode: node.getAttribute('data-carousel-mode') ?? 'default',
    centerPadding: node.getAttribute('data-center-padding') ?? '',
    ...getAdvanced(node),
  }
}
