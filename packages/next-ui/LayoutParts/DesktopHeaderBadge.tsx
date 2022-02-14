import { Badge, BadgeProps } from '@mui/material'

// todo: replace with theming
export function DesktopHeaderBadge(props: BadgeProps) {
  const { sx = false } = props
  return (
    <Badge
      {...props}
      sx={[
        {
          '& .MuiBadge-colorError': {
            bgcolor: 'text.disabled',
          },
          '& .MuiBadge-anchorOriginTopRightCircular': {
            right: { xs: '3px', md: '8px' },
            top: { xs: '3px', md: '8px' },
          },
          '& .MuiBadge-badge': {
            typography: 'caption',
            borderRadius: '100%',
            padding: { xs: '3px', md: '6px' },
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  )
}
