import { PriceRange } from '@graphcommerce/graphql-mesh'
import { ApolloCartErrorAlert } from '@graphcommerce/magento-cart'
import { useFormProductAddToCart } from '@graphcommerce/magento-product'
import { Money } from '@graphcommerce/magento-store'
import {
  AnimatedRow,
  Button,
  extendableComponent,
  iconChevronRight,
  MessageSnackbar,
  IconSvg,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Divider, Alert, Box, SxProps, Theme, Typography } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import PageLink from 'next/link'
import React from 'react'
import { ConfigurableOptionsInput } from '../ConfigurableOptions/ConfigurableOptionsInput'
import { useConfigurableTypeProduct } from '../hooks'
import { ConfigurableProductQuantityField } from './ConfigurableProductQuantityField'
import { ConfigurableProductSubmitButton } from './ConfigurableProductSubmitButton'

type ConfigurableProductAddToCartProps = {
  name: string
  priceRange?: PriceRange
  optionEndLabels?: Record<string, React.ReactNode>
  children?: React.ReactNode
  additionalButtons?: React.ReactNode
  sx?: SxProps<Theme>
}

const compName = 'ConfigurableOptionsInput' as const
const parts = ['form', 'button', 'finalPrice', 'quantity', 'divider', 'buttonWrapper'] as const
const { classes } = extendableComponent(compName, parts)

export function ConfigurableProductAddToCart(props: ConfigurableProductAddToCartProps) {
  const { name, children, priceRange, optionEndLabels, additionalButtons, sx = [] } = props

  const form = useFormProductAddToCart()
  const { formState, error, data } = form

  const typeProduct = useConfigurableTypeProduct()
  const regular_price =
    typeProduct?.configurable_product_options_selection?.variant?.price_range.minimum_price
      .regular_price

  return (
    <Box className={classes.form} sx={[{ width: '100%' }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Divider className={classes.divider} sx={(theme) => ({ margin: `${theme.spacings.sm} 0` })} />
      <ConfigurableOptionsInput optionEndLabels={optionEndLabels} />

      <ConfigurableProductQuantityField className={classes.quantity} />

      <Divider className={classes.divider} sx={(theme) => ({ margin: `${theme.spacings.sm} 0` })} />

      <Typography
        component='div'
        variant='h3'
        className={classes.finalPrice}
        sx={(theme) => ({ marginTop: theme.spacings.sm })}
      >
        <Money {...(regular_price ?? priceRange?.minimum_price.regular_price)} />
      </Typography>

      {children}

      <ConfigurableProductSubmitButton
        classes={{ button: classes.button, buttonWrapper: classes.buttonWrapper }}
        additionalButtons={additionalButtons}
      />

      <ApolloCartErrorAlert error={error} />

      <AnimatePresence initial={false}>
        {data?.addProductsToCart?.user_errors.map((e) => (
          <AnimatedRow key={e?.code}>
            <Alert severity='error'>{e?.message}</Alert>
          </AnimatedRow>
        ))}
      </AnimatePresence>

      <MessageSnackbar
        open={
          !formState.isSubmitting &&
          formState.isSubmitSuccessful &&
          !error?.message &&
          !data?.addProductsToCart?.user_errors?.length
        }
        variant='pill'
        action={
          <PageLink href='/cart' passHref>
            <Button
              id='view-shopping-cart-button'
              size='medium'
              variant='pill'
              color='secondary'
              endIcon={<IconSvg src={iconChevronRight} />}
            >
              <Trans id='View shopping cart' />
            </Button>
          </PageLink>
        }
      >
        <Trans
          id='<0>{name}</0> has been added to your shopping cart!'
          components={{ 0: <strong /> }}
          values={{ name }}
        />
      </MessageSnackbar>
    </Box>
  )
}
