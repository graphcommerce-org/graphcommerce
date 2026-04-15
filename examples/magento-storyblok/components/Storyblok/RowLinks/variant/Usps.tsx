import { iconCheckmark, IconSvg, VariantUsps } from '@graphcommerce/next-ui'
import { RichText } from '@graphcommerce/storyblok-ui'
import { storyblokEditable, type SbBlokData } from '@storyblok/react'
import { Box } from '@mui/material'
import type { RowLinksVariantProps } from '../RowLinks'

export function Usps(props: RowLinksVariantProps) {
  const { title, page_links } = props

  return (
    <VariantUsps
      title={title ?? ''}
      maxWidth={false}
      sx={(theme) => ({
        '& .Scroller-root > *': {
          [theme.breakpoints.only('xs')]: {
            '&:nth-last-of-type(-n+3)': { display: 'none' },
          },
          [theme.breakpoints.only('sm')]: {
            '&:nth-last-of-type(-n+2)': { display: 'none' },
          },
          [theme.breakpoints.only('md')]: {
            '&:nth-last-of-type(-n+1)': { display: 'none' },
          },
        },
      })}
    >
      {page_links?.map((pageLink) => (
        <Box
          {...storyblokEditable(pageLink as unknown as SbBlokData)}
          key={pageLink._uid}
          sx={{ display: 'inline-flex', flexWrap: 'nowrap', gap: 1, alignItems: 'center' }}
        >
          <IconSvg src={iconCheckmark} sx={{ color: 'primary.main' }} />
          <Box>
            {pageLink.title}{' '}
            {pageLink.description && (
              <RichText
                content={pageLink.description}
                sxRenderer={{
                  paragraph: { display: 'inline' },
                  a: { color: 'text.primary', textDecoration: 'underline' },
                }}
              />
            )}
          </Box>
        </Box>
      ))}
    </VariantUsps>
  )
}
