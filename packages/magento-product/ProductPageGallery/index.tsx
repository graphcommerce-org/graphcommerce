import { Fab, makeStyles, Theme } from '@material-ui/core'
import RenderType, { TypeRenderer } from '@reachdigital/next-ui/RenderType'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import { m } from 'framer-motion'
import React, { PropsWithChildren, useState } from 'react'
import ProductImage from './ProductImage'
import { ProductPageGalleryFragment } from './ProductPageGallery.gql'
import ProductVideo from './ProductVideo'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'grid',
    marginBottom: theme.spacings.lg,
    paddingLeft: 0,
    background: 'rgba(0,0,0,0.03)',
  },
  gallery: {
    position: 'relative',
    float: 'left',
    width: '100vw',
    height: '104vw',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${responsiveVal(500, 600)})`,
      height: '100%',
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
      objectFit: 'contain',
    },
  },
  expandButton: {
    visibility: 'hidden',
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      transform: 'translateX(-100%)',
      right: theme.spacings.xs,
      visibility: 'visible',
      marginTop: theme.spacings.sm,
    },
  },
  sidebar: {
    float: 'right',
    width: responsiveVal(200, 600),
    height: '100%',
    display: 'grid',
    alignContent: 'center',
    gap: theme.spacings.xs,
    '& > *': {
      paddingLeft: theme.spacings.lg,
      paddingRight: theme.spacings.lg,
    },
    '& h1': {
      ...theme.typography.h2,
    },
  },
}))

export type ProductPageGalleryRenderers = TypeRenderer<
  NonNullable<NonNullable<ProductPageGalleryFragment['media_gallery']>[0]>
>
const renderers: ProductPageGalleryRenderers = { ProductImage, ProductVideo }

type ProductPageGalleryProps = PropsWithChildren<unknown> & ProductPageGalleryFragment

export default function ProductPageGallery(props: ProductPageGalleryProps) {
  const classes = useStyles()
  const { media_gallery, sku, children } = props
  const [expanded, setExpanded] = useState(true)
  const variants = {
    collapsed: { width: `calc(100% - ${responsiveVal(500, 600)})` },
    expanded: { width: '100%', transition: { type: 'spring', mass: 0.5 } },
  }
  const sidebar = {
    view: { display: 'grid' },
    hide: { display: 'none' },
  }

  return (
    <div className={classes.root}>
      <div>
        <m.div
          className={classes.gallery}
          animate={expanded ? 'collapsed' : 'expanded'}
          variants={variants}
        >
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
          <Fab
            aria-label='zoom'
            color='inherit'
            size='medium'
            className={classes.expandButton}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <img
                src='/icons/desktop_expand.svg'
                alt='account'
                width={32}
                height={32}
                loading='eager'
              />
            ) : (
              <img
                src='/icons/desktop_collapse.svg'
                alt='account'
                width={32}
                height={32}
                loading='eager'
              />
            )}
          </Fab>
        </m.div>
        <m.div className={classes.sidebar} animate={expanded ? 'view' : 'hide'} variants={sidebar}>
          {children}
        </m.div>
      </div>
    </div>
  )
}
