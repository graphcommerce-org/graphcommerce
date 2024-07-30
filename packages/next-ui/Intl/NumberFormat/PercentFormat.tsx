import { NumberFormat, NumberFormatPropsType } from './NumberFormat'

export function PercentFormat(props: Omit<NumberFormatPropsType, 'numberStyle'>) {
  return <NumberFormat {...props} numberStyle='percent' />
}
