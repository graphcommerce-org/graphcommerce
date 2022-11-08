import type { ApolloErrorSnackbarProps } from '@graphcommerce/ecommerce-ui'
import type { PluginProps } from '@graphcommerce/next-config'
import { useGoogleRecaptcha } from '../hooks/useGoogleRecaptcha'

export const component = 'ApolloErrorSnackbar'
export const exported = '@graphcommerce/ecommerce-ui'

function GrecaptchaApolloErrorSnackbar(props: PluginProps<ApolloErrorSnackbarProps>) {
  const { Prev } = props
  useGoogleRecaptcha()
  return <Prev {...props} />
}

export const Plugin = GrecaptchaApolloErrorSnackbar
