export type OrderAdditionalProps = {
  order: OrderAdditionalFragment
}

export function OrderAdditional(props: OrderAdditionalProps) {
  const { order } = props

  return (
    <Box>
      <Typography>Order Additional</Typography>
    </Box>
  )
}
