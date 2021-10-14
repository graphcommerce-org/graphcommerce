import { iconSadShoppingBag, FullPageMessage, SvgImageSimple } from '@graphcommerce/next-ui'
import { Button } from '@material-ui/core'
import Link from 'next/link'
import React from 'react'

type EmptyCartProps = { children?: React.ReactNode }
export default function EmptyCart(props: EmptyCartProps) {
  const { children } = props

  return (
    <FullPageMessage
      title='Your cart is empty'
      icon={<SvgImageSimple src={iconSadShoppingBag} alt='Empty Cart' layout='fill' />}
      button={
        <Link href='/' passHref>
          <Button variant='contained' color='primary' size='large'>
            Continue shopping
          </Button>
        </Link>
      }
    >
      {children ?? <>Discover our collection and add items to your basket!</>}
    </FullPageMessage>
  )
}
