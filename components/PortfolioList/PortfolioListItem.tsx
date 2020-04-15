import React from 'react'
import Asset from '../Asset'
import Link from '../Link'

const PortfolioListItem: React.FC<GQLPortfolioListitemFragment> = ({
  title,
  url,
  metaRobots,
  asset,
}) => {
  return (
    <Link href={url} metaRobots={metaRobots!}>
      {asset && <Asset asset={asset} />}
      {title}
    </Link>
  )
}

export default PortfolioListItem
