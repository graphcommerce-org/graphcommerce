import { AnimatedRow, RenderType, TypeRenderer } from '@graphcommerce/next-ui'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { WishlistItem } from '..'
import { WishlistItemFragment } from '../WishlistItem/ProductWishlistItem.gql'

export type WishlistProps = { items?: [WishlistItemFragment] }

export default function WishlistItems(props: WishlistProps) {
  const { items } = props

  return (
    <AnimatePresence initial={false}>
      {items?.map((item) => {
        if (!item?.uid) return null

        return (
          <AnimatedRow key={item.uid}>
            <WishlistItem item={item} />
          </AnimatedRow>
        )
      })}
    </AnimatePresence>
  )
}
