import { useQuery } from '@apollo/client'
import { makeStyles, Theme } from '@material-ui/core'
import { ProductImage } from '@reachdigital/magento-graphql'
import React from 'react'
import { OrderCardFragment } from '../OrderCard/OrderCard.gql'
import OrderCardItem from '../OrderCardItem'
import { OrderCardItemImagesDocument } from './OrderCardItemImages.gql'

export type OrderCardItemImagesProps = Pick<OrderCardFragment, 'items'> & {
  thumbnail?: Pick<ProductImage, 'label' | 'url'>
}

const useStyles = makeStyles(
  (theme: Theme) => ({
    images: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: theme.spacings.xxs,
    },
    placeholder: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 88,
      height: 88,
      marginBottom: theme.spacings.xxs,
    },
  }),
  { name: 'OrderCardItemImages' },
)

export default function OrderCardItemImages(props: OrderCardItemImagesProps) {
  const { items } = props

  const { data } = useQuery(OrderCardItemImagesDocument, {
    variables: {
      urlKeys: items?.map((item) => item?.product_url_key ?? '') ?? [],
    },
  })
  const productImages = data?.products?.items
  const classes = useStyles()

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
      {itemsWithImages?.slice(0, maxItemsInRow).map((item, i) => (
        <div key={`item-${item?.product_url_key ?? i}`}> {item && <OrderCardItem {...item} />}</div>
      ))}

      {totalItems > maxItemsInRow && (
        <div className={classes.placeholder}>{`+${totalItems - maxItemsInRow}`}</div>
      )}
    </div>
  )
}
