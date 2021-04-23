import Usps from '@reachdigital/next-ui/Usps'
import React from 'react'
import Asset from '../Asset'
import { UspsQueryFragment } from './UspsQueryFragment.gql'

export type ProductUspsProps = UspsQueryFragment

export default function ProductUsps(props: ProductUspsProps) {
  const { usps } = props

  return (
    <>
      {usps?.uspsMultiple && (
        <Usps>
          {usps?.uspsMultiple.map((usp) => (
            <li key={usp.title}>
              {usp.asset && <Asset asset={usp.asset} width={16} />}
              {usp.title}
            </li>
          ))}
        </Usps>
      )}
    </>
  )
}
