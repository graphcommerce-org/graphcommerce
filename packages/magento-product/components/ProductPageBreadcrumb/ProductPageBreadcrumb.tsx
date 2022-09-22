import { usePrevPageRouter } from '@graphcommerce/framer-next-pages'
import { productPageCategory } from '../ProductPageCategory/productPageCategory'
import { ProductPageBreadcrumbFragment } from './ProductPageBreadcrumb.gql'

export function ProductPageBreadcrumb(props: ProductPageBreadcrumbFragment) {
  const { categories, name } = props
  const prev = usePrevPageRouter()

  const category =
    categories?.find((c) => `/${c?.url_path}` === prev?.asPath) ?? productPageCategory(props)
  console.log(category)

  return null
}
