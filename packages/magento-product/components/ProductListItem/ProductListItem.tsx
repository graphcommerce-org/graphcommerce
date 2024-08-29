import { ImageProps } from '@graphcommerce/image'
import { extendableComponent } from '@graphcommerce/next-ui'
import { SxProps, Theme, useEventCallback, Skeleton } from '@mui/material'
import React from 'react'
import { ProductListItemFragment } from '../../Api/ProductListItem.gql'
import { productLink } from '../../hooks/useProductLink'
import { ProductListPrice } from '../ProductListPrice/ProductListPrice'
import { ProductDiscountLabel } from './ProductDiscountLabel'
import {
  ProductListItemImageProps,
  ProductListItemImage,
  ProductListItemImageSkeleton,
} from './ProductListItemImage'
import {
  ProductListItemImageAreaKeys,
  ProductListsItemImageAreaProps,
  ProductListItemImageAreas,
  ProductImageContainer,
} from './ProductListItemImageContainer'
import { ProductListItemLinkOrDiv, ProductListItemLinkOrDivProps } from './ProductListItemLinkOrDiv'
import {
  ProductListItemTitleAndPrice,
  ProductListItemTitleAndPriceProps,
} from './ProductListItemTitleAndPrice'

const { classes, selectors } = extendableComponent('ProductListItem', [
  'root',
  'item',
  'title',
  'titleContainer',
  'subtitle',
  'price',
  'overlayItems',
  'topLeft',
  'topRight',
  'bottomLeft',
  'bottomRight',
  'imageContainer',
  'placeholder',
  'image',
  'discount',
] as const)

type StyleProps = {
  imageOnly?: boolean
}

type BaseProps = {
  imageOnly?: boolean
  children?: React.ReactNode
  sx?: SxProps<Theme>
  onClick?: (
    event: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>,
    item: ProductListItemFragment,
  ) => void
  slotProps?: {
    root?: Partial<ProductListItemLinkOrDivProps>
    image?: Partial<ProductListItemImageProps>
    imageAreas?: Partial<ProductListsItemImageAreaProps>
    titleAndPrice?: Partial<ProductListItemTitleAndPriceProps>
  }
} & StyleProps &
  Omit<ProductListItemTitleAndPriceProps, 'title' | 'classes' | 'children'> &
  Omit<ProductListItemImageProps, 'classes'> &
  Omit<ProductListsItemImageAreaProps, 'classes'> &
  Pick<ImageProps, 'loading' | 'sizes' | 'dontReportWronglySizedImages'>

type SkeletonProps = BaseProps & { __typename: 'Skeleton' }

type ProductProps = BaseProps & ProductListItemFragment

export type ProductListItemProps = ProductProps | SkeletonProps

export function ProductListItemReal(props: ProductProps) {
  const {
    subTitle,
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
    small_image,
    name,
    price_range,
    children,
    imageOnly = false,
    loading,
    sizes,
    dontReportWronglySizedImages,
    aspectRatio = [4, 3],
    titleComponent = 'h2',
    sx = [],
    onClick,
    slotProps = {},
  } = props

  return (
    <ProductListItemLinkOrDiv
      href={productLink(props)}
      className={classes.root}
      sx={sx}
      onClick={(e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>) => onClick?.(e, props)}
      {...slotProps.root}
      ref={slotProps.root?.ref as React.Ref<HTMLAnchorElement | HTMLDivElement>}
    >
      <ProductImageContainer className={classes.imageContainer}>
        <ProductListItemImage
          classes={classes}
          src={small_image?.url}
          alt={small_image?.label}
          aspectRatio={aspectRatio}
          loading={loading}
          sizes={sizes}
          dontReportWronglySizedImages={dontReportWronglySizedImages}
          {...slotProps.image}
        />

        {!imageOnly && (
          <ProductListItemImageAreas
            topRight={topRight}
            bottomLeft={bottomLeft}
            bottomRight={bottomRight}
            classes={classes}
            topLeft={
              <>
                <ProductDiscountLabel className={classes.discount} price_range={price_range} />
                {topLeft}
              </>
            }
            {...slotProps.imageAreas}
          />
        )}
      </ProductImageContainer>

      {!imageOnly && (
        <>
          <ProductListItemTitleAndPrice
            classes={classes}
            titleComponent={titleComponent}
            title={name}
            subTitle={subTitle}
            {...slotProps.titleAndPrice}
          >
            <ProductListPrice {...price_range.minimum_price} />
          </ProductListItemTitleAndPrice>
          {children}
        </>
      )}
    </ProductListItemLinkOrDiv>
  )
}

export function ProductListItemSkeleton(props: BaseProps) {
  const {
    children,
    imageOnly = false,
    aspectRatio,
    titleComponent = 'h2',
    sx = [],
    slotProps = {},
  } = props

  return (
    <ProductListItemLinkOrDiv
      sx={sx}
      className={classes.root}
      {...slotProps.root}
      ref={slotProps.root?.ref as React.Ref<HTMLAnchorElement | HTMLDivElement>}
    >
      <ProductImageContainer className={classes.imageContainer}>
        <ProductListItemImageSkeleton
          classes={classes}
          aspectRatio={aspectRatio}
          {...slotProps.image}
        />
      </ProductImageContainer>

      {!imageOnly && (
        <>
          <ProductListItemTitleAndPrice
            classes={classes}
            titleComponent={titleComponent}
            title={<Skeleton variant='text' sx={{ width: '100px' }} />}
            subTitle={<Skeleton variant='text' sx={{ width: '20px' }} />}
            {...slotProps.titleAndPrice}
          >
            <Skeleton variant='text' sx={{ width: '20px' }} />
          </ProductListItemTitleAndPrice>
          {children}
        </>
      )}
    </ProductListItemLinkOrDiv>
  )
}

function isSkeleton(props: ProductListItemProps): props is SkeletonProps {
  return props.__typename === 'Skeleton'
}

export function ProductListItem(props: ProductListItemProps) {
  return isSkeleton(props) ? (
    <ProductListItemSkeleton {...props} />
  ) : (
    <ProductListItemReal {...props} />
  )
}

ProductListItem.selectors = { ...selectors, ...ProductListPrice.selectors }

/** @deprecated */
export type OverlayAreaKeys = ProductListItemImageAreaKeys
/** @deprecated */
export type OverlayAreas = ProductListsItemImageAreaProps
