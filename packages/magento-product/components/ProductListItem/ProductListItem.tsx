import { extendableComponent } from '@graphcommerce/next-ui'
import React from 'react'
import { ProductListItemFragment } from '../../Api/ProductListItem.gql'
import { ProductListPrice } from '../ProductListPrice/ProductListPrice'
import { ProductListItemDiscount } from './ProductListItemDiscount'
import { ProductListItemImage, ProductListItemImageProps } from './ProductListItemImage'
import { ProductListItemLink, ProductListItemLinkProps } from './ProductListItemLink'
import { ProductListItemName } from './ProductListItemName'

const { selectors } = extendableComponent('ProductListItem', [
  'title',
  'titleContainer',
  'subtitle',
] as const)

export type ProductListItemProps = ProductListItemFragment & {
  subTitle?: React.ReactNode
  titleComponent?: React.ElementType
} & Omit<ProductListItemLinkProps<ProductListItemFragment>, 'item'> &
  Omit<ProductListItemImageProps, 'src' | 'alt'>

export function ProductListItem(props: ProductListItemProps) {
  const {
    subTitle,
    titleComponent = 'h2',

    small_image,
    name,
    price_range,
    url_key,

    // ProductListItemLink
    children,
    sx = [],
    onClick,

    // ProductListItemImage
    imageOnly = false,
    aspectRatio,
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
    loading,
    sizes,
    dontReportWronglySizedImages,
    ...rest
  } = props

  return (
    <ProductListItemLink href={`/p/${url_key}`} item={props} sx={sx} onClick={onClick}>
      <ProductListItemImage
        aspectRatio={aspectRatio}
        imageOnly={imageOnly}
        topLeft={
          <>
            <ProductListItemDiscount
              percentage={Math.floor(price_range.minimum_price.discount?.percent_off ?? 0)}
            />
            {topLeft}
          </>
        }
        topRight={topRight}
        bottomLeft={bottomLeft}
        bottomRight={bottomRight}
        loading={loading}
        sizes={sizes}
        dontReportWronglySizedImages={dontReportWronglySizedImages}
        src={small_image?.url ?? undefined}
        alt={small_image?.label ?? name ?? undefined}
      />

      {!imageOnly && (
        <>
          <ProductListItemName
            name={name}
            subTitle={subTitle}
            titleComponent={titleComponent}
            price={price_range.minimum_price}
          />
          {children}
        </>
      )}
    </ProductListItemLink>
  )
}

ProductListItem.selectors = { ...selectors, ...ProductListPrice.selectors }
