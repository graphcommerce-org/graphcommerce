import { RichText, Asset, SpecialBanner, breakpointVal } from '@graphcommerce/next-ui'
import { Link } from '@mui/material'
import { RowSpecialBannerProps } from '@graphcommerce/row-renderer'

export function RowSpecialBanner(props: RowSpecialBannerProps) {
  const { copy, asset, title, links } = props

  return (
    <SpecialBanner
      topic={title}
      asset={asset && <Asset asset={asset} sizes='50vw' />}
      pageLinks={links.map(({ url, title }) => (
        <Link underline='always' href={url} key={url} title={title} color='inherit'>
          {title}
        </Link>
      ))}
    >
      <RichText
        {...copy}
        sxRenderer={{
          'heading-two': (theme) => ({
            textTransform: 'uppercase' as const,
            color: 'text.primary',
            ...breakpointVal('fontSize', 36, 82, theme.breakpoints.values),
            marginBottom: 0,
            '& strong': {
              // https://github.com/rsms/inter/issues/292#issuecomment-674993644
              color: 'background.default',
              textShadow: `1.2px 0 0 ${theme.palette.text.primary},0 1.2px 0 ${theme.palette.text.primary},-1.2px 0 0 ${theme.palette.text.primary},0 -1.2px 0 ${theme.palette.text.primary}`,
            },
          }),
        }}
      />
    </SpecialBanner>
  )
}
