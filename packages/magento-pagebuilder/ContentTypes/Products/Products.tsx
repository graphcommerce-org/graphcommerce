import { ProductScroller } from '@graphcommerce/magento-product'
import { Container } from '@mui/material'
import {
  ProductListItems,
  productListRenderer,
} from '../../../../examples/magento-graphcms/components'
import { extractAdvancedProps } from '../../utils'
import { ProductsContentType, ProductsProps } from './types'

export const Products: ProductsContentType['component'] = (props) => {
  const [cssProps, cssClasses, additional] = extractAdvancedProps(props)
  const { appearance, products } = additional

  if (appearance === 'grid') {
    return (
      <Container>
        <ProductListItems items={products} size='small' titleComponent='h3' title={''} />
      </Container>
    )
  }
  return (
    <Container>
      <ProductScroller items={products} productListRenderer={productListRenderer} />
    </Container>
  )
}
