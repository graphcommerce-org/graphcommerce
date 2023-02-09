import { Row } from '../../Row/Row'

type BlogItemGridProps = {
  children: React.ReactNode
}

export function BlogItemGrid(props: BlogItemGridProps) {
  const { children } = props

  return (
    <Row
      sx={(theme) => ({
        display: 'grid',
        gap: theme.spacings.md,
        gridTemplateColumns: { xs: `repeat(2, 1fr)`, md: `repeat(3, 1fr)`, lg: `repeat(4, 1fr)` },
      })}
    >
      {children}
    </Row>
  )
}
