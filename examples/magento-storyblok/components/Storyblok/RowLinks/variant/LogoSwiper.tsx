import { VariantLogoSwiper } from '@graphcommerce/next-ui'
import { Asset } from '@graphcommerce/storyblok-ui'
import { Link } from '@mui/material'
import type { RowLinksVariantProps } from '../RowLinks'

export function LogoSwiper(props: RowLinksVariantProps) {
  const { title, page_links } = props

  return (
    <VariantLogoSwiper
      title={title}
      maxWidth={false}
      sx={(theme) => ({ my: `calc(${theme.spacings.xxl} + ${theme.spacings.md})` })}
    >
      {page_links?.map((pageLink) => (
        // eslint-disable-next-line no-underscore-dangle
        <Link
          href={pageLink.url ?? ''}
          key={pageLink._uid}
          color='inherit'
          underline='hover'
          sx={{ '& img, & video': { display: 'block' } }}
        >
          {pageLink.asset && (
            <Asset
              asset={pageLink.asset}
              sizes={{ 0: '120px', 960: '240px' }}
              sx={(theme) => ({
                filter: 'none',
                ...theme.applyStyles('dark', { filter: 'invert(100%)' }),
              })}
            />
          )}
        </Link>
      ))}
    </VariantLogoSwiper>
  )
}
