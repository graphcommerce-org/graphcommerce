import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { SxProps, Theme, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import { SidebarGalleryProps } from '../FramerScroller'

export const component = 'SidebarGallery'
export const exported = '@graphcommerce/next-ui'
export const ifConfig: IfConfig = 'sidebarGallery.paginationVariant'

function SidebarGalleryGridPlugin(props: PluginProps<SidebarGalleryProps>) {
  const { Prev, sx = {}, disableZoom, routeHash = 'gallery', ...rest } = props
  const theme = useTheme<Theme>()
  const router = useRouter()
  const newSx = Array.isArray(sx) ? sx : [sx]
  const route = `#${routeHash}`
  const zoomed = router.asPath.split('@')[0].endsWith(route)

  const gridSx: SxProps<Theme> = {
    '& .ScrollerDots-root': { display: 'none' },
    [theme.breakpoints.up('md')]: {
      height: 'unset',
      top: 'unset',
      '& .SidebarGallery-scrollerContainer': {
        paddingTop: 'unset',
        height: 'unset',
      },
      '& .Scroller-root': {
        position: 'relative',
      },
      '& div > .mdSnapDirInline': {
        overflowY: 'unset',
        overflowX: 'unset',
      },
      '& div > .mdGridDirInline': {
        gridAutoColumns: 'unset',
        gridAutoRows: 'unset',
        gridTemplateRows: 'unset',
        gridAutoFlow: 'unset',
        gridTemplateColumns: 'repeat(2, 1fr)',
        '& > *:last-of-type:nth-of-type(odd)': {
          gridColumn: '1 / -1',
        },
        '& picture': {
          aspectRatio: '1 !important',
          maxHeight: 'unset',
          width: 'unset',
          height: 'unset',
          top: 'unset',
          left: 'unset',
          transform: 'unset',
          position: 'unset',
          '&::after': {
            minWidth: 'unset',
          },
          '& img': {
            objectFit: 'cover',
          },
        },
      },
    },
  }
  if (import.meta.graphCommerce.sidebarGallery?.paginationVariant === 'GRID' && !zoomed)
    newSx.push(gridSx)

  return <Prev {...rest} sx={newSx} showButtons='never' />
}

export const Plugin = SidebarGalleryGridPlugin
