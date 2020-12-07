import NextButton, { ButtonProps } from '@reachdigital/next-ui/Button'
import NextUiPageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import { PageLinkFragment } from './PageLink.gql'

type PageLinkProps = PageLinkFragment & ButtonProps

export default function Button(props: PageLinkProps) {
  const { title, url, ...buttonProps } = props
  return (
    <NextUiPageLink href={url}>
      <NextButton {...buttonProps}>{title}</NextButton>
    </NextUiPageLink>
  )
}
