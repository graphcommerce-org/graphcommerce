import { usePageRouter } from './usePageRouter'
import { usePrevPageRouter } from './usePrevPageRouter'

export type UseHistoryLink = { href: string }

type ClickEvent = { preventDefault: () => void }

export function useHistoryLink(options: UseHistoryLink) {
  const { href } = options
  const prevRouter = usePrevPageRouter()

  const onClick =
    href === prevRouter?.asPath
      ? (e: ClickEvent) => {
          e.preventDefault()
          prevRouter.back()
        }
      : undefined

  return { onClick, href }
}

export function useHistoryGo(options: UseHistoryLink) {
  const { onClick, href } = useHistoryLink(options)
  const router = usePageRouter()

  return () => {
    if (onClick) onClick({ preventDefault: () => {} })
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    else router.push(href)
  }
}
