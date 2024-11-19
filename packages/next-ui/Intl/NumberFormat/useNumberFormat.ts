import { SxProps, Theme } from '@mui/material'
import { useMemo } from 'react'
import { useMemoObject } from '../../hooks/useMemoObject'
import { useLocalesArgument, UseLocalesArgumentOptions } from '../useLocalesArgument'

export type UseNumberFormatProps = {
  numberStyle: Intl.NumberFormatOptions['style']
  sx?: SxProps<Theme>
} & Omit<Intl.NumberFormatOptions, 'style'> &
  UseLocalesArgumentOptions

export function useNumberFormat(props: UseNumberFormatProps) {
  const [locales, { numberStyle, ...options }] = useLocalesArgument(props)
  const memoOptions = useMemoObject({ ...options, style: numberStyle })
  return useMemo(() => new Intl.NumberFormat(locales, memoOptions), [locales, memoOptions])
}
