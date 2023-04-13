import { useRouter } from 'next/compat/router'

export function useGo(delta: number) {
  const { push } = useRouter()
  return () => {
    if (delta >= 0) {
      console.error(`Called .go(${delta}), only negative numbers are allowed. Redirecting to home`)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      push('/', '/')
      return
    }

    window.history.go(delta)
  }
}
