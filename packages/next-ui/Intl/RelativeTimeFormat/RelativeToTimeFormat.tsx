import { forwardRef, useMemo } from 'react'
import { DateValue, toDate } from '../DateTimeFormat/toDate'
import { RelativeTimeFormat, RelativeTimeFormatProps } from './RelativeTimeFormat'

type RelativeToTimeFormatProps = Omit<RelativeTimeFormatProps, 'children'> & {
  /**
   * Date to format a relative value for.
   */
  children: DateValue
  /**
   * If provided, the component will format a relative value to this date.
   * Else, it will format a relative value to the current date.
   */
  to?: DateValue
}

export const RelativeToTimeFormat = forwardRef<HTMLSpanElement, RelativeToTimeFormatProps>(
  (props, ref) => {
    const { children, to, ...rest } = props

    const relativeTo = useMemo(() => {
      const date = toDate(children)
      if (!date) return 0
      const toDateValue = (to && toDate(to)) || new Date()

      return Math.round((date.getTime() - toDateValue.getTime()) / 1000)
    }, [children, to])

    return (
      <RelativeTimeFormat {...rest} ref={ref}>
        {relativeTo}
      </RelativeTimeFormat>
    )
  },
)
