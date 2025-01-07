import type { SxProps, Theme } from '@mui/material'
import { useMemo } from 'react'
import { useMemoObject } from '../../hooks/useMemoObject'
import type { UseIntlLocalesArgumentOptions } from '../useIntlLocalesArgument'
import { useIntlLocalesArgument } from '../useIntlLocalesArgument'

export type UseIntlNumberFormatOptions = {
  numberStyle: Intl.NumberFormatOptions['style']
  sx?: SxProps<Theme>
} & Omit<Intl.NumberFormatOptions, 'style'> &
  UseIntlLocalesArgumentOptions

export function useIntlNumberFormat(props: UseIntlNumberFormatOptions) {
  const [locales, { numberStyle, ...options }] = useIntlLocalesArgument(props)
  const memoOptions = useMemoObject({ ...options, style: numberStyle })
  return useMemo(() => new Intl.NumberFormat(locales, memoOptions), [locales, memoOptions])
}
