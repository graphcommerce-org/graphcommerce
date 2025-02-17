import type { InvoiceItemFragment } from './InvoiceItem.gql'

export type InvoiceItemProps = {
  item: InvoiceItemFragment
}

export function InvoiceItem(props: InvoiceItemProps) {
  const { item } = props
  return (
    <div>
      {item.product_name} {item.quantity_invoiced}
    </div>
  )
}
