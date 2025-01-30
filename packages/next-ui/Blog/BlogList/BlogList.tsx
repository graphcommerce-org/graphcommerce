import type { ContainerProps } from '@mui/material'
import { Row } from '../../Row/Row'

export type BlogItemGridProps = ContainerProps

export function BlogItemGrid(props: BlogItemGridProps) {
  const { sx = [], ...containerProps } = props

  return (
    <Row
      sx={[
        (theme) => ({
          display: 'grid',
          gap: theme.spacings.md,
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...containerProps}
    />
  )
}
