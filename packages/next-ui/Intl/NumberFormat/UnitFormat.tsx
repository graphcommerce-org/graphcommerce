import { NumberFormat, NumberFormatProps } from './NumberFormat'

/**
 * https://tc39.es/ecma402/#table-sanctioned-single-unit-identifiers
 */
type Unit =
  | 'acre'
  | 'bit'
  | 'byte'
  | 'celsius'
  | 'centimeter'
  | 'day'
  | 'degree'
  | 'fahrenheit'
  | 'fluid-ounce'
  | 'foot'
  | 'gallon'
  | 'gigabit'
  | 'gigabyte'
  | 'gram'
  | 'hectare'
  | 'hour'
  | 'inch'
  | 'kilobit'
  | 'kilobyte'
  | 'kilogram'
  | 'kilometer'
  | 'liter'
  | 'megabit'
  | 'megabyte'
  | 'meter'
  | 'microsecond'
  | 'mile'
  | 'mile-scandinavian'
  | 'milliliter'
  | 'millimeter'
  | 'millisecond'
  | 'minute'
  | 'month'
  | 'nanosecond'
  | 'ounce'
  | 'percent'
  | 'petabyte'
  | 'pound'
  | 'second'
  | 'stone'
  | 'terabit'
  | 'terabyte'
  | 'week'
  | 'yard'
  | 'year'

export type UnitFormatProps = Omit<NumberFormatProps, 'numberStyle'> & {
  unit: Unit | (string & Record<never, never>)
}

export function UnitFormat(props: UnitFormatProps) {
  return <NumberFormat {...props} numberStyle='unit' />
}
