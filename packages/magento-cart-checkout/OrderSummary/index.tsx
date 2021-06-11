import { AnyARecord } from 'dns'
import { Divider, makeStyles, Theme, Typography } from '@material-ui/core'
import { Cart, CartPrices } from '@reachdigital/graphql'
import { CartTotals } from '@reachdigital/magento-cart'
import { CartItems, CartProps } from '@reachdigital/magento-cart-items'
import SliderContainer from '@reachdigital/next-ui/FramerSlider/SliderContainer'
import { SliderContext } from '@reachdigital/next-ui/FramerSlider/SliderContext'
import SliderNext from '@reachdigital/next-ui/FramerSlider/SliderNext'
import SliderPrev from '@reachdigital/next-ui/FramerSlider/SliderPrev'
import SliderScroller from '@reachdigital/next-ui/FramerSlider/SliderScroller'
import PictureResponsiveNext from '@reachdigital/next-ui/PictureResponsiveNext'
import SectionHeader from '@reachdigital/next-ui/SectionHeader'
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
    sliderButtons: {
      pointerEvents: 'all',
      width: '100%',
      position: 'absolute',
      top: 45,
      '& > *': {
        pointerEvents: 'all',
      },
    },
    sliderNext: {
      right: theme.spacings.sm,
      position: 'absolute',
    },
    sliderPrev: {
      left: '-20px',
      position: 'absolute',
    },
    prevNextFab: {
      boxShadow: 'none',
    },
    sectionHeader: {
      textTransform: 'none',
      color: theme.palette.common.black,
    },
    costContainer: {
      background: theme.palette.common.white,
      padding: 0,
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
        labelLeft={
          <Typography variant='h5' className={classes.sectionHeader}>
            Order summary
          </Typography>
        }
        labelRight={<Typography>Download invoice</Typography>}
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
          <div className={classes.sliderButtons}>
            <SliderPrev className={classes.sliderPrev} classes={{ root: classes.prevNextFab }} />
            <SliderNext className={classes.sliderNext} classes={{ root: classes.prevNextFab }} />
          </div>
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
