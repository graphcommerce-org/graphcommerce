import { useQuery } from '@apollo/client'
import { makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import PictureResponsiveNext from '../../next-ui/PictureResponsiveNext'
import { OrderCardFragment } from '../OrderCard/OrderCard.gql'
import OrderCardItemImage from '../OrderCardItemImage'
import { OrderCardItemImagesDocument } from './OrderCardItemImages.gql'

export type OrderCardItemImagesProps = Pick<OrderCardFragment, 'items'>

export const useOrderCardImagesStyles = makeStyles(
  (theme: Theme) => ({
    images: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: theme.spacings.xxs,
    },
    image: {
      width: 88,
      height: 88,
      marginRight: theme.spacings.xxs,
      marginBottom: theme.spacings.xxs,
    },
    placeholder: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
  { name: 'OrderCardItemImages' },
)

export default function OrderCardItemImages(props: OrderCardItemImagesProps) {
  const { items } = props
  const { data } = useQuery(OrderCardItemImagesDocument, {
    variables: {
      urlKeys: items?.map((item: any) => item.product_url_key) ?? [],
    },
  })
  const productImages = data?.products?.items
  const classes = useOrderCardImagesStyles()

  // match found images with url_keys. It can happen that a product isn't sold anymore
  const itemsWithImages = items?.map((itemWithoutImage) => {
    const imageForItem = productImages?.find(
      (image) => image?.url_key === itemWithoutImage?.product_url_key,
    )

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
        <OrderCardItemImage
          key={`image-${i}`}
          thumbnail={item?.thumbnail ?? ''}
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
