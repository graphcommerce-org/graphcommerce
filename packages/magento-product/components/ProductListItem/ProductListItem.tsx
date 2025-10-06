import {
  ProductListItemReal,
  ProductListItemSkeleton,
  type ProductListItemRealProps,
  type ProductListItemSkeletonProps,
} from './ProductListItemParts'

export type ProductListItemProps = ProductListItemRealProps | ProductListItemSkeletonProps

function isSkeleton(props: ProductListItemProps): props is ProductListItemSkeletonProps {
  return props.__typename === 'Skeleton'
}

export function ProductListItem(props: ProductListItemProps) {
  return isSkeleton(props) ? (
    <ProductListItemSkeleton {...props} />
  ) : (
    <ProductListItemReal {...props} />
  )
}
