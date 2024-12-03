import { NumberFieldElement } from '@graphcommerce/ecommerce-ui'
import { ApolloCartErrorAlert, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { Money } from '@graphcommerce/magento-store'
import {
  Button,
  IconSvg,
  MessageSnackbar,
  extendableComponent,
  iconChevronRight,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import type { SxProps, Theme } from '@mui/material'
import { Alert, Box, Divider, Typography } from '@mui/material'
import React from 'react'
import { useConfigurableContext } from '../ConfigurableContext/ConfigurableContext'
import cheapestVariant from '../ConfigurableContext/cheapestVariant'
import type { ConfigurableOptionsInputProps } from '../ConfigurableOptions/ConfigurableOptions'
import { ConfigurableOptionsInput } from '../ConfigurableOptions/ConfigurableOptions'
import type { ConfigurableProductAddToCartMutationVariables } from '../graphql/ConfigurableProductAddToCart.gql'
import { ConfigurableProductAddToCartDocument } from '../graphql/ConfigurableProductAddToCart.gql'

export type ConfigurableProductAddToCartProps = {
  variables: Omit<ConfigurableProductAddToCartMutationVariables, 'cartId' | 'selectedOptions'>
  name: string
  optionEndLabels?: Record<string, React.ReactNode>
  children?: React.ReactNode
  additionalButtons?: React.ReactNode
  sx?: SxProps<Theme>
  optionsProps?: Omit<
    ConfigurableOptionsInputProps,
    'name' | 'sku' | 'control' | 'rules' | 'errors' | 'optionEndLabels'
  >
}

const compName = 'ConfigurableOptionsInput'
const parts = ['form', 'button', 'finalPrice', 'quantity', 'divider', 'buttonWrapper'] as const
const { classes } = extendableComponent(compName, parts)

/**
 * @deprecated
 */
export function ConfigurableProductAddToCart(props: ConfigurableProductAddToCartProps) {
  const {
    name,
    children,
    variables,
    optionEndLabels,
    optionsProps,
    additionalButtons,
    sx = [],
    ...buttonProps
  } = props

  const { getVariants, selection } = useConfigurableContext(variables.sku)

  const form = useFormGqlMutationCart(ConfigurableProductAddToCartDocument, {
    defaultValues: { ...variables },
    onBeforeSubmit: ({ selectedOptions, ...vars }) => ({
      ...vars,
      selectedOptions: Object.values(selectedOptions),
    }),
  })

  const { handleSubmit, formState, required, control, error, data } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <Box
      component='form'
      onSubmit={submitHandler}
      noValidate
      className={classes.form}
      sx={[
        {
          width: '100%',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Divider className={classes.divider} sx={(theme) => ({ margin: `${theme.spacings.sm} 0` })} />
      <ConfigurableOptionsInput
        name='selectedOptions'
        sku={variables.sku}
        control={control}
        rules={{ required: required.selectedOptions }}
        errors={formState.errors}
        optionEndLabels={optionEndLabels}
        {...optionsProps}
      />

      <NumberFieldElement
        variant='outlined'
        error={formState.isSubmitted && !!formState.errors.quantity}
        required={required.quantity}
        inputProps={{ min: 1 }}
        name='quantity'
        rules={{ required: required.quantity }}
        control={control}
        helperText={formState.isSubmitted && formState.errors.quantity?.message}
        // disabled={loading}
        size='small'
        className={classes.quantity}
        sx={(theme) => ({ marginTop: theme.spacings.sm })}
      />
      <Divider className={classes.divider} sx={(theme) => ({ margin: `${theme.spacings.sm} 0` })} />
      <Typography
        component='div'
        variant='h3'
        className={classes.finalPrice}
        sx={(theme) => ({ marginTop: theme.spacings.sm })}
      >
        <Money
          {...cheapestVariant(getVariants(selection))?.product?.price_range.minimum_price
            .final_price}
        />
      </Typography>
      {children}
      <Box
        sx={(theme) => ({
          display: 'flex',
          alignItems: 'center',
          columnGap: theme.spacings.xs,
        })}
        className={classes.buttonWrapper}
      >
        <Button
          type='submit'
          loading={formState.isSubmitting}
          color='primary'
          variant='pill'
          size='large'
          className={classes.button}
          {...buttonProps}
          sx={(theme) => ({
            marginTop: theme.spacings.sm,
            marginBottom: theme.spacings.sm,
            width: '100%',
          })}
        >
          <Trans>Add to Cart</Trans>
        </Button>
        {additionalButtons}
      </Box>

      <ApolloCartErrorAlert error={error} />

      {data?.addProductsToCart?.user_errors.map((e) => (
        <Box key={e?.code}>
          <Alert severity='error'>{e?.message}</Alert>
        </Box>
      ))}

      <MessageSnackbar
        open={
          !formState.isSubmitting &&
          formState.isSubmitSuccessful &&
          !error?.message &&
          !data?.addProductsToCart?.user_errors?.length
        }
        variant='pill'
        severity='success'
        autoHide
        action={
          <Button
            href='/cart'
            id='view-shopping-cart-button'
            size='medium'
            variant='pill'
            color='secondary'
            endIcon={<IconSvg src={iconChevronRight} />}
          >
            <Trans>View shopping cart</Trans>
          </Button>
        }
      >
        <Trans>
          <strong>{name}</strong> has been added to your shopping cart!
        </Trans>
      </MessageSnackbar>
    </Box>
  )
}
