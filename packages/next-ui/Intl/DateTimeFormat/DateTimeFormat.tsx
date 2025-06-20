import { Box, type SxProps, type Theme } from '@mui/material'
import { useMemo } from 'react'
import type { DateValue } from './toDate'
import { toDate } from './toDate'
import type { UseIntlDateTimeFormatOptions } from './useIntlDateTimeFormat'
import { useIntlDateTimeFormat } from './useIntlDateTimeFormat'

export type DateTimeFormatProps = UseIntlDateTimeFormatOptions & {
  date: DateValue
  sx?: SxProps<Theme>
}

/** @public */
export function DateTimeFormat(props: DateTimeFormatProps) {
  const { date, sx, ...options } = props
  const formatter = useIntlDateTimeFormat({ dateStyle: 'medium', timeStyle: 'short', ...options })

  const dateValue = useMemo(() => toDate(date), [date])
  return (
    <Box component='span' className='DateTimeFormat' suppressHydrationWarning sx={sx}>
      {dateValue &&
        formatter.formatToParts(dateValue).map((part) => (
          <span className={part.type} key={part.type} suppressHydrationWarning>
            {part.value}
          </span>
        ))}
    </Box>
  )
}
