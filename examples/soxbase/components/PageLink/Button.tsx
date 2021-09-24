import { Button as NextButton, ButtonProps } from '@graphcommerce/next-ui'
import Link from 'next/link'
import { PageLinkFragment } from './PageLink.gql'

type ButtonLinkProps = PageLinkFragment & ButtonProps

export default function Button(props: ButtonLinkProps) {
  const { title, url, ...buttonProps } = props

  return (
    <Link href={url} passHref>
      <NextButton {...buttonProps}>{title}</NextButton>
    </Link>
  )
}
