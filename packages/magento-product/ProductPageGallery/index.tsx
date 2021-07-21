import { makeStyles, Theme } from '@material-ui/core'
import {
  RenderType,
  SidebarGallery,
  SliderImage,
  TypeRenderer,
  UseStyles,
} from '@reachdigital/next-ui'
import React, { PropsWithChildren } from 'react'
import ProductImage from './ProductImage'
import { ProductPageGalleryFragment } from './ProductPageGallery.gql'
import ProductVideo from './ProductVideo'

export type ProductPageGalleryRenderers = TypeRenderer<
  NonNullable<NonNullable<ProductPageGalleryFragment['media_gallery']>[0]>
>
const renderers: ProductPageGalleryRenderers = { ProductImage, ProductVideo }

type ProductPageGalleryProps = PropsWithChildren<ProductPageGalleryFragment> &
  UseStyles<typeof useStyles>

const useStyles = makeStyles(
  (theme: Theme) => ({
    wrapper: {
      marginTop: 'initial',
      [theme.breakpoints.up('md')]: {
        marginTop: -96,
      },
    },
  }),
  {
    name: 'ProductPageGallery',
  },
)

export default function ProductPageGallery(props: ProductPageGalleryProps) {
  const { media_gallery, children } = props
  const classes = useStyles(props)

  return (
    <SidebarGallery
      sidebar={children}
      aspectRatio={[1678, 1532]}
      classes={{ wrapper: classes.wrapper }}
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
  )
}
