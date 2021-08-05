import { Divider, makeStyles, Theme, Typography } from '@material-ui/core'
import { Image } from '@reachdigital/image'
import {
  SliderContainer,
  SliderContext,
  SliderNext,
  SliderPrev,
  SliderScroller,
  SectionHeader,
  UseStyles,
  responsiveVal,
} from '@reachdigital/next-ui'
import clsx from 'clsx'
import PageLink from 'next/link'
import React from 'react'
import { useCartQuery } from '../../hooks'
import CartTotals from '../CartTotals/CartTotals'
import { CartItemSummaryDocument } from './GetCartItemSummary.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      padding: theme.spacings.sm,
      border: `2px ${theme.palette.background.highlight} solid`,
      borderRadius: 4,
      [theme.breakpoints.up('md')]: {},
    },
    image: {
      borderRadius: '50%',
      marginRight: theme.spacings.xs,
      border: `5px ${theme.palette.common.white} solid`,
      boxShadow: `0px 0px 2px ${theme.palette.grey[700]}`,
    },
    sliderContainer: {
      padding: `${theme.spacings.xs} 0`,
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
    costContainer: {
      background: theme.palette.common.white,
      padding: 0,
      marginTop: 0,
    },
    sectionHeaderWrapper: {
      paddingBottom: 10,
    },
    downloadLink: {
      fontSize: responsiveVal(14, 18),
      '& > a': {
        textDecoration: 'none',
        color: theme.palette.secondary.main,
      },
    },
  }),
  { name: 'CartItemSummary' },
)

type OrderSummaryProps = UseStyles<typeof useStyles>

export default function CartItemSummary(props: OrderSummaryProps) {
  const classes = useStyles(props)

  const { data } = useCartQuery(CartItemSummaryDocument, { allowUrl: true })

  if (!data?.cart) return null

  const { items } = data?.cart

  return (
    <div className={classes.root}>
      <SectionHeader
        classes={{
          labelRight: classes.downloadLink,
          sectionHeaderWrapper: classes.sectionHeaderWrapper,
        }}
        labelLeft='Order summary'
        // labelRight={
        // <PageLink key='download-invoice' href='/download'>
        //   Download invoice
        // </PageLink>
        // }
      />
      <SliderContext scrollSnapAlign='start'>
        <SliderContainer classes={{ container: classes.sliderContainer }}>
          <SliderScroller>
            {items?.map((item) => (
              <Image
                key={item?.uid}
                alt={item?.product.thumbnail?.label ?? ''}
                width={90}
                height={90}
                src={item?.product.thumbnail?.url ?? ''}
                className={classes.image}
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
      <CartTotals classes={{ costsContainer: classes.costContainer }} />
    </div>
  )
}
