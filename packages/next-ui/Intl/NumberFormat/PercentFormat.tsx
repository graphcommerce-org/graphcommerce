import type { NumberFormatProps } from './NumberFormat'
import { NumberFormat } from './NumberFormat'

export type PercentFormatProps = Omit<NumberFormatProps, 'numberStyle'>

export function PercentFormat(props: PercentFormatProps) {
  return <NumberFormat {...props} numberStyle='percent' />
}
