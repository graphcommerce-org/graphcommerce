import { useRouter } from 'next/router'

export function useDisplayInclTax(): boolean {
  const { locale } = useRouter()
  const locales = (process.env.NEXT_PUBLIC_DISPLAY_INCL_TAX ?? '').split(',').map((i) => i.trim())
  return locale ? locales.includes(locale) : false
}
