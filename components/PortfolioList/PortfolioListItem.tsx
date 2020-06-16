import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import Asset from 'components/Asset'
import Link from 'components/Link'

const useStyles = makeStyles(
  (theme: Theme) => {
    return {
      link: {
        marginBottom: theme.spacings.md,
        '&:hover': {
          textDecoration: 'none',
        },
      },
      image: {
        display: 'block',
        width: '100%',
        height: 'auto',
      },
      logo: {
        objectFit: 'contain',
        height: '55px',
        width: 'auto',
      },
      container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
      },
      caseTitle: {
        ...theme.typography.h3,
        color: '#000',
      },
    }
  },

  { name: 'PortfolioListItem' },
)

const PortfolioListItem: React.FC<GQLPortfolioListitemFragment> = ({
  title,
  url,
  metaRobots,
  asset,
  logo,
}) => {
  const classes = useStyles()
  return (
    <Link className={classes.link} href={url} metaRobots={metaRobots}>
      {asset && <Asset asset={asset} className={classes.image} width={380} />}
      <div className={classes.container}>
        {logo && <Asset asset={logo} className={classes.logo} width={180} />}
        <h2 className={classes.caseTitle}>{title}</h2>
      </div>
    </Link>
  )
}

export default PortfolioListItem
