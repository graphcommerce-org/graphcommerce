import type { UseOrderCardItemImages } from '../../hooks/useOrderCardItemImages'
import type { OrderDetailsFragment } from '../OrderDetails/OrderDetails.gql'

export type ReturnOrderFormProps = {
  // eslint-disable-next-line react/no-unused-prop-types
  order: OrderDetailsFragment
  // eslint-disable-next-line react/no-unused-prop-types
  images?: UseOrderCardItemImages
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ReturnOrderForm(props: ReturnOrderFormProps) {
  return null
}
