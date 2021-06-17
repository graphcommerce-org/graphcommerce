import { Divider, makeStyles, Theme, Typography } from '@material-ui/core'
import { CartTotals } from '@reachdigital/magento-cart'
import SliderContainer from '@reachdigital/next-ui/FramerSlider/SliderContainer'
import { SliderContext } from '@reachdigital/next-ui/FramerSlider/SliderContext'
import SliderNext from '@reachdigital/next-ui/FramerSlider/SliderNext'
import SliderPrev from '@reachdigital/next-ui/FramerSlider/SliderPrev'
import SliderScroller from '@reachdigital/next-ui/FramerSlider/SliderScroller'
import PictureResponsiveNext from '@reachdigital/next-ui/PictureResponsiveNext'
import SectionHeader from '@reachdigital/next-ui/SectionHeader'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import clsx from 'clsx'
import PageLink from 'next/link'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      padding: theme.spacings.md,
      border: `2px ${theme.palette.background.highlight} solid`,
      borderRadius: 4,
      [theme.breakpoints.up('md')]: {},
    },
    pictureResponsive: {
      borderRadius: '50%',
      marginRight: theme.spacings.xs,
      border: `5px ${theme.palette.common.white} solid`,
      boxShadow: `0px 0px 2px ${theme.palette.grey[700]}`,
    },
    sliderContainer: {
      padding: theme.spacings.xs,
      position: 'relative',
    },
    prevNext: {
      pointerEvents: 'all',
      position: 'absolute',
    },
    prev: {
      left: 0,
      top: 45,
    },
    next: {
      right: 0,
      top: 45,
    },
    prevNextFab: {
      boxShadow: 'none',
    },
    sectionHeader: {
      textTransform: 'none',
      textWeight: theme.typography.fontWeightBold,
      color: theme.palette.common.black,
    },
    costContainer: {
      background: theme.palette.common.white,
      padding: 0,
      marginTop: 0,
    },
    labelContainer: {
      alignItems: 'center',
      paddingBottom: 10,
    },
    downloadLink: {
      fontSize: responsiveVal(14, 18),
      '& > a': {
        textDecoration: 'none!important',
        color: theme.palette.secondary.main,
      },
    },
  }),
  { name: 'OrderSuccessSummary' },
)

export default function OrderSummary(props: any) {
  const classes = useStyles()
  const { items, prices, shipping_addresses } = props

  return (
    <div className={classes.root}>
      <SectionHeader
        classes={{ labelRight: classes.downloadLink, labelInnerContainer: classes.labelContainer }}
        labelLeft={
          <Typography variant='h6' className={classes.sectionHeader}>
            Order summary
          </Typography>
        }
        labelRight={
          <PageLink key='download-invoice' href='/download'>
            Download invoice
          </PageLink>
        }
      />
      <SliderContext scrollSnapAlign='start'>
        <SliderContainer classes={{ container: classes.sliderContainer }}>
          <SliderScroller>
            {items?.map((item) => (
              <PictureResponsiveNext
                key={item?.uid}
                alt={item?.product.thumbnail?.label ?? ''}
                width={90}
                height={90}
                src={item?.product.thumbnail?.url ?? ''}
                type='image/jpeg'
                className={classes.pictureResponsive}
              />
            ))}
          </SliderScroller>
          <SliderPrev
            className={clsx(classes.prevNext, classes.prev)}
            classes={{ root: classes.prevNextFab }}
          />
          <SliderNext
            className={clsx(classes.prevNext, classes.next)}
            classes={{ root: classes.prevNextFab }}
          />
        </SliderContainer>
      </SliderContext>
      <Divider />
      <CartTotals
        classes={{ costsContainer: classes.costContainer }}
        key='totals'
        prices={prices}
        shipping_addresses={shipping_addresses ?? []}
      />
    </div>
  )
}
