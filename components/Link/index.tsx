import React from 'react'
import NextLink from 'next/link'
import { ButtonProps, Button as MuiButton, Link as MuiLink, LinkProps } from '@material-ui/core'
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
      <MuiLink {...materialLinkProps}>{children}</MuiLink>
    </NextLink>
  )
}

export default Link

// Generate a next/link from a GraphCms Page.
export const Button: React.FC<{ href: string; metaRobots: GQLMetaRobots } & ButtonProps> = ({
  href,
  metaRobots,
  children,
  ...buttonProps
}) => {
  const materialButtonProps: ButtonProps = {
    ...buttonProps,
    ...(metaRobots.includes('NOFOLLOW') && {
      rel: 'nofollow',
    }),
  }

  return (
    <NextLink href={getHref(href)} as={href} passHref>
      <MuiButton {...materialButtonProps}>{children}</MuiButton>
    </NextLink>
  )
}
