import { SvgImage, iconLocationRed } from '@graphcommerce/next-ui'
import { Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
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
          <SvgImage src={iconLocationRed} size='small' loading='eager' alt='order tracker' />
          Follow order
        </>
      )}
    </div>
  )
}
