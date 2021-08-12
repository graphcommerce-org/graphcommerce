import { Divider, makeStyles, Theme } from '@material-ui/core'
import { Image } from '@reachdigital/image'
import {
  responsiveVal,
  SectionHeader,
  SliderContainer,
  SliderContext,
  SliderNext,
  SliderPrev,
  SliderScroller,
  UseStyles,
} from '@reachdigital/next-ui'
import clsx from 'clsx'
import { AnimatePresence, m } from 'framer-motion'
import PageLink from 'next/link'
import React from 'react'
import { useCartQuery } from '../../hooks'
import CartTotals from '../CartTotals/CartTotals'
import { CartItemSummaryDocument } from './GetCartItemSummary.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      padding: `${theme.spacings.md} ${theme.spacings.sm}`,
      border: `2px ${theme.palette.background.highlight} solid`,
      borderRadius: 4,
    },
    sliderContextContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: responsiveVal(16, 32),
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
      background: theme.palette.common.white,
      padding: 0,
      marginTop: 0,
    },
    sectionHeaderWrapper: {
      marginTop: 0,
      borderBottom: `1px ${theme.palette.divider} solid`,
      paddingBottom: theme.spacings.xs,
    },
    sectionHeaderLabelLeft: {
      color: 'unset',
      textTransform: 'unset',
      ...theme.typography.h5,
    },
    downloadLink: {
      fontSize: responsiveVal(14, 18),
      '& > a': {
        textDecoration: 'none',
        color: theme.palette.secondary.main,
      },
    },
    divider: {
      margin: '1em 0',
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
          labelLeft: classes.sectionHeaderLabelLeft,
        }}
        labelLeft='Order summary'
        labelRight={
          <PageLink key='download-invoice' href='/download'>
            Download invoice
          </PageLink>
        }
      />

      <AnimatePresence>
        <m.div className={classes.sliderContextContainer}>
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
                    width={64}
                    height={64}
                    layout='responsive'
                    src={item?.product?.thumbnail?.url ?? ''}
                    className={classes.image}
                  />
                ))}
              </SliderScroller>
            </SliderContainer>
            <div className={clsx(classes.prevNext, classes.next)}>
              <SliderNext />
            </div>
          </SliderContext>
        </m.div>
      </AnimatePresence>

      <Divider classes={{ root: classes.divider }} />
      <CartTotals classes={{ costsContainer: classes.costContainer }} />
    </div>
  )
}
