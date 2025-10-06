import { extendableComponent, type ExtendableComponentProps } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import type { PriceModifier } from './PriceModifiers'
import { PriceModifierListChildItem } from './PriceModifiersListChildItem'

const name = 'PriceModifierListItem'
const slots = ['root'] as const
const { withState } = extendableComponent(name, slots)

type PriceModifierListItemProps = ExtendableComponentProps<typeof slots> & PriceModifier

export function PriceModifierListItem(props: PriceModifierListItemProps) {
  const { label, items } = props

  const classes = withState(props)

  return (
    <Box className={classes.root}>
      {label && <PriceModifierListChildItem label={label} color='text.primary' />}
      {items?.map(({ key: itemKey, ...item }) => (
        <PriceModifierListChildItem key={itemKey} {...item} color='text.secondary' />
      ))}
    </Box>
  )
}
