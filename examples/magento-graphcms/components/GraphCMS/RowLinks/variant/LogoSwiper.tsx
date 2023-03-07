import { Asset } from '@graphcommerce/graphcms-ui'
import { NextLink, VariantLogoSwiper } from '@graphcommerce/next-ui'
import { Link } from '@mui/material'
import { RowLinksFragment } from '../RowLinks.gql'

export function LogoSwiper(props: RowLinksFragment) {
  const { title, pageLinks } = props

  return (
    <VariantLogoSwiper title={title} maxWidth={false}>
      {pageLinks.map((pageLink) => (
        <Link component={NextLink} href={pageLink.url} key={pageLink.id}>
          {pageLink?.asset && (
            <Asset
              asset={pageLink.asset}
              sx={{
                width: () => {
                  const widthBase = 60
                  const scaleFactor = 0.525
                  const originalWidth = pageLink?.asset?.width || 0
                  const originalHeight = pageLink?.asset?.height || 0
                  const imageRatio = originalWidth / originalHeight
                  const width = imageRatio ** scaleFactor * widthBase
                  return { xs: width * 0.65, sm: width * 0.8, md: width * 0.9, lg: width }
                },
                display: 'block',
                filter: 'none',
              }}
              sizes={{ 0: '120px', 960: '240px' }}
            />
          )}
        </Link>
      ))}
    </VariantLogoSwiper>
  )
}
