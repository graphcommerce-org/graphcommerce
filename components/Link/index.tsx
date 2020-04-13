import React from 'react'
import NextLink from 'next/link'
import MaterialLink, { LinkProps } from '@material-ui/core/Link'
import routes from './routes.json'

function getHref(sourceHref: string): string {
  const route = (routes as [string, string][]).find(([regex]) => sourceHref.match(regex))
  if (route) return route[1]
  return sourceHref
}

// Generate a next/link from a GraphCms Page.
const Link: React.FC<{ href: string; metaRobots: GQLMetaRobots } & LinkProps> = ({
  href,
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
    <NextLink href={getHref(href)} as={href} passHref>
      <MaterialLink {...materialLinkProps}>{children}</MaterialLink>
    </NextLink>
  )
}

export default Link
