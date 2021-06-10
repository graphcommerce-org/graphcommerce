import { usePageContext } from '../context/pageContext'
import { usePageRouter } from '../context/pageRouterContext'

/**
 * When a user is navigating inside an overlay we need to navigate multiple steps backwards to close
 * the overlay.
 */
export function useCloseOverlay(): () => void | undefined {
  const { backSteps } = usePageContext()
  const router = usePageRouter()

  return () => {
    for (let i = 0; i < backSteps; i++) {
      router.back()
    }
  }
}
