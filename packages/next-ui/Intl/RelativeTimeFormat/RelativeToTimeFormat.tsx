import { forwardRef, useMemo } from 'react'
import type { DateValue } from '../DateTimeFormat/toDate'
import { toDate } from '../DateTimeFormat/toDate'
import type { RelativeTimeFormatProps } from './RelativeTimeFormat'
import { RelativeTimeFormat } from './RelativeTimeFormat'

type RelativeToTimeFormatProps = Omit<RelativeTimeFormatProps, 'value' | 'children'> & {
  /** Date to format a relative value for. */
  date: DateValue
  /**
   * If provided, the component will format a relative value to this date. Else, it will format a
   * relative value to the current date.
   */
  to?: DateValue
}

/**
 * Relative to the the current date.
 *
 * @public
 */
export const RelativeToTimeFormat = forwardRef<HTMLSpanElement, RelativeToTimeFormatProps>(
  (props, ref) => {
    const { date, to, ...rest } = props

    const relativeTo = useMemo(() => {
      const dateValue = toDate(date)
      if (!dateValue) return 0
      const toDateValue = (to && toDate(to)) || new Date()

      return Math.round((dateValue.getTime() - toDateValue.getTime()) / 1000)
    }, [date, to])

    return <RelativeTimeFormat {...rest} ref={ref} value={relativeTo} />
  },
)
