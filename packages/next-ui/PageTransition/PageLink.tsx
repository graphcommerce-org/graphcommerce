import NextLink, { LinkProps as PageLinkProps } from 'next/link'
import { PropsWithChildren } from 'react'

type LinkProps = PropsWithChildren<Omit<PageLinkProps, 'scroll' | 'passHref'>>

export default function PageLink(props: LinkProps) {
  // todo(paales): When we are in an overlay page, make sure that all links replace the current state.
  return <NextLink {...props} scroll={false} passHref />
}
