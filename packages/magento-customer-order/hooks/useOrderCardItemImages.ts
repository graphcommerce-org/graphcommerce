import { useQuery } from '@apollo/client'
import { OrderCardItemImageFragment } from './OrderCardItemImage.graphql'
import { OrderCardItemImagesDocument } from './OrderCardItemImages.graphql'
import { UseOrderCardItemImagesFragment } from './UseOrderCardItemImages.graphql'

type UseOrderCardItemImagesProps = UseOrderCardItemImagesFragment | null

export type UseOrderCardItemImages = Record<string, OrderCardItemImageFragment | null | undefined>

export default function useOrderCardItemImages(
  orders?: UseOrderCardItemImagesProps,
): UseOrderCardItemImages {
  const urlKeys = (orders?.items ?? [])
    .map((order) => order?.items?.map((oi) => oi?.product_url_key ?? '') ?? [])
    .flat(1)

  const { data } = useQuery(OrderCardItemImagesDocument, { variables: { urlKeys } })

  return Object.fromEntries(
    (data?.products?.items ?? []).map((item) => [item?.url_key ?? '', item]),
  )
}
