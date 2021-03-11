import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import Asset from '../Asset'
import { UspsQueryFragment } from './UspsQueryFragment.gql'

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
      '& > *': {
        display: 'grid',
        gridAutoFlow: 'column',
        maxWidth: 'max-content',
        alignItems: 'center',
      },
      '& img': {
        width: 38,
        height: 38,
      },
    },
  },
}))

export type ProductUspsProps = UspsQueryFragment

export default function ProductUsps(props: ProductUspsProps) {
  const { usps } = props
  const classes = useStyles()

  return (
    <>
      {usps?.uspsMultiple && (
        <ul className={classes.root}>
          {usps?.uspsMultiple.map((usp) => (
            <li key={usp.title}>
              {usp.asset && <Asset asset={usp.asset} width={16} />}
              {usp.title}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
