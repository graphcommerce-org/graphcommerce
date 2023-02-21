import type { ApolloErrorFullPageProps } from '@graphcommerce/ecommerce-ui'
import type { PluginProps } from '@graphcommerce/next-config'
import { useGoogleRecaptcha } from '../hooks/useGoogleRecaptcha'

export const component = 'ApolloErrorFullPage'
export const exported = '@graphcommerce/ecommerce-ui'
export const ifConfig = 'googleRecaptchaKey'

function GrecaptchaApolloErrorFullPage(props: PluginProps<ApolloErrorFullPageProps>) {
  const { Prev, ...rest } = props
  useGoogleRecaptcha()
  return <Prev {...rest} />
}

export const Plugin = GrecaptchaApolloErrorFullPage
