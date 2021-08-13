import { Divider, Link, makeStyles, Theme } from '@material-ui/core'
import { Image } from '@reachdigital/image'
import {
  responsiveVal,
  SectionContainer,
  SliderContainer,
  SliderContext,
  SliderNext,
  SliderPrev,
  SliderScroller,
  UseStyles,
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
      padding: `${theme.spacings.sm} ${theme.spacings.sm}`,
      border: `1px ${theme.palette.divider} solid`,
      borderRadius: 4,
    },
    sliderContextContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacings.sm,
      position: 'relative',
    },
    image: {
      borderRadius: '50%',
      marginRight: theme.spacings.xs,
      border: `5px ${theme.palette.common.white} solid`,
      boxShadow: `0px 0px 2px ${theme.palette.grey[700]}`,
      width: `${responsiveVal(48, 96)} !important`,
      height: `${responsiveVal(48, 96)} !important`,
    },
    sliderContainer: {
      padding: 1,
    },
    prevNext: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 2,
    },
    prev: {
      left: 8,
    },
    next: {
      right: 8,
    },
    costContainer: {
      background: theme.palette.background.default,
      padding: 0,
    },
    sectionHeaderWrapper: {
      marginTop: 0,
    },
    divider: {
      margin: `${theme.spacings.xs} 0 ${theme.spacings.xs} 0`,
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
      <SectionContainer
        classes={{
          sectionHeaderWrapper: classes.sectionHeaderWrapper,
        }}
        labelLeft='Order summary'
        // labelRight={
        //   <PageLink href='/download' passHref>
        //     <Link color='secondary'>Download invoice</Link>
        //   </PageLink>
        // }
        variantLeft='h6'
      >
        <div className={classes.sliderContextContainer}>
          <SliderContext scrollSnapAlign='start'>
            <div className={clsx(classes.prevNext, classes.prev)}>
              <SliderPrev />
            </div>
            <SliderContainer classes={{ container: classes.sliderContainer }}>
              <SliderScroller>
                {items?.map((item) => (
                  <Image
                    key={item?.uid}
                    alt={item?.product?.thumbnail?.label ?? ''}
                    src={item?.product?.thumbnail?.url ?? ''}
                    className={classes.image}
                    layout='fill'
                    sizes={responsiveVal(48, 96)}
                  />
                ))}
              </SliderScroller>
            </SliderContainer>
            <div className={clsx(classes.prevNext, classes.next)}>
              <SliderNext />
            </div>
          </SliderContext>
        </div>
        <Divider classes={{ root: classes.divider }} />
        <CartTotals classes={{ costsContainer: classes.costContainer }} />
      </SectionContainer>
    </div>
  )
}
