import { useRouter } from 'next/router'
import { useState } from 'react'

export default function useNavigationDirection() {
  const router = useRouter()
  const [historyState, setNavigationState] = useState<string[]>([router.asPath])

  function getDirection(url: string): 1 | 0 | -1 {
    // Navigated to previous page
    if (historyState[historyState.length - 2] === url) {
      setNavigationState(historyState.slice(0, -1))
      return -1
    }
    // Navigated to same page, do nothing
    if (historyState[historyState.length - 1] === url) {
      return 0
    }
    // Navigated to next page
    setNavigationState([...historyState, url])
    return 1
  }

  return getDirection
}
