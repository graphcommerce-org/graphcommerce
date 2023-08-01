import { Scroller, ScrollerButton, ScrollerProvider } from '@graphcommerce/framer-scroller'
import { Image } from '@graphcommerce/image'
import {
  iconChevronLeft,
  iconChevronRight,
  responsiveVal,
  SectionContainer,
  IconSvg,
  extendableComponent,
  breakpointVal,
  nonNullable,
  ActionCardLayoutProps,
  ActionCardLayout,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, Divider, SxProps, Theme } from '@mui/material'
import React from 'react'
import { useCartQuery } from '../../hooks'
import {
  CartSummaryItemActionCard,
  CartSummaryItemActionCardProps,
} from '../CartSummary/CartSummaryItemActionCard'
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

type OrderSummaryProps = ActionCardLayoutProps & {
  sx?: SxProps<Theme>
  itemProps?: Omit<
    CartSummaryItemActionCardProps,
    'cartItem' | 'layout' | 'onClick' | 'disabled' | 'selected' | 'reset' | 'color'
  >
} & { size?: 'small' | 'medium' | 'large' }

export function CartItemSummary(props: OrderSummaryProps) {
  const { sx = [], size, layout = 'stack', itemProps, ref, ...cardLayout } = props
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
          ...breakpointVal(
            'borderRadius',
            theme.shape.borderRadius * 2,
            theme.shape.borderRadius * 3,
            theme.breakpoints.values,
          ),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <SectionContainer
        sx={{ '& .SectionHeader-root': { mt: 0 } }}
        labelLeft={<Trans id='Order summary' />}
        // labelRight={
        //   <PageLink href='/download' passHref>
        //     <Link color='secondary'>Download invoice</Link>
        //   </PageLink>
        // }
        variantLeft='h6'
      >
        <Box className={classes.imageScrollerContainer} sx={{ position: 'relative' }}>
          <ScrollerProvider scrollSnapAlign='start'>
            <ScrollerButton
              direction='left'
              className={`${classes.prevNext} ${classes.prev}`}
              sx={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                left: `8px`,
              }}
            >
              <IconSvg src={iconChevronLeft} />
            </ScrollerButton>
            <ActionCardLayout
              sx={(theme) => ({
                marginBottom: theme.spacings.md,
                '&.layoutStack': {
                  gap: 0,
                },
              })}
              layout={layout}
              className={classes.scrollerContainer}
              {...cardLayout}
            >
              {items?.filter(nonNullable).map((item) => (
                <CartSummaryItemActionCard
                  key={item.uid}
                  cartItem={item}
                  layout={layout}
                  size={size}
                  {...itemProps}
                />
              ))}
            </ActionCardLayout>
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
        <CartTotals sx={{ background: 'none', padding: 0 }} />
      </SectionContainer>
    </Box>
  )
}
