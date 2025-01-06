import { useMutation } from '@graphcommerce/graphql'
import type { CartStartCheckoutProps } from '@graphcommerce/magento-cart'
import { PluginProps } from '@graphcommerce/next-config'
import { Trans } from '@lingui/react'
import { useEffect, useState } from 'react'
import { DangerousElement } from '../components/OCI/components/DangerousElement'
import { endOciSessionDocument } from '../components/OCI/graphql/EndOciSession.gql'

export const component = 'CartStartCheckout'
export const exported = '@graphcommerce/magento-cart'

/** If cart has is_oci prop, replace Go to checkout button with button to end OCI session */
function OciCheckout(props: PluginProps<CartStartCheckoutProps>) {
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

export const Plugin = OciCheckout
