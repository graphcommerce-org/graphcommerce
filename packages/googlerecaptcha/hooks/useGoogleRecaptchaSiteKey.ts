import { useStorefrontConfig } from '@graphcommerce/next-ui'

export function useGoogleRecaptchaSiteKey() {
  const key =
    useStorefrontConfig().googleRecaptchaKey ?? import.meta.graphCommerce.googleRecaptchaKey
  if (!key) throw new Error('[@graphcommerce/googlerecaptcha]: googleRecaptchaKey not configured')
  return key
}
