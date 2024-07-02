import { Box, SxProps, Theme } from '@mui/material'
import { useMemo } from 'react'
import { useLocale } from '../../hooks/useLocale'
import { useMemoObject } from '../../hooks/useMemoObject'

export type NumberFormatPropsType = {
  children?: number | bigint | null | undefined
  numberStyle: Intl.NumberFormatOptions['style']
  sx?: SxProps<Theme>
} & Omit<Intl.NumberFormatOptions, 'style'>

export function NumberFormat(props: NumberFormatPropsType) {
  const { children, numberStyle, ...options } = props

  const memoOptions = useMemoObject({ ...options, style: numberStyle })
  const locale = useLocale()
  const formatter = useMemo(() => new Intl.NumberFormat(locale, memoOptions), [locale, memoOptions])

  return (
    <Box component='span' suppressHydrationWarning>
      {children ? formatter.format(children) : null}
    </Box>
  )
}
