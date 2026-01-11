import { CartClient } from '../../cart/CartClient'

/**
 * Intercepted cart overlay. This is rendered as a parallel route when navigating to /cart from
 * within the app. It shows the cart in an overlay while keeping the underlying page visible.
 *
 * Uses the same CartClient component as the full cart page for consistency.
 */
export default function CartOverlay() {
  return <CartClient />
}
