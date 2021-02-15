import { Fab, makeStyles, Theme, useMediaQuery, useTheme } from '@material-ui/core'
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
    gridAutoFlow: 'row',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '5fr 3fr',
    },
    marginBottom: theme.spacings.lg,
    paddingLeft: 0,
    background: 'rgba(0,0,0,0.03)',
    minHeight: responsiveVal(400, 800),
    '& > div': {
      position: 'relative',
    },
  },
  gallery: {
    width: '100%',
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
      visibility: 'visible',
      position: 'absolute',
      top: theme.spacings.sm,
      right: theme.spacings.sm,
    },
  },
  sidebar: {
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
  const theme = useTheme()
  const upMd = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true })

  const gallery = {
    collapsed: { gridTemplateColumns: '5fr 3fr', transition: { type: 'spring', duration: 0.2 } },
    expanded: { gridTemplateColumns: '1fr 0fr', transition: { type: 'spring', duration: 0 } },
  }
  const sidebar = {
    view: { display: 'grid', transition: { delay: 0.2 } },
    hide: { display: 'none' },
  }

  return (
    <m.div
      className={classes.root}
      animate={expanded ? 'collapsed' : 'expanded'}
      variants={gallery}
    >
      <div>
        <div className={classes.gallery}>
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
      </div>
      <m.div className={classes.sidebar} animate={expanded ? 'view' : 'hide'} variants={sidebar}>
        {children}
      </m.div>
    </m.div>
  )
}
