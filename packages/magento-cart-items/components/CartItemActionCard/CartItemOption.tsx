import type { MoneyFragment } from '@graphcommerce/magento-store'

type CartItemOptionProps = {
  label: React.ReactNode
  quantity?: number
  price?: MoneyFragment
  total?: MoneyFragment
}

export function CartItemOption(props: CartItemOptionProps) {
  const { option } = props
}
