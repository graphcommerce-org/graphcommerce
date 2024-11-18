type UseRelativeTimeFormatUnitAutoProps = {
  value: number
  unit?: Intl.RelativeTimeFormatUnit
}

export function relativeTimeFormatUnitAuto(
  props: UseRelativeTimeFormatUnitAutoProps,
): [number, Intl.RelativeTimeFormatUnit] {
  const { value, unit } = props

  if (unit) return [value, unit]

  // Calculate the absolute value once
  const absValue = Math.abs(value)

  if (absValue >= 60 * 60 * 24 * 365) return [Math.round(value / (60 * 60 * 24 * 365)), 'year']
  if (absValue >= 60 * 60 * 24 * 30) return [Math.round(value / (60 * 60 * 24 * 30)), 'month']
  if (absValue >= 60 * 60 * 24 * 7) return [Math.round(value / (60 * 60 * 24 * 7)), 'week']
  if (absValue >= 60 * 60 * 24) return [Math.round(value / (60 * 60 * 24)), 'day']
  if (absValue >= 60 * 60) return [Math.round(value / (60 * 60)), 'hour']
  if (absValue >= 60) return [Math.round(value / 60), 'minute']
  return [Math.round(value), 'second']
}
