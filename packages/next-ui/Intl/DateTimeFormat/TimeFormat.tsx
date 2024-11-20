import { DateTimeFormat, DateTimeFormatProps } from './DateTimeFormat'

export type TimeFormatProps = Omit<
  DateTimeFormatProps,
  'dateStyle' | 'month' | 'day' | 'era' | 'weekday' | 'year'
>

export function TimeFormat(props: TimeFormatProps) {
  return <DateTimeFormat dateStyle={undefined} {...props} />
}
