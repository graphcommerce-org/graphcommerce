import Box from '@mui/material/Box'
import { LayoutOverlayBaseProps } from './OverlayBase'

type OverlayContainerProps = Pick<LayoutOverlayBaseProps, 'active'> & {
  hidden?: boolean
  children: React.ReactNode
}

export function OverlayContainer(props: OverlayContainerProps) {
  const { children, active, hidden } = props

  return (
    <Box
      className='Overlay'
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        transform: hidden ? 'translateX(-200vw)' : undefined,
        pointerEvents: active ? undefined : 'none',
        right: 0,
        bottom: 0,
        zIndex: 'drawer',
        '& .LayoutOverlayBase-overlayPane': {
          boxShadow: active ? undefined : 0,
        },
      }}
    >
      {children}
    </Box>
  )
}
