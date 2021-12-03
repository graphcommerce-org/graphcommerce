import { usePageRouter } from '@graphcommerce/framer-next-pages'

export function useDisplayInclTax(): boolean {
  const { locale } = usePageRouter()
  const locales = (process.env.NEXT_PUBLIC_DISPLAY_INCL_TAX ?? '').split(',').map((i) => i.trim())
  return locale ? locales.includes(locale) : false
}
