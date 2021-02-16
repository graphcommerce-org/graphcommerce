import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import Asset from '../Asset'
import { AssetFragment } from '../Asset/Asset.gql'
import { UspsQuery } from './ProductUsps.gql'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    gridArea: 'usps',
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    display: 'grid',
    gap: theme.spacings.xs,
    alignContent: 'start',
    '& li': {
      display: 'grid',
      gridAutoFlow: 'column',
      justifyItems: 'start',
      maxWidth: 'max-content',
      alignItems: 'center',
      gap: theme.spacings.xs,
      ...theme.typography.body1,
      '& img': {
        width: 38,
        height: 38,
      },
    },
  },
}))

export type ProductUspsProps = UspsQuery & AssetFragment

export default function ProductUsps(props: ProductUspsProps) {
  const { usps } = props
  const classes = useStyles()

  return (
    <>
      {usps && (
        <ul className={classes.root}>
          {usps?.productUspsMultiple.map((usp) => (
            <li key={usp.title}>
              <Asset asset={usp.asset} width={16} />
              {usp.title}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
