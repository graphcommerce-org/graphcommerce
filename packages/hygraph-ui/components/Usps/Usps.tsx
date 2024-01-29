import { UspList, UspListItem, UspListProps } from '@graphcommerce/next-ui'
import { Asset } from '../Asset/Asset'
import { RichText } from '../RichText'
import { UspsQueryFragment } from './UspsQueryFragment.gql'

export type ProductUspsProps = UspsQueryFragment & Pick<UspListProps, 'size'>

export function Usps(props: ProductUspsProps) {
  const { usps, size } = props

  if (!usps?.uspsMultiple) return null

  return (
    <UspList size={size}>
      {usps?.uspsMultiple.map((usp) => {
        if (!usp.description || !usp.asset) return null
        return (
          <UspListItem
            key={usp.title}
            text={<RichText raw={usp.description?.raw} />}
            icon={<Asset asset={usp.asset} layout='fill' sizes='50px' unoptimized />}
            size={size}
          />
        )
      })}
    </UspList>
  )
}
