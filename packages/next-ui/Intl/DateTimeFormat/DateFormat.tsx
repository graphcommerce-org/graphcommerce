import type { DateTimeFormatProps } from './DateTimeFormat'
import { DateTimeFormat } from './DateTimeFormat'

export type DateFormatProps = Omit<
  DateTimeFormatProps,
  'timeStyle' | 'hour' | 'minute' | 'second' | 'timeZoneName'
>

/** @public */
export function DateFormat(props: DateFormatProps) {
  return <DateTimeFormat timeStyle={undefined} {...props} />
}
