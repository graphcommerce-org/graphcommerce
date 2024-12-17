import { useLocale, useMemoObject } from '../hooks'

export type UseIntlLocalesArgumentOptions<T extends object = object> = {
  /**
   * @default useLocale()
   */
  locale?: Intl.LocalesArgument
} & T

export function useIntlLocalesArgument<T extends object = object>(
  props: UseIntlLocalesArgumentOptions<T>,
) {
  const { locale, ...options } = props
  const storeLocale = useLocale()
  return [useMemoObject(locale ?? storeLocale), options] as const
}
