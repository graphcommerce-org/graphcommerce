import RichText from '@graphcommerce/graphcms-ui/RichText'
import { Image } from '@graphcommerce/image'
import { UspList, UspListItem } from '@graphcommerce/next-ui'
import React from 'react'
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
          icon={
            usp.asset &&
            usp.asset.width &&
            usp.asset.height && (
              <Image
                src={usp.asset.url}
                width={usp.asset.width}
                height={usp.asset.height}
                layout='fill'
              />
            )
          }
          size={size}
        />
      ))}
    </UspList>
  )
}
