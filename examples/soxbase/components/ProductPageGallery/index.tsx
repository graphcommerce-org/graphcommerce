import { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import RenderType, { TypeRenderer } from '@reachdigital/next-ui/RenderType'
import React from 'react'
import ProductImage from './ProductImage'
import { ProductPageGalleryFragment } from './ProductPageGallery.gql'
import ProductVideo from './ProductVideo'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100vw',
    height: '104vw',
    [theme.breakpoints.up('md')]: {
      width: '60vw',
      height: '64vw',
    },
    overflowX: 'auto',
    overflowY: 'hidden',
    whiteSpace: 'nowrap',
    scrollSnapType: 'inline mandatory',
    WebkitOverflowScrolling: 'touch',
    '& img': {
      scrollSnapAlign: 'start',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
}))

export type ProductPageGalleryRenderers = TypeRenderer<
  NonNullable<NonNullable<ProductPageGalleryFragment['media_gallery']>[0]>
>
const renderers: ProductPageGalleryRenderers = { ProductImage, ProductVideo }

export default function ProductPageGallery(props: ProductPageGalleryFragment) {
  const { media_gallery, sku } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {media_gallery?.map((item) => {
        if (!item?.position) return null
        return (
          <RenderType
            key={item.position}
            renderer={renderers}
            {...item}
            layoutId={item.position === 1 ? sku : ''}
          />
        )
      })}
    </div>
  )
}
