import { useLocale, useMemoObject } from '../hooks'

export type UseLocalesArgumentOptions<T extends object = object> = {
  /**
   * @default useLocale()
   */
  locale?: Intl.LocalesArgument
} & T

export function useLocalesArgument<T extends object = object>(props: UseLocalesArgumentOptions<T>) {
  const { locale, ...options } = props
  const storeLocale = useLocale()
  return [useMemoObject(locale ?? storeLocale), options] as const
}
