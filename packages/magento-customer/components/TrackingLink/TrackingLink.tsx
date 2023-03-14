import { IconSvg, iconLocation } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import Box from '@mui/material/Box'
import { SxProps, Theme } from '@mui/material/styles'
import React from 'react'
import { TrackingLinkFragment } from './TrackingLink.gql'

export type TrackingLinkProps = TrackingLinkFragment & { sx?: SxProps<Theme> }

export function TrackingLink(props: TrackingLinkProps) {
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
          <IconSvg src={iconLocation} size='small' />
          <Trans id='Follow order' />
        </>
      )}
    </Box>
  )
}
