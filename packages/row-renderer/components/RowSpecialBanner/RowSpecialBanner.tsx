import { Asset, SpecialBanner } from '@graphcommerce/next-ui'
import { Link } from '@mui/material'
import { RowSpecialBannerProps } from './type'

export function RowSpecialBanner(props: RowSpecialBannerProps) {
  const { copy, asset, title, links } = props

  return (
    <SpecialBanner
      topic={title}
      asset={asset && <Asset asset={asset} sizes='50vw' />}
      pageLinks={links.map(({ url, title: linkTitle }) => (
        <Link underline='always' href={url} key={url} title={linkTitle} color='inherit'>
          {linkTitle}
        </Link>
      ))}
    >
      {copy}
    </SpecialBanner>
  )
}
