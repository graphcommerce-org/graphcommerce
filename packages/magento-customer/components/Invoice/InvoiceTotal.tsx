import type { InvoiceTotalFragment } from './InvoiceTotal.gql'

export type InvoiceTotalProps = {
  total: InvoiceTotalFragment
}

export function InvoiceTotal(props: InvoiceTotalProps) {
  const { total } = props
  return <div>{total.grand_total.value}</div>
}
