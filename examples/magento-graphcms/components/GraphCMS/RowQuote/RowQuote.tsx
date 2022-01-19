import { RichTextQuote } from '@graphcommerce/graphcms-ui'
import { Quote } from '@graphcommerce/next-ui'
import React from 'react'
import { RowQuoteFragment } from './RowQuote.gql'

type RowQuoteProps = RowQuoteFragment

export function RowQuote(props: RowQuoteProps) {
  const { quote } = props

  return (
    <Quote>
      <RichTextQuote {...quote} />
    </Quote>
  )
}
