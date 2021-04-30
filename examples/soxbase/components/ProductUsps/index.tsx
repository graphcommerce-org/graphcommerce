import UspList from '@reachdigital/next-ui/UspList'
import UspListItem from '@reachdigital/next-ui/UspList/UspListItem'
import React from 'react'
import Asset from '../Asset'
import { UspsQueryFragment } from './UspsQueryFragment.gql'

export type ProductUspsProps = UspsQueryFragment

export default function ProductUsps(props: ProductUspsProps) {
  const { usps } = props

  if (!usps?.uspsMultiple) return <></>

  return (
    <UspList>
      {usps?.uspsMultiple.map((usp) => (
        <UspListItem
          key={usp.title}
          title={usp.title}
          icon={usp.asset && <Asset asset={usp.asset} width={38} />}
        />
      ))}
    </UspList>
  )
}
