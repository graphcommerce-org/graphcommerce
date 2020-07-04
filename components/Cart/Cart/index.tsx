import React from 'react'

export default function Cart() {
  const cartId = useCartId()

  return <div>{cartId}</div>
}
