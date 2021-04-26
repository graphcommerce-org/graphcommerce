import NextPageLink from '@reachdigital/next-ui/NextPageLink'
import { PageLinkFragment } from './PageLink.gql'

type PageLinkProps = PageLinkFragment

export default function Link(props: PageLinkProps) {
  return (
   <NextPageLink {...props}
  )
}
