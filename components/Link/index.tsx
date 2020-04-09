import React from 'react'
import NextLink from 'next/link'
import MaterialLink, { LinkProps } from '@material-ui/core/Link'

export function getCanonical(url: string) {
  return url
}

// Generate the path from theh URL
// todo(paales) We should probably do something with the router to regex the routes.
export function getPagePath(url: string) {
  const urlParts = url.split('/')
  if (urlParts[1] === 'blog' && urlParts[2]) urlParts[2] = '[url]'
  if (urlParts[2] === 'blog' && urlParts[3]) urlParts[3] = '[url]'
  return `${urlParts.join('/')}`
}

// Generate a next/link from a GraphCms Page.
const Link: React.FC<{ href: string; metaRobots: GQLMetaRobots } & LinkProps> = ({
  href: url,
  metaRobots,
  children,
  ...linkProps
}) => {
  const materialLinkProps: LinkProps = {
    ...linkProps,
    ...(metaRobots.includes('NOFOLLOW') && {
      rel: 'nofollow',
    }),
  }

  return (
    <NextLink href={getPagePath(url)} as={getCanonical(url)} passHref>
      <MaterialLink {...materialLinkProps}>{children}</MaterialLink>
    </NextLink>
  )
}

export default Link
