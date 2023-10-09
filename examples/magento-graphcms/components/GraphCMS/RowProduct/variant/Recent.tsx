import { RecentlyViewedProducts } from '../../../ProductListItems/RecentlyViewedProducts'
import { RowProductFragment } from '../RowProduct.gql'

type RecentProps = RowProductFragment & { sku?: string | null | undefined }

export function Recent({ title, sku }: RecentProps) {
  return <RecentlyViewedProducts title={title} exclude={sku ? [sku] : []} />
}
