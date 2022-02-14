import { SvgIcon, iconLocation } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Box, SxProps, Theme } from '@mui/material'
import React from 'react'
import { TrackingLinkFragment } from './TrackingLink.gql'

export type TrackingLinkProps = TrackingLinkFragment & { sx?: SxProps<Theme> }

export default function TrackingLink(props: TrackingLinkProps) {
  const { number, sx = [] } = props

  return (
    <Box
      className='TrackingLink-root'
      sx={[
        (theme) => ({
          display: 'flex',
          alignItems: 'center',
          color: theme.palette.primary.main,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {number && (
        <>
          <SvgIcon src={iconLocation} size='small' />
          <Trans>Follow order</Trans>
        </>
      )}
    </Box>
  )
}
