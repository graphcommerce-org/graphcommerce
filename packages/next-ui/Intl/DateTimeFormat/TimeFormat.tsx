import { DateTimeFormat, DateTimeFormatPropsType } from './DateTimeFormat'

type TimeFormatProps = Omit<
  DateTimeFormatPropsType,
  'dateStyle' | 'month' | 'day' | 'era' | 'month' | 'weekday' | 'year'
>

export function TimeFormat(props: TimeFormatProps) {
  return <DateTimeFormat dateStyle={undefined} {...props} />
}
