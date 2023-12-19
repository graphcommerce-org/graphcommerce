import { SxProps, Theme, ContainerProps } from '@mui/material'
import { RichText } from '../Renderer/RichText'
import { Row } from '../Row'
import { RowQuoteProps } from './type'

export type QuoteProps = {
  children: React.ReactElement
} & ContainerProps

export function RowQuote(props: RowQuoteProps & { sx?: SxProps<Theme> }) {
  const { copy, ...quoteProps } = props

  return (
    <Row {...quoteProps}>
      <RichText
        {...copy}
        sxRenderer={{
          paragraph: (theme) => ({
            typography: 'h4',
            fontWeight: 600,
            '@supports (font-variation-settings: normal)': {
              fontVariationSettings: "'wght' 620",
            },
            textTransform: 'uppercase' as const,
            maxWidth: '60%',
            textAlign: 'center' as const,
            margin: '0 auto',
            [theme.breakpoints.up('lg')]: {
              maxWidth: '80%',
            },
          }),
        }}
      />
    </Row>
  )
}
