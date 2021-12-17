import { FullPageMessage, SvgImageSimple, iconShoppingBag, Button } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import Link from 'next/link'
import React from 'react'

type EmptyCartProps = { children?: React.ReactNode }
export default function EmptyCart(props: EmptyCartProps) {
  const { children } = props

  return (
    <FullPageMessage
      title={<Trans>Your cart is empty</Trans>}
      icon={<SvgImageSimple src={iconShoppingBag} size='xxl' />}
      button={
        <Link href='/' passHref>
          <Button variant='pill' color='secondary' size='large'>
            <Trans>Continue shopping</Trans>
          </Button>
        </Link>
      }
    >
      {children ?? <Trans>Discover our collection and add items to your cart!</Trans>}
    </FullPageMessage>
  )
}
