import { useQuery } from '@apollo/client'
import { Maybe } from '@reachdigital/magento-graphql'
import { OrderCardItemImagesDocument } from '../OrderCardItemImages/OrderCardItemImages.gql'
import { OrderCardItemFragment } from './OrderCardItem.gql'

/*
  This hook takes all items from an order and
  maps them with their thumbnails, if it still exists. 
*/
export default function useOrderCardItemsWithThumbnails(items: Maybe<OrderCardItemFragment>[]) {
  const { data } = useQuery(OrderCardItemImagesDocument, {
    variables: {
      urlKeys: items?.map((item) => item?.product_url_key ?? '') ?? [],
    },
  })

  const productThumbnails = data?.products?.items

  const itemsWithThumbnails = items?.map((itemWithoutImage) => {
    const imageForItem = productThumbnails?.find(
      (image) => image?.url_key === itemWithoutImage?.product_url_key,
    )

    return {
      thumbnail: {
        ...imageForItem?.thumbnail,
      },
      ...itemWithoutImage,
    }
  })

  return itemsWithThumbnails
}
