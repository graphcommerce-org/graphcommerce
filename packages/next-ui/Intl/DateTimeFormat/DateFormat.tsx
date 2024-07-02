import { DateTimeFormat, DateTimeFormatPropsType } from './DateTimeFormat'

type DateFormatOptions = Omit<
  DateTimeFormatPropsType,
  'timeStyle' | 'hour' | 'minute' | 'second' | 'timeZoneName'
>

export function DateFormat(props: DateFormatOptions) {
  return <DateTimeFormat timeStyle={undefined} {...props} />
}
