import { makeStyles, Theme } from '@material-ui/core'
import { LocationOn } from '@material-ui/icons'
import React from 'react'
import { TrackingLinkFragment } from './TrackingLink.gql'

export type TrackingLinkProps = TrackingLinkFragment

const useStyles = makeStyles(
  (theme: Theme) => ({
    trackingLink: {
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.primary.main,
      justifyContent: 'center',
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
          <LocationOn />
          {number}
        </>
      )}
    </div>
  )
}
