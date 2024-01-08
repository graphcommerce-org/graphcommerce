import { Row } from '@graphcommerce/next-ui'
import { SxProps, Theme, ContainerProps } from '@mui/material'
import { RowQuoteProps } from './type'

export type QuoteProps = {
  children: React.ReactElement
} & ContainerProps

export function RowQuote(props: RowQuoteProps & { sx?: SxProps<Theme> }) {
  const { copy, ...quoteProps } = props

  return <Row {...quoteProps}>{copy}</Row>
}
