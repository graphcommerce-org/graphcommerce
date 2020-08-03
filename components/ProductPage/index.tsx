import { GQLTypeRenderer } from 'components/GQLRenderType'
import { GQLProductPageQuery } from 'generated/graphql'

export type ProductPageRenderer = GQLTypeRenderer<
  NonNullable<NonNullable<NonNullable<GQLProductPageQuery['products']>['items']>[0]>
>
