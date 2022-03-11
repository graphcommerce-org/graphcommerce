import { Scroller, ScrollerButton, ScrollerProvider } from '@graphcommerce/framer-scroller'
import { Image } from '@graphcommerce/image'
import {
  iconChevronLeft,
  iconChevronRight,
  responsiveVal,
  SectionContainer,
  IconSvg,
  extendableComponent,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Box, Divider, SxProps, Theme } from '@mui/material'
import React from 'react'
import { useCartQuery } from '../../hooks'
import { CartTotals } from '../CartTotals/CartTotals'
import { CartItemSummaryDocument } from './GetCartItemSummary.gql'

const name = 'CartItemSummary' as const
const parts = [
  'root',
  'imageScrollerContainer',
  'image',
  'scrollerContainer',
  'scroller',
  'prevNext',
  'prev',
  'next',
  'sectionHeaderWrapper',
  'divider',
] as const
const { classes } = extendableComponent(name, parts)

type OrderSummaryProps = { sx?: SxProps<Theme> }

export function CartItemSummary(props: OrderSummaryProps) {
  const { sx = [] } = props
  const { data } = useCartQuery(CartItemSummaryDocument, { allowUrl: true })

  if (!data?.cart) return null

  const items = data?.cart.items

  return (
    <Box
      className={classes.root}
      sx={[
        (theme) => ({
          padding: `${theme.spacings.sm} ${theme.spacings.sm}`,
          border: `1px ${theme.palette.divider} solid`,
          borderRadius: '4px',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <SectionContainer
        sx={{ '& .SectionHeader': { mt: 0 } }}
        labelLeft={<Trans>Order summary</Trans>}
        // labelRight={
        //   <PageLink href='/download' passHref>
        //     <Link color='secondary'>Download invoice</Link>
        //   </PageLink>
        // }
        variantLeft='h6'
      >
        <Box
          className={classes.imageScrollerContainer}
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacings.sm,
            position: 'relative',
          })}
        >
          <ScrollerProvider scrollSnapAlign='start'>
            <ScrollerButton
              direction='left'
              className={`${classes.prevNext} ${classes.prev}`}
              sx={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                left: 8,
              }}
            >
              <IconSvg src={iconChevronLeft} />
            </ScrollerButton>
            <Box className={classes.scrollerContainer} sx={{ padding: '1px' }}>
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
                        sx={(theme) => ({
                          borderRadius: '50%',
                          marginRight: theme.spacings.xs,
                          border: `1px solid ${theme.palette.divider}`,
                          padding: responsiveVal(5, 10),
                          width: `${responsiveVal(48, 96)} !important`,
                          height: `${responsiveVal(48, 96)} !important`,
                          display: 'block',
                        })}
                      />
                    ) : (
                      <Box />
                    )}
                  </React.Fragment>
                ))}
              </Scroller>
            </Box>
            <ScrollerButton
              direction='right'
              className={`${(classes.prevNext, classes.next)}`}
              sx={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                right: 8,
              }}
            >
              <IconSvg src={iconChevronRight} />
            </ScrollerButton>
          </ScrollerProvider>
        </Box>
        <Divider
          classes={{ root: classes.divider }}
          sx={(theme) => ({
            margin: `${theme.spacings.xs} 0 ${theme.spacings.xs} 0`,
          })}
        />
        <CartTotals
          sx={(theme) => ({
            background: theme.palette.background.default,
            padding: 0,
          })}
        />
      </SectionContainer>
    </Box>
  )
}
