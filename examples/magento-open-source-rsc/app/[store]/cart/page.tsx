import type { Metadata } from 'next'
import { CartClient } from './CartClient'

type CartPageProps = {
  params: Promise<{ store: string }>
}

export async function generateMetadata({ params }: CartPageProps): Promise<Metadata> {
  const { store } = await params
  return {
    title: 'Cart',
    robots: { index: false, follow: false },
  }
}

/** Cart page (RSC) - renders the CartClient component for client-side cart interactions. */
export default async function CartPage({ params }: CartPageProps) {
  return <CartClient />
}
