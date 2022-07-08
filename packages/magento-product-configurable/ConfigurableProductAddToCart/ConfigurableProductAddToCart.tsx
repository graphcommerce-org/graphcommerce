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
  TextInputNumber,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Divider, Alert, Box, SxProps, Theme, Typography } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import PageLink from 'next/link'
import React from 'react'
import { ConfigurableOptionsInput } from '../ConfigurableOptions/ConfigurableOptionsInput'
import { useConfigurableTypeProduct } from '../hooks'

type ConfigurableProductAddToCartProps = {
  optionEndLabels?: Record<string, React.ReactNode>
  children?: React.ReactNode
  additionalButtons?: React.ReactNode
  sx?: SxProps<Theme>
}

const compName = 'ConfigurableOptionsInput' as const
const parts = ['form', 'button', 'finalPrice', 'quantity', 'divider', 'buttonWrapper'] as const
const { classes } = extendableComponent(compName, parts)

export function ConfigurableProductAddToCart(props: ConfigurableProductAddToCartProps) {
  const { children, optionEndLabels, additionalButtons, sx = [] } = props

  const form = useFormProductAddToCart()
  const { formState, error, data, muiRegister, required } = form
  const { uid, name, configurable_product_options_selection, price_range } =
    useConfigurableTypeProduct()
  const regular_price =
    configurable_product_options_selection?.variant?.price_range.minimum_price.regular_price ??
    price_range.minimum_price.regular_price

  return (
    <Box className={classes.form} sx={[{ width: '100%' }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Divider className={classes.divider} sx={(theme) => ({ margin: `${theme.spacings.sm} 0` })} />

      {/* Add to cart component */}
      <ConfigurableOptionsInput optionEndLabels={optionEndLabels} />

      {/* Quantity component */}
      <TextInputNumber
        variant='outlined'
        error={formState.isSubmitted && !!formState.errors.quantity}
        required={required.quantity}
        inputProps={{ min: 1 }}
        {...muiRegister('quantity', { required: required.quantity })}
        helperText={formState.isSubmitted && formState.errors.quantity?.message}
        defaultValue={1}
        size='small'
        className={classes.quantity}
        sx={(theme) => ({ marginTop: theme.spacings.sm })}
      />

      <Divider className={classes.divider} sx={(theme) => ({ margin: `${theme.spacings.sm} 0` })} />

      {/* Final price component */}
      <Typography
        component='div'
        variant='h3'
        className={classes.finalPrice}
        sx={(theme) => ({ marginTop: theme.spacings.sm })}
      >
        <Money {...regular_price} key={`${uid}-${regular_price.value}`} />
      </Typography>

      {/* Renders any given child components */}

      {children}

      {/* Submit button component */}
      <Box
        sx={(theme) => ({ display: 'flex', alignItems: 'center', columnGap: theme.spacings.xs })}
        className={classes.buttonWrapper}
      >
        <Button
          type='submit'
          loading={formState.isSubmitting}
          color='primary'
          variant='pill'
          size='large'
          className={classes.button}
          sx={(theme) => ({
            marginTop: theme.spacings.sm,
            marginBottom: theme.spacings.sm,
            width: '100%',
          })}
        >
          <Trans id='Add to Cart' />
        </Button>
        {additionalButtons}
      </Box>

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
