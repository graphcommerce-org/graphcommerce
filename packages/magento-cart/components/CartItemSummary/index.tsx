import { Scroller, ScrollerButton, ScrollerProvider } from '@graphcommerce/framer-scroller'
import { Image } from '@graphcommerce/image'
import {
  iconChevronLeft,
  iconChevronRight,
  responsiveVal,
  SectionContainer,
  SvgImageSimple,
  UseStyles,
} from '@graphcommerce/next-ui'
import { t } from '@lingui/macro'
import { Divider, Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx'
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
    imageScrollerContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacings.sm,
      position: 'relative',
    },
    image: {
      borderRadius: '50%',
      marginRight: theme.spacings.xs,
      border: `1px solid ${theme.palette.divider}`,
      padding: responsiveVal(5, 10),
      width: `${responsiveVal(48, 96)} !important`,
      height: `${responsiveVal(48, 96)} !important`,
      display: 'block',
    },
    scrollerContainer: {
      padding: 1,
    },
    scroller: {},
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

  const items = data?.cart.items

  return (
    <div className={classes.root}>
      <SectionContainer
        classes={{
          sectionHeaderWrapper: classes.sectionHeaderWrapper,
        }}
        labelLeft={t`Order summary`}
        // labelRight={
        //   <PageLink href='/download' passHref>
        //     <Link color='secondary'>Download invoice</Link>
        //   </PageLink>
        // }
        variantLeft='h6'
      >
        <div className={classes.imageScrollerContainer}>
          <ScrollerProvider scrollSnapAlign='start'>
            <ScrollerButton direction='left' className={clsx(classes.prevNext, classes.prev)}>
              <SvgImageSimple src={iconChevronLeft} />
            </ScrollerButton>
            <div className={classes.scrollerContainer}>
              <Scroller className={classes.scroller}>
                {items?.map((item) => (
                  <React.Fragment key={item?.uid}>
                    {item?.product?.thumbnail?.url ? (
                      <Image
                        key={item?.uid}
                        alt={item?.product?.thumbnail?.label ?? ''}
                        src={item?.product?.thumbnail?.url ?? ''}
                        className={classes.image}
                        layout='fill'
                        sizes={responsiveVal(48, 96)}
                      />
                    ) : (
                      <div />
                    )}
                  </React.Fragment>
                ))}
              </Scroller>
            </div>
            <ScrollerButton direction='right' className={clsx(classes.prevNext, classes.next)}>
              <SvgImageSimple src={iconChevronRight} />
            </ScrollerButton>
          </ScrollerProvider>
        </div>
        <Divider classes={{ root: classes.divider }} />
        <CartTotals classes={{ costsContainer: classes.costContainer }} />
      </SectionContainer>
    </div>
  )
}
