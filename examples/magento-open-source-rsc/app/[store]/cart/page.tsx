import type { Metadata } from 'next'
import { CartContent } from './CartContent'

export const metadata: Metadata = {
  title: 'Cart',
  robots: { index: false, follow: false },
}

/** Cart page - renders CartContent for both full page and overlay contexts. */
export default function CartPage() {
  return <CartContent />
}
