import { Image } from '@graphcommerce/image'
import {
  Row,
  SidebarGalleryProps,
  extendableComponent,
  responsiveVal,
} from '@graphcommerce/next-ui'
import { Box, useTheme } from '@mui/material'
import { useStickyEffect } from '../../hooks/useStickyEffect'

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

type OwnerState = { zoomed: boolean; disableZoom: boolean }

const { withState, selectors } = extendableComponent<OwnerState, typeof name, typeof parts>(
  name,
  parts,
)

export function GridGallery(props: SidebarGalleryProps) {
  const { sidebar, images, sx } = props

  const theme = useTheme()

  const classes = withState({ zoomed: false, disableZoom: false })

  const [marginRef, sidebarRef, wrapperRef] = useStickyEffect()

  return (
    <Row
      maxWidth={false}
      disableGutters
      className={classes.row}
      sx={[
        {
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          backgroundColor: theme.palette.background.paper,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          height: 'min-content',
          gap: `calc(${theme.spacings.xxs} / 2)`,
          '& > *:last-of-type:nth-of-type(odd)': {
            gridColumn: '1 / -1',
          },
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
            sx={[
              {
                width: '100%',
                display: 'block',
                aspectRatio: 1,
                filter: 'contrast(0.95)',
                objectFit: 'cover',
              },
            ]}
          />
        ))}
      </Box>
      <Box
        ref={wrapperRef}
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
        <Box ref={marginRef} />
        <Box
          ref={sidebarRef}
          className={classes.sidebar}
          sx={{
            position: 'sticky',
            boxSizing: 'border-box',
            width: '100%',
            padding: theme.spacings.md,
            minWidth: `calc(${theme.breakpoints.values.sm}px / 1.5)`,
          }}
        >
          {sidebar}
          {sidebar}
        </Box>
      </Box>
    </Row>
  )
}

GridGallery.selectors = selectors
