import { usePrevPageRouter } from './usePrevPageRouter'

export type UseBackLinkProps = { href: string }

type ClickEvent = { preventDefault: () => void }

export function useHistoryLink(props: UseBackLinkProps) {
  const { href } = props
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
