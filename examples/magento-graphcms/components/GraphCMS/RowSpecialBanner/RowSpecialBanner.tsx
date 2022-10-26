import { RichText, Asset } from '@graphcommerce/graphcms-ui'
import { breakpointVal, SpecialBanner, Link } from '@graphcommerce/next-ui'
import { RowSpecialBannerFragment } from './RowSpecialBanner.gql'

type RowSpecialBannerProps = RowSpecialBannerFragment

export function RowSpecialBanner(props: RowSpecialBannerProps) {
  const { copy, asset, topic, pageLinks } = props

  return (
    <SpecialBanner
      topic={topic}
      asset={asset && <Asset asset={asset} sizes='50vw' />}
      pageLinks={pageLinks.map((pageLink) => (
        <Link href={pageLink.url} key={pageLink.id} underline='always' color='inherit'>
          {pageLink.title}
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
