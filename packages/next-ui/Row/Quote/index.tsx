import { ContainerProps } from '@mui/material'
import React from 'react'
import Row from '..'

export type QuoteProps = {
  children: React.ReactElement
} & ContainerProps

export default function Quote(props: QuoteProps) {
  const { children, ...containerProps } = props

  return <Row {...containerProps}>{children}</Row>
}
