import { useI18nConfig } from '@graphcommerce/next-ui'

export function useGoogleRecaptchaSiteKey() {
  const key = useI18nConfig().googleRecaptchaKey ?? import.meta.graphCommerce.googleRecaptchaKey
  if (!key) throw new Error('[@graphcommerce/googlerecaptcha]: googleRecaptchaKey not configured')
  return key
}
