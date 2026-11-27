import { VariantLogoSwiper } from '@graphcommerce/next-ui'
import {
  Asset,
  assetWithPoster,
  multilinkHref,
  parseDimensions,
  storyblokEditable,
} from '@graphcommerce/storyblok-ui'
import { Link } from '@mui/material'
import type { RowLinksVariantProps } from '../RowLinks'

export function LogoSwiper(props: RowLinksVariantProps) {
  const { title, page_links } = props

  return (
    <VariantLogoSwiper
      title={title ?? ''}
      maxWidth={false}
      sx={(theme) => ({ my: `calc(${theme.spacings.xxl} + ${theme.spacings.md})` })}
    >
      {page_links?.map((pageLink) => {
        const { asset, poster } = assetWithPoster(pageLink.asset)

        return (
          <Link
            {...storyblokEditable(pageLink)}
            href={multilinkHref(pageLink.url)}
            key={pageLink._uid}
            color='inherit'
            underline='hover'
            sx={{ '& img, & video': { display: 'block' } }}
          >
            {asset && (
              <Asset
                asset={asset}
                poster={poster}
                sizes={{ 0: '120px', 960: '240px' }}
                sx={(theme) => {
                  const dimensions = parseDimensions(asset.filename ?? '')

                  return {
                    ...(dimensions && {
                      width: () => {
                        const widthBase = 60
                        const scaleFactor = 0.525
                        const imageRatio = dimensions.width / dimensions.height
                        const w = imageRatio ** scaleFactor * widthBase
                        return { xs: w * 0.65, sm: w * 0.8, md: w * 0.9, lg: w }
                      },
                    }),
                    filter: 'none',
                    ...theme.applyStyles('dark', { filter: 'invert(100%)' }),
                  }
                }}
              />
            )}
          </Link>
        )
      })}
    </VariantLogoSwiper>
  )
}
