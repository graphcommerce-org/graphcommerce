import type { ApolloErrorFullPageProps } from '@graphcommerce/ecommerce-ui'
import type { PluginProps } from '@graphcommerce/next-config'
import { useGoogleRecaptcha } from '../hooks/useGoogleRecaptcha'

export const component = 'ApolloErrorFullPage'
export const exported = '@graphcommerce/ecommerce-ui'

function GrecaptchaApolloErrorFullPage(props: PluginProps<ApolloErrorFullPageProps>) {
  const { Prev } = props
  useGoogleRecaptcha()
  return <Prev {...props} />
}

export const Plugin = GrecaptchaApolloErrorFullPage
