import { SvgImageSimple, iconLocation, makeStyles } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import React from 'react'
import { TrackingLinkFragment } from './TrackingLink.gql'

export type TrackingLinkProps = TrackingLinkFragment

const useStyles = makeStyles({ name: 'TrackingLink' })((theme) => ({
  trackingLink: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.primary.main,
  },
}))

export default function TrackingLink(props: TrackingLinkProps) {
  const { number } = props
  const { classes } = useStyles()

  return (
    <div className={classes.trackingLink}>
      {number && (
        <>
          <SvgImageSimple src={iconLocation} size='small' />
          <Trans>Follow order</Trans>
        </>
      )}
    </div>
  )
}
