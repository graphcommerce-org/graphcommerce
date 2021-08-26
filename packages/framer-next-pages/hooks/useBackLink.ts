import { LinkProps } from 'next/link'
import { useRouter } from 'next/router'

type useBackLinkProps = {
  href: string
}

export default function useBackLink(props: useBackLinkProps): LinkProps {
  const { href } = props
  const router = useRouter()
  const prevHref = '/test/usebacklink' // todo...

  const sameLink = href === prevHref

  return {
    href,
    ...(sameLink && { onClick: () => router.back() }),
  }
}
