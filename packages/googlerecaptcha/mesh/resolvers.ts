import type { Resolvers } from '@graphcommerce/graphql-mesh'
import { storefrontFromContext } from '@graphcommerce/magento-store'
import { googleRecaptchaKey } from '@graphcommerce/next-config/config'

export const resolvers: Resolvers = {
  Query: {
    recaptchaV3Config: (root, args, context, info) => {
      const config = storefrontFromContext(context)
      const key = config?.googleRecaptchaKey ?? googleRecaptchaKey

      if (!key) return null
      return {
        website_key: key,
        minimum_score: 0,
        badge_position: '',
        failure_message: '',
        is_enabled: !!key,
        forms: [
          'PLACE_ORDER',
          'CONTACT',
          'CUSTOMER_LOGIN',
          'CUSTOMER_FORGOT_PASSWORD',
          'CUSTOMER_CREATE',
          'CUSTOMER_EDIT',
          'NEWSLETTER',
          'PRODUCT_REVIEW',
          'SENDFRIEND',
          'BRAINTREE',
        ],
      }
    },
  },
}
