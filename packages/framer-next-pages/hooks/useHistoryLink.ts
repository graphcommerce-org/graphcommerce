import { useRouter } from 'next/compat/router'
import { usePrevPageRouter } from './usePrevPageRouter'

export type UseHistoryLink = { href: string }

type ClickEvent = { preventDefault: () => void }

export function useHistoryLink(options: UseHistoryLink) {
  const { href } = options
  const prevRouter = usePrevPageRouter()
  const router = useRouter()

  const onClick =
    href === prevRouter?.asPath
      ? (e: ClickEvent) => {
          e.preventDefault()
          router.back()
        }
      : undefined

  return { onClick, href }
}

export function useHistoryGo(options: UseHistoryLink) {
  const { onClick, href } = useHistoryLink(options)
  const router = useRouter()

  return () => {
    if (onClick) onClick({ preventDefault: () => {} })
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    else router.push(href)
  }
}
