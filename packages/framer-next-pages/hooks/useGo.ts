import { useRouter } from 'next/router'

export function useGo(delta: number) {
  const { push, back } = useRouter()
  return () => {
    if (delta >= 0) {
      // console.error(`Called .go(${delta}), only negative numbers are allowed. Redirecting to home`)
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      // push('/', '/')
      return
    }

    const deltaAbs = Math.abs(delta)
    for (let i = 0; i < deltaAbs; i++) back()
  }
}
