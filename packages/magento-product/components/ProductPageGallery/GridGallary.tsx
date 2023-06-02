import { MotionImageAspectProps } from '@graphcommerce/framer-scroller'
import { Image } from '@graphcommerce/image'
import { Row, extendableComponent, responsiveVal } from '@graphcommerce/next-ui'
import { Box, Container, SxProps, Theme, useTheme } from '@mui/material'

export type SidebarGalleryProps = {
  sidebar: React.ReactNode
  images: MotionImageAspectProps[]
  sx?: SxProps<Theme>
}

const name = 'SidebarGallery' as const
const parts = [
  'row',
  'root',
  'scrollerContainer',
  'scroller',
  'sidebarWrapper',
  'sidebar',
  'bottomCenter',
  'sliderButtons',
  'toggleIcon',
  'topRight',
  'centerLeft',
  'centerRight',
  'dots',
] as const

export function GridGallery(props: SidebarGalleryProps) {
  const { sidebar, images, sx } = props

  const { classes } = extendableComponent(name, parts)
  const theme = useTheme()

  return (
    <Row
      maxWidth={false}
      disableGutters
      className={classes.row}
      sx={[
        {
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          backgroundColor: theme.palette.background.paper,
          pr: `calc((100% - ${theme.breakpoints.values.lg}px) / 2)`,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          padding: `${theme.spacings.lg} ${theme.page.horizontal}`,

          '& picture': {
            width: '50%',
            p: `calc(${theme.spacings.xxs} / 2)`,
          },

          ...(images.length % 2 !== 0 &&
            images.length > 3 && {
              '& picture:nth-last-child(-n+4)': {
                width: 'calc(100% / 3)',
              },
            }),
        }}
      >
        {images.map((image, idx) => (
          <Image
            key={typeof image.src === 'string' ? image.src : idx}
            src={image.src}
            width={image.width}
            height={image.height}
            loading={idx === 0 ? 'eager' : 'lazy'}
            alt={image.alt || `Product Image ${idx}` || ''}
            sx={{ width: '100%', height: 'auto', display: 'block' }}
          />
        ))}
      </Box>
      <Box
        className={classes.sidebarWrapper}
        sx={[
          {
            boxSizing: 'content-box',
            justifyItems: 'start',
            position: 'relative',
            [theme.breakpoints.up('md')]: {
              width: `calc(${responsiveVal(300, 500, theme.breakpoints.values.lg)} + ${
                theme.page.horizontal
              } * 2)`,
            },
          },
        ]}
      >
        <Box
          className={classes.sidebar}
          sx={{
            position: 'sticky',
            top: 0,
            boxSizing: 'border-box',
            width: '100%',
            padding: `${theme.spacings.lg} ${theme.page.horizontal}`,
            [theme.breakpoints.up('md')]: {
              paddingLeft: theme.spacings.lg,
            },
          }}
        >
          {sidebar}
        </Box>
      </Box>
    </Row>
  )
}
