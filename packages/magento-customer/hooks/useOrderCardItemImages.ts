import { useQuery } from '@graphcommerce/graphql'
import { OrderCardItemImageFragment } from './OrderCardItemImage.gql'
import { OrderCardItemImagesDocument } from './OrderCardItemImages.gql'
import { UseOrderCardItemImagesFragment } from './UseOrderCardItemImages.gql'

type UseOrderCardItemImagesProps = UseOrderCardItemImagesFragment | null

export type UseOrderCardItemImages = Record<string, OrderCardItemImageFragment | null | undefined>

export default function useOrderCardItemImages(
  orders?: UseOrderCardItemImagesProps,
): UseOrderCardItemImages {
  const urlKeys = (orders?.items ?? [])
    .map((order) => order?.items?.map((oi) => oi?.product_url_key ?? '') ?? [])
    .flat(1)

  const { data } = useQuery(OrderCardItemImagesDocument, {
    variables: { urlKeys },
    skip: urlKeys.length === 0,
  })

  return Object.fromEntries(
    (data?.products?.items ?? []).map((item) => [item?.url_key ?? '', item]),
  )
}
