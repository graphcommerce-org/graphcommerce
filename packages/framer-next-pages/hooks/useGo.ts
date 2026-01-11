import { useRouter } from 'next/navigation'

export function useGo(delta: number) {
  const router = useRouter()
  return () => {
    if (delta >= 0) {
      console.error(`Called .go(${delta}), only negative numbers are allowed. Redirecting to home`)
      router.push('/')
      return
    }

    window.history.go(delta)
  }
}
