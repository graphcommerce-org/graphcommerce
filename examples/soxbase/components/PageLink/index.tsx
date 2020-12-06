import { Theme } from '@material-ui/core'
import Button from '@reachdigital/next-ui/Button'
import NextUiPageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import { PageLinkFragment } from './PageLink.gql'

export default function PageLink(props: PageLinkFragment) {
  const { title, url } = props
  return (
    <NextUiPageLink href={url}>
      <Button variant='outlined'>{title}</Button>
    </NextUiPageLink>
  )
}
