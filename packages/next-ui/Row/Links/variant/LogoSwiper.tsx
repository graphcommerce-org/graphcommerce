import { Link, SxProps, Theme } from '@mui/material'
import { Asset } from '../../Asset/Asset'
import { RichText } from '../../RichText'
import { Links } from '../Links'
import { RowLinksProps } from '../type'

export function LogoSwiper(props: RowLinksProps & { sx?: SxProps<Theme> }) {
  const { title, links, copy, sx = [], ...rowLinksProps } = props

  return (
    <Links
      {...rowLinksProps}
      title={title}
      maxWidth={false}
      showButtons='auto'
      copy={copy && <RichText {...copy} />}
      sx={[
        (theme) => ({
          my: `calc(${theme.spacings.xxl} +  ${theme.spacings.md})`,
          '& .RowLinks-title': {
            display: 'none',
          },
          '& .Scroller-root': {
            margin: '0 auto',
            width: 'auto',
            maxWidth: 'fit-content',
            gap: theme.spacings.xxl,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {links.map((pageLink) => (
        <Link
          href={pageLink.url}
          key={pageLink.id}
          color='inherit'
          underline='hover'
          sx={{
            '& img': { display: 'block' },
          }}
        >
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
                filter: (theme) => (theme.palette.mode === 'dark' ? 'invert(100%)' : 'none'),
              }}
              sizes={{ 0: '120px', 960: '240px' }}
            />
          )}
        </Link>
      ))}
    </Links>
  )
}
