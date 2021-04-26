import { ButtonProps } from '@reachdigital/next-ui/Button'
import NextButtonLink from '@reachdigital/next-ui/NextButtonLink'
import React from 'react'
import { PageLinkFragment } from './PageLink.gql'

type ButtonLinkProps = PageLinkFragment & ButtonProps

export default function ButtonLink(props: ButtonLinkProps) {
  return <NextButtonLink {...props} />
}
