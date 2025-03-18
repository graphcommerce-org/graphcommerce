export function PriceModifierListItem(props: PriceModifier) {
  const { label, items } = props

  return (
    <Box sx={{}}>
      {label && (
        <PriceModifierListChildItem key='price-modifier' label={label} color='text.primary' />
      )}
      {items?.map(({ key: itemKey, ...item }) => (
        <PriceModifierListChildItem key={itemKey} {...item} color='text.secondary' />
      ))}
    </Box>
  )
}
