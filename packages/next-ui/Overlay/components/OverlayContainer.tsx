import { sxx } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import type { LayoutOverlayBaseProps } from './OverlayBase'

export type OverlayContainerProps = Pick<LayoutOverlayBaseProps, 'active'> & {
  hidden?: boolean
  children: React.ReactNode
}

export function OverlayContainer(props: OverlayContainerProps) {
  const { children, active, hidden } = props

  return (
    <Box
      className='Overlay'
      sx={sxx(
        {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 'drawer',
        },
        hidden
          ? {
              transform: 'translateX(-200vw)',
            }
          : {
              transform: null,
            },
        active
          ? {
              pointerEvents: null,
            }
          : {
              pointerEvents: 'none',
            },
        active
          ? {
              '& .LayoutOverlayBase-overlayPane': {
                boxShadow: null,
              },
            }
          : {
              '& .LayoutOverlayBase-overlayPane': {
                boxShadow: 0,
              },
            },
      )}
    >
      {children}
    </Box>
  )
}
