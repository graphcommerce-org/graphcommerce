import { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { usePageContext } from './usePageContext'

type useBackLinkProps = {
  href: string
}

type useBackLinkOutput = Pick<LinkProps, 'href'> & { onClick?: () => void }

export default function useBackLink(props: useBackLinkProps): useBackLinkOutput {
  const { href } = props
  const pageContext = usePageContext()
  const router = useRouter()

  if (pageContext.history.length < 1) {
    return {
      href,
    }
  }

  const prevHref = pageContext.history[pageContext.history.length - 2]
  const sameHref = href === prevHref

  return {
    href: sameHref ? '' : href,
    ...(sameHref && {
      onClick: () => {
        pageContext.history.pop()
        router.back()
      },
    }),
  }
}
