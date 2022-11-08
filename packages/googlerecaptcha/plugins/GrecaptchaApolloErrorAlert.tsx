import type { ApolloErrorAlertProps } from '@graphcommerce/ecommerce-ui'
import type { PluginProps } from '@graphcommerce/next-config'
import { useGoogleRecaptcha } from '../hooks/useGoogleRecaptcha'

export const component = 'ApolloErrorAlert'
export const exported = '@graphcommerce/ecommerce-ui'

function GrecaptchaApolloErrorAlert(props: PluginProps<ApolloErrorAlertProps>) {
  const { Prev } = props
  useGoogleRecaptcha()
  return <Prev {...props} />
}

export const Plugin = GrecaptchaApolloErrorAlert
