import { RichText, breakpointVal, HeroBanner } from '@graphcommerce/next-ui'
import { Button } from '@mui/material'
import { RowHeroBannerProps } from '@graphcommerce/row-renderer'

export function RowHeroBanner(props: RowHeroBannerProps) {
  const { copy, asset, links } = props

  return (
    <HeroBanner
      pageLinks={links.map(({ url, title }) => (
        <Button key={url} href={url} variant='outlined' size='large' color='inherit'>
          {title}
        </Button>
      ))}
      videoSrc={asset.url}
      sx={(theme) => ({
        '& .HeroBanner-copy': {
          minHeight: { xs: 'min(70vh,600px)', md: 'min(70vh,1080px)' },
          [theme.breakpoints.up('sm')]: {
            padding: theme.spacings.xl,
            justifyItems: 'start',
            alignContent: 'center',
            textAlign: 'left',
            width: '50%',
          },
        },
      })}
    >
      <RichText
        {...copy}
        sxRenderer={{
          paragraph: {
            typography: 'overline',
          },
          'heading-one': (theme) => ({
            textTransform: 'uppercase',
            mt: 1,
            mb: theme.spacings.sm,
            ...breakpointVal('fontSize', 36, 82, theme.breakpoints.values),
            '& strong': {
              WebkitTextFillColor: 'transparent',
              WebkitTextStroke: `1.2px #fff`,
            },
          }),
        }}
      />
    </HeroBanner>
  )
}
