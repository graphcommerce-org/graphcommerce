import { useQuery } from '@apollo/client'
import { ProductImage } from '@reachdigital/magento-graphql'
import clsx from 'clsx'
import React from 'react'
import { OrderCardFragment } from '../OrderCard/OrderCard.gql'
import OrderCardItemImage from '../OrderCardItemImage'
import { OrderCardItemImagesDocument } from './OrderCardItemImages.gql'
import useOrderCardItemImagesStyles from './OrderCardItemImagesStyles'

export type OrderCardItemImagesProps = Pick<OrderCardFragment, 'items'> & {
  thumbnail?: Pick<ProductImage, 'label' | 'url'>
}

export default function OrderCardItemImages(props: OrderCardItemImagesProps) {
  const { items } = props
  const { data } = useQuery(OrderCardItemImagesDocument, {
    variables: {
      urlKeys: items?.map((item) => item?.product_url_key ?? '') ?? [],
    },
  })
  const productImages = data?.products?.items
  const classes = useOrderCardItemImagesStyles()

  // match found images with url_keys as it can happen that a product isn't sold anymore
  const itemsWithImages = items?.map((itemWithoutImage) => {
    const imageForItem = productImages?.find(
      (image) => image?.url_key === itemWithoutImage?.product_url_key,
    )

    // if we don't check for the item to exist
    // TSC complains there will be possibly an object with only a thumbnail key.
    if (!itemWithoutImage) return null

    return {
      thumbnail: {
        ...imageForItem?.thumbnail,
      },
      ...itemWithoutImage,
    }
  })

  const totalItems = itemsWithImages?.length ?? 0
  const maxItemsInRow = 5

  return (
    <div className={classes.images}>
      {itemsWithImages?.slice(0, maxItemsInRow).map((item) => (
        <OrderCardItemImage
          key={`image-${item?.product_url_key ?? ''}`}
          thumbnail={item?.thumbnail}
          url_key={item?.product_url_key ?? ''}
        />
      ))}

      {totalItems > maxItemsInRow && (
        <div className={clsx(classes.placeholder, classes.image)}>
          {`+${totalItems - maxItemsInRow}`}
        </div>
      )}
    </div>
  )
}
