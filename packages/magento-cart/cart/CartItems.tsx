import AnimatedRow from '@reachdigital/next-ui/AnimatedRow'
import RenderType, { TypeRenderer } from '@reachdigital/next-ui/RenderType'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { CartItemsFragment } from './CartItems.gql'

type CartItemRenderer = TypeRenderer<
  NonNullable<NonNullable<CartItemsFragment['items']>[0]>,
  { cartId: string } // should probably be imported from CartItemBaseProps
>

type CartProps = CartItemsFragment & { renderer: CartItemRenderer }

export default function CartItems(props: CartProps) {
  const { renderer, items, id } = props

  return (
    <AnimatePresence initial={false}>
      {items?.map((item) => (
        <AnimatedRow key={`item-${item?.id}`}>
          {item && <RenderType renderer={renderer} {...item} cartId={id} />}
        </AnimatedRow>
      ))}
    </AnimatePresence>
  )
}
