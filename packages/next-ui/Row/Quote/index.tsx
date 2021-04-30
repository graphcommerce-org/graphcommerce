import React from 'react'
import Row from '..'

type QuoteProps = {
  children: React.ReactElement
}

export default function Quote(props: QuoteProps) {
  const { children } = props

  return <Row>{children}</Row>
}
