import RichText from '@reachdigital/graphcms-ui/RichText'
import Quote from '@reachdigital/next-ui/Row/Quote'
import React from 'react'
import { RowQuoteFragment } from './RowQuote.gql'

type RowQuoteProps = RowQuoteFragment

export default function RowQuote(props: RowQuoteProps) {
  const { quote } = props

  return (
    <Quote RichContent={(richTextOneClasses) => <RichText {...richTextOneClasses} {...quote} />} />
  )
}
