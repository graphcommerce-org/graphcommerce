import { ProductListItemFragment } from '@graphcommerce/magento-product'
import type { ContentType, ContentTypeConfig } from '../../types'
import { AdvancedProps } from '../../utils'

type ProductsConfig = ContentTypeConfig<'products'> & {
  appearance: 'grid' | 'carousel'
}

export type ProductsProps = AdvancedProps & {
  products: ProductListItemFragment[]
  autoplay: boolean
  autoplaySpeed: number
  infinite: boolean
  arrows: boolean
  dots: boolean
  carouselMode: string
  centerPadding: string
}

export type ProductsContentType = ContentType<ProductsConfig, ProductsProps>
