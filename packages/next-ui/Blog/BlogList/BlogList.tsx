import { SxProps, Theme } from '@mui/material'
import { Row } from '../../Row/Row'

type BlogItemGridProps = {
  children: React.ReactNode
  sx?: SxProps<Theme>
}

export function BlogItemGrid(props: BlogItemGridProps) {
  const { children, sx = [] } = props

  return (
    <Row
      sx={[
        (theme) => ({
          display: 'grid',
          gap: theme.spacings.md,
          gridTemplateColumns: { xs: `repeat(2, 1fr)`, md: `repeat(3, 1fr)`, lg: `repeat(4, 1fr)` },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Row>
  )
}
