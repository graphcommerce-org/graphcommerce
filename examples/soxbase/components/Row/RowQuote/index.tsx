import RichTextQuote from '@graphcommerce/graphcms-ui/RichText/RichTextQuote'
import { Quote } from '@graphcommerce/next-ui'
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
