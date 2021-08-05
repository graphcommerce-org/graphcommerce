import RichTextQuote from '@reachdigital/graphcms-ui/RichText/RichTextQuote'
import { Quote } from '@reachdigital/next-ui'
import React from 'react'
import { RowQuoteFragment } from './RowQuote.gql'

type RowQuoteProps = RowQuoteFragment

export default function RowQuote(props: RowQuoteProps) {
  const { quote } = props

  return (
    <Quote>
      <RichTextQuote {...quote} />
    </Quote>
  )
}
