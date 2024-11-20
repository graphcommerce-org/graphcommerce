import { NumberFormat, NumberFormatProps } from './NumberFormat'

export type PercentFormatProps = Omit<NumberFormatProps, 'numberStyle'>

export function PercentFormat(props: PercentFormatProps) {
  return <NumberFormat {...props} numberStyle='percent' />
}
