import RichText from '@graphcommerce/graphcms-ui/RichText'
import { UspList, UspListItem, UspListProps } from '@graphcommerce/next-ui'
import React from 'react'
import Asset from '../Asset'
import { UspsQueryFragment } from './UspsQueryFragment.gql'

export type ProductUspsProps = UspsQueryFragment & {
  icon?: React.ReactNode
  size?: UspListProps['size']
}

export default function Usps(props: ProductUspsProps) {
  const { usps, size } = props

  if (!usps?.uspsMultiple) return <></>

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
