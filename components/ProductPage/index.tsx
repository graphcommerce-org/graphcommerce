import GQLRenderType, { GQLTypeRenderer } from 'components/GQLRenderType'

export type ProductPageRenderer = GQLTypeRenderer<
  NonNullable<NonNullable<NonNullable<GQLProductPageQuery['products']>['items']>[0]>
>
