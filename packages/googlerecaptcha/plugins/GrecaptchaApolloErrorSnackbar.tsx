import type { ApolloErrorSnackbarProps } from '@graphcommerce/ecommerce-ui'
import type { PluginProps } from '@graphcommerce/next-config'
import { useGoogleRecaptcha } from '../hooks/useGoogleRecaptcha'

export const component = 'ApolloErrorSnackbar'
export const exported = '@graphcommerce/ecommerce-ui'
export const ifConfig = 'googleRecaptchaKey'

function GrecaptchaApolloErrorSnackbar(props: PluginProps<ApolloErrorSnackbarProps>) {
  const { Prev, ...rest } = props
  useGoogleRecaptcha()
  return <Prev {...rest} />
}

export const Plugin = GrecaptchaApolloErrorSnackbar
