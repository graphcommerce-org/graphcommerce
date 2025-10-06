export type UseRelativeTimeFormatUnitAutoProps = {
  value: number
  unit?: Intl.RelativeTimeFormatUnit
}

export type RelativeTimeFormatUnitAutoResult = {
  value: number
  unit: Intl.RelativeTimeFormatUnit
  remainder: number
}

export function relativeTimeFormatUnitAuto(
  props: UseRelativeTimeFormatUnitAutoProps,
): RelativeTimeFormatUnitAutoResult {
  const { value, unit } = props
  const absValue = Math.abs(value)

  const timeUnits = [
    { threshold: 60 * 60 * 24 * 365, unit: 'year' },
    { threshold: 60 * 60 * 24 * 30, unit: 'month' },
    { threshold: 60 * 60 * 24 * 7, unit: 'week' },
    { threshold: 60 * 60 * 24, unit: 'day' },
    { threshold: 60 * 60, unit: 'hour' },
    { threshold: 60, unit: 'minute' },
    { threshold: 0, unit: 'second' },
  ] as const

  let result: RelativeTimeFormatUnitAutoResult

  if (unit) {
    result = { value, unit, remainder: 0 }
  } else {
    const timeUnit =
      timeUnits.find((tu) => absValue >= tu.threshold) ?? timeUnits[timeUnits.length - 1]
    const divisor = timeUnit.unit === 'second' ? 1 : timeUnit.threshold

    result = {
      value: Math.floor(value / divisor),
      unit: timeUnit.unit,
      remainder: value % divisor,
    }
  }

  return result
}
