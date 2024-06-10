import { useRouter } from 'next/router'
import { usePrevPageRouter } from './usePrevPageRouter'

export type UseHistoryLink = { href: string }

type ClickEvent = { preventDefault: () => void }

export function useHistoryLink(options: UseHistoryLink) {
  const { href } = options
  const prevRouter = usePrevPageRouter()
  const router = useRouter()

  const onClick = (e: ClickEvent) => {
    e.preventDefault()

    if (href === prevRouter?.asPath) return router.back()
    return router.replace(href)
  }

  return { onClick, href }
}

export function useHistoryGo(options: UseHistoryLink) {
  const { onClick } = useHistoryLink(options)
  return () => onClick({ preventDefault: () => {} })
}
