import RichText from '@reachdigital/graphcms-ui/RichText'
import UspList from '@reachdigital/next-ui/UspList'
import UspListItem from '@reachdigital/next-ui/UspList/UspListItem'
import React from 'react'
import Asset from '../Asset'
import { UspsQueryFragment } from './UspsQueryFragment.gql'

export type ProductUspsProps = UspsQueryFragment & {
  icon?: React.ReactNode
  size?: string
}

export default function ProductUsps(props: ProductUspsProps) {
  const { usps, size } = props

  if (!usps?.uspsMultiple) return <></>

  return (
    <UspList size={size}>
      {usps?.uspsMultiple.map((usp) => (
        <UspListItem
          key={usp.title}
          text={usp.description && <RichText raw={usp.description?.raw} />}
          icon={usp.asset && <Asset asset={usp.asset} sizes='30px' />}
          size={size}
        />
      ))}
    </UspList>
  )
}
