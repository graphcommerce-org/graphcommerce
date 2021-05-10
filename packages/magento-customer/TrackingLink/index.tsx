import { makeStyles, Theme } from '@material-ui/core'
import SvgImage from '@reachdigital/next-ui/SvgImage'
import { iconLocationRed } from '@reachdigital/next-ui/icons'
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
  const { number } = props
  const classes = useStyles()

  return (
    <div className={classes.trackingLink}>
      {number && (
        <>
          <SvgImage src={iconLocationRed} size='small' loading='eager' alt='order tracker' />
          Follow order
        </>
      )}
    </div>
  )
}
