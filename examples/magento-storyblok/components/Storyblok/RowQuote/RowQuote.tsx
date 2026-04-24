import { Quote } from '@graphcommerce/next-ui'
import { RichText, storyblokEditable } from '@graphcommerce/storyblok-ui'
import type { StoryblokRowQuote as RowQuoteBlok } from '../types'

export function RowQuote({ blok }: { blok: RowQuoteBlok }) {
  return (
    <Quote {...storyblokEditable(blok)}>
      {blok.quote && (
        <RichText
          content={blok.quote}
          sxRenderer={{
            paragraph: (theme) => ({
              typography: 'h4',
              fontWeight: 600,
              '@supports (font-variation-settings: normal)': {
                fontVariationSettings: "'wght' 620",
              },
              textTransform: 'uppercase',
              maxWidth: '60%',
              textAlign: 'center',
              margin: '0 auto',
              [theme.breakpoints.up('lg')]: { maxWidth: '80%' },
            }),
          }}
        />
      )}
    </Quote>
  )
}
