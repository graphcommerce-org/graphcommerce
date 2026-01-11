import { CartContent } from '../../cart/CartContent'

/**
 * Intercepted cart overlay. This is rendered as a parallel route when navigating to /cart from
 * within the app. It shows the cart in an overlay while keeping the underlying page visible.
 */
export default function CartOverlay() {
  return <CartContent />
}
