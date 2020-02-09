import Link from 'next/link'
import { GQLMetaRobots } from '../generated/graphql'

export function getCanonical(url: string) {
  return `/${url}`
}

// Generate the path from theh URL
// todo(paales) We should probably do something with the router to regex the routes.
export function getPagePath(url: string) {
  const urlParts = url.split('/')
  if (urlParts[0] === 'blog' && urlParts[1]) urlParts[1] = '[slug]'
  if (urlParts[1] === 'blog' && urlParts[2]) urlParts[2] = '[slug]'
  return `/${urlParts.join('/')}`
}

// Generate a next/link from a GraphCms Page.
const GraphCmsLink: React.FC<{ href: string; metaRobots: GQLMetaRobots }> = ({
  href: url,
  metaRobots,
  children,
}) => {
  const aProps: React.HTMLProps<HTMLAnchorElement> = {}
  if (metaRobots.includes('NOINDEX')) aProps.rel = 'nofollow'

  return (
    <Link href={getPagePath(url)} as={getCanonical(url)}>
      <a {...aProps}>{children}</a>
    </Link>
  )
}

export { GraphCmsLink as Link }
