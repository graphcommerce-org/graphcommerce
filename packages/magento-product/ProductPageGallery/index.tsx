import { makeStyles, Theme } from '@material-ui/core'
import SliderImage from '@reachdigital/next-ui/FramerSlider/SliderImage'
import SidebarGallery from '@reachdigital/next-ui/FramerSlider/variants/SidebarGallery'
import RenderType, { TypeRenderer } from '@reachdigital/next-ui/RenderType'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import React, { PropsWithChildren } from 'react'
import ProductImage from './ProductImage'
import { ProductPageGalleryFragment } from './ProductPageGallery.gql'
import ProductVideo from './ProductVideo'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      gridAutoFlow: 'row',
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: '5.5fr 2.5fr',
      },
      background: 'rgba(0,0,0,0.03)',
      marginBottom: theme.spacings.lg,
      height: responsiveVal(900, 1200),
    },
    container: {
      position: 'relative',
      zIndex: 10,
      background: theme.palette.neutral.default,
      overflow: 'hidden',
      width: '100%',
      height: '100%',
    },
    containerZoomed: {
      zIndex: 12,
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    sidebar: {
      width: '100%',
      minHeight: '20vh',
      height: '100%',
      display: 'grid',
      justifyItems: 'start',
      alignContent: 'center',
    },
  }),
  { name: 'ProductPageGallery' },
)

export type ProductPageGalleryRenderers = TypeRenderer<
  NonNullable<NonNullable<ProductPageGalleryFragment['media_gallery']>[0]>
>
const renderers: ProductPageGalleryRenderers = { ProductImage, ProductVideo }

type ProductPageGalleryProps = PropsWithChildren<ProductPageGalleryFragment>

export default function ProductPageGallery(props: ProductPageGalleryProps) {
  const classes = useStyles()
  const { media_gallery, children } = props

  return (
    <div className={classes.root}>
      <SidebarGallery
        sidebar={<div className={classes.sidebar}>{children}</div>}
        classes={{
          container: classes.container,
          containerZoomed: classes.containerZoomed,
        }}
      >
        {media_gallery?.map((item) => {
          if (!item?.position) return null
          return (
            <SliderImage key={item.position} width={1532} height={1678}>
              <RenderType renderer={renderers} {...item} />
            </SliderImage>
          )
        })}
      </SidebarGallery>
    </div>
  )
}
