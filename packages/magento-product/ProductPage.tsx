import { TypeRenderer } from '@reachdigital/next-ui/RenderType'
import { ProductPageQuery } from './ProductPage.graphql'

export type ProductPageRenderer = TypeRenderer<
  NonNullable<NonNullable<NonNullable<ProductPageQuery['products']>['items']>[0]>
>
