import { makeStyles, Theme } from '@material-ui/core'
import { LocationOn } from '@material-ui/icons'
import PictureResponsiveNext from '@reachdigital/next-ui/PictureResponsiveNext'
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
  { name: 'OrderCard' },
)

export default function TrackingLink(props: TrackingLinkProps) {
  const { number, carrier, title } = props
  const classes = useStyles()

  return (
    <div className={classes.trackingLink}>
      {number && (
        <>
          <PictureResponsiveNext
            src='/icons/desktop_order_tracker.svg'
            alt='order tracker'
            loading='eager'
            width={24}
            height={24}
            type='image/svg+xml'
          />
          Follow order
        </>
      )}
    </div>
  )
}
