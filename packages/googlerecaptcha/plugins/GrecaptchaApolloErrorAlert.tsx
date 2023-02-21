import type { ApolloErrorAlertProps } from '@graphcommerce/ecommerce-ui'
import type { PluginProps } from '@graphcommerce/next-config'
import { useGoogleRecaptcha } from '../hooks/useGoogleRecaptcha'

export const component = 'ApolloErrorAlert'
export const exported = '@graphcommerce/ecommerce-ui'
export const ifConfig = 'googleRecaptchaKey'

function GrecaptchaApolloErrorAlert(props: PluginProps<ApolloErrorAlertProps>) {
  const { Prev, ...rest } = props
  useGoogleRecaptcha()
  return <Prev {...rest} />
}

export const Plugin = GrecaptchaApolloErrorAlert
