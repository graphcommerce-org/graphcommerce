import { makeStyles, Theme } from '@material-ui/core'
import { SidebarGallery, TypeRenderer, UseStyles } from '@reachdigital/next-ui'
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
        marginTop: -60,
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
      images={
        media_gallery?.map((item) => {
          if (item?.__typename === 'ProductImage')
            return { src: item.url ?? '', alt: item.label || undefined }
          return { src: '', alt: `{${item?.__typename} not yet supported}` }
        }) ?? []
      }
    />
  )
}
