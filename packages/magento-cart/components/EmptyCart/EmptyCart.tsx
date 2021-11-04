import { FullPageMessage, SvgImageSimple, iconSadFace } from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { Button } from '@material-ui/core'
import Link from 'next/link'
import React from 'react'

type EmptyCartProps = { children?: React.ReactNode }
export default function EmptyCart(props: EmptyCartProps) {
  const { children } = props

  return (
    <FullPageMessage
      title={t`Your cart is empty`}
      icon={<SvgImageSimple src={iconSadFace} size='xxl' />}
      button={
        <Link href='/' passHref>
          <Button variant='contained' color='primary' size='large'>
            <Trans>Continue shopping</Trans>
          </Button>
        </Link>
      }
    >
      {children ?? <Trans>Discover our collection and add items to your basket!</Trans>}
    </FullPageMessage>
  )
}
