import { GQLTypeRenderer } from '@reachdigital/next-ui/GQLRenderType'

export type ProductPageRenderer = GQLTypeRenderer<
  NonNullable<NonNullable<NonNullable<GQLProductPageQuery['products']>['items']>[0]>
>
