import { useQuery } from '@apollo/client'
import { Maybe } from '@reachdigital/graphql'
import { UseOrderCardItemImagesFragment } from '../../hooks/UseOrderCardItemImages.gql'
import { OrderCardItemImagesDocument } from '../OrderCardItemImages/OrderCardItemImages.gql'
import { OrderCardItemImageFragment } from './OrderCardItemImage.gql'

type UseOrderCardItemImagesProps = UseOrderCardItemImagesFragment | null

export type UseOrderCardItemImages = Record<string, Maybe<OrderCardItemImageFragment>>

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
