import { SvgImageSimple, iconLocation } from '@graphcommerce/next-ui'
import { makeStyles, Theme } from '@material-ui/core'
import React from 'react'
import { TrackingLinkFragment } from './TrackingLink.gql'

export type TrackingLinkProps = TrackingLinkFragment

const useStyles = makeStyles(
  (theme: Theme) => ({
    trackingLink: {
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.primary.main,
    },
  }),
  { name: 'TrackingLink' },
)

export default function TrackingLink(props: TrackingLinkProps) {
  const { number } = props
  const classes = useStyles()

  return (
    <div className={classes.trackingLink}>
      {number && (
        <>
          <SvgImageSimple src={iconLocation} size='small' loading='eager' alt='order tracker' />
          Follow order
        </>
      )}
    </div>
  )
}
