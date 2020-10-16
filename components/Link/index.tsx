import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { PropsWithChildren } from 'react'

type LinkProps = PropsWithChildren<Omit<NextLinkProps, 'scroll' | 'passHref'>>

export default function Link(props: LinkProps) {
  // todo(paales): When we are in an overlay page, make sure that all links replace the current state.
  return <NextLink {...props} scroll={false} passHref />
}
