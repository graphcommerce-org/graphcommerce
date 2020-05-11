import React from 'react'
import { makeStyles } from '@material-ui/core'
import Asset from 'components/Asset'
import Link from 'components/Link'

const useStyles = makeStyles(
  {
    image: {
      display: 'block',
      width: '100%',
      height: 'auto',
    },
  },
  { name: 'PortfolioListItem' },
)

const PortfolioListItem: React.FC<GQLPortfolioListitemFragment> = ({
  title,
  url,
  metaRobots,
  asset,
}) => {
  const classes = useStyles()
  return (
    <Link href={url} metaRobots={metaRobots}>
      {asset && <Asset asset={asset} className={classes.image} width={380} />}
      {title}
    </Link>
  )
}

export default PortfolioListItem
