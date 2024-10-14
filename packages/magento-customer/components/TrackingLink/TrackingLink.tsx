import { IconSvg, iconLocation } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, Link, SxProps, Theme, Typography } from '@mui/material'
import { TrackingLinkFragment } from './TrackingLink.gql'

export type TrackingLinkProps = TrackingLinkFragment & { sx?: SxProps<Theme> }

export function TrackingLink(props: TrackingLinkProps) {
  const { number, sx = [] } = props

  const validUrl = number?.startsWith('http://') || number?.startsWith('https://')

  return (
    <Box
      className='TrackingLink-root'
      sx={[
        (theme) => ({
          display: 'flex',
          alignItems: 'center',
          color: theme.vars.palette.primary.main,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {number && validUrl && (
        <Link
          onClick={(e) => e.stopPropagation()}
          href={number}
          target='_blank'
          underline='hover'
          sx={{ display: 'inline-flex', alignItems: 'center' }}
        >
          <IconSvg src={iconLocation} size='small' />
          <Trans id='Follow order' />
        </Link>
      )}

      {number && !validUrl && <Typography>{number}</Typography>}
    </Box>
  )
}
