import NextLink, { LinkProps } from 'next/link'
import { PropsWithChildren } from 'react'

export type PageLinkProps = PropsWithChildren<Omit<LinkProps, 'scroll' | 'passHref'>>

export default function PageLink(props: PageLinkProps) {
  // todo(paales): When we are in an overlay page, make sure that all links replace the current state.
  return <NextLink {...props} scroll={false} passHref />
}
