import { useMutation } from '@graphcommerce/graphql'
import type { CartStartCheckoutProps } from '@graphcommerce/magento-cart'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { Trans } from '@lingui/react'
import { useEffect, useState } from 'react'
import { DangerousElement } from '../components'
import { endOciSessionDocument } from '../graphql/EndOciSession.gql'
import type { isOciFragment } from '../graphql/InjectCartStartCheckout.gql'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-cart',
  ifConfig: 'ociSettings.enabled',
}

type OciCheckoutProps = CartStartCheckoutProps & isOciFragment

/** If cart has is_oci prop, replace Go to checkout button with button to end OCI session */
export function OciCheckoutPlugin(props: PluginProps<OciCheckoutProps>) {
  const [buttonLoading, setButtonLoading] = useState(false)
  const { Prev, buttonProps, disabled, sx, ...rest } = props
  const { is_oci, id = '' } = rest

  const [endOciSessionMutation, { data: returnHtml, loading, error }] = useMutation(
    endOciSessionDocument,
    {
      variables: {
        cartId: id,
      },
    },
  )

  useEffect(() => {
    if (error) setButtonLoading(false)
  }, [error])

  if (!is_oci) return <Prev {...rest} />

  return (
    <>
      {!loading && !error && !!returnHtml?.endOciSession?.submissionHtml && (
        <DangerousElement markup={returnHtml?.endOciSession?.submissionHtml} />
      )}
      <Prev
        disabled={buttonLoading}
        buttonProps={{
          onClick: (event) => {
            setButtonLoading(true)
            endOciSessionMutation().catch(console.error)
            event.preventDefault()
            return false
          },
          href: '#',
          children: <Trans id='Return to purchasing system' />,
        }}
        {...rest}
      />
    </>
  )
}
