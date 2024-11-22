import type { ContainerProps } from '@mui/material'
import React from 'react'
import { Row } from '../Row'

export type QuoteProps = {
  children: React.ReactElement
} & ContainerProps

export function Quote(props: QuoteProps) {
  const { children, ...containerProps } = props

  return <Row {...containerProps}>{children}</Row>
}
