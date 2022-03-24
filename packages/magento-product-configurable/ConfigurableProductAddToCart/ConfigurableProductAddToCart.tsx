import { ApolloCartErrorAlert, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
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
import { Trans } from '@lingui/macro'
import { Divider, Typography, Alert, Box } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import PageLink from 'next/link'
import React from 'react'
import { Selected, useConfigurableContext } from '../ConfigurableContext/ConfigurableContext'
import cheapestVariant from '../ConfigurableContext/cheapestVariant'
import {
  ConfigurableOptionsInput,
  ConfigurableOptionsInputProps,
} from '../ConfigurableOptions/ConfigurableOptions'
import {
  ConfigurableProductAddToCartDocument,
  ConfigurableProductAddToCartMutationVariables,
} from './ConfigurableProductAddToCart.gql'

type ConfigurableProductAddToCartProps = {
  variables: Omit<ConfigurableProductAddToCartMutationVariables, 'cartId' | 'selectedOptions'>
  name: string
  optionEndLabels?: Record<string, React.ReactNode>
  children?: React.ReactNode
  additionalButtons?: React.ReactNode
  optionsProps?: Omit<
    ConfigurableOptionsInputProps,
    'name' | 'sku' | 'control' | 'rules' | 'errors' | 'optionEndLabels' | 'additionalButtons'
  >
}

const compName = 'ConfigurableOptionsInput' as const
const parts = ['form', 'button', 'finalPrice', 'quantity', 'divider', 'buttonWrapper'] as const
const { classes } = extendableComponent(compName, parts)

export function ConfigurableProductAddToCart(props: ConfigurableProductAddToCartProps) {
  const {
    name,
    children,
    variables,
    optionEndLabels,
    optionsProps,
    additionalButtons,
    ...buttonProps
  } = props
  const { getUids, getVariants, selection } = useConfigurableContext(variables.sku)

  const form = useFormGqlMutationCart(ConfigurableProductAddToCartDocument, {
    defaultValues: { ...variables },
    onBeforeSubmit: ({ selectedOptions, ...vars }) => ({
      ...vars,
      // todo: selectedOptions should contain the correct values directly
      selectedOptions: getUids(selectedOptions?.[0] as unknown as Selected),
    }),
  })

  const { handleSubmit, formState, muiRegister, required, control, error, data } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <Box
      component='form'
      onSubmit={submitHandler}
      noValidate
      className={classes.form}
      sx={{ width: '100%' }}
    >
      <Divider className={classes.divider} sx={(theme) => ({ margin: `${theme.spacings.sm} 0` })} />
      <ConfigurableOptionsInput
        name='selectedOptions'
        sku={variables.sku}
        control={control}
        rules={{ required: required.selectedOptions }}
        errors={formState.errors.selectedOptions}
        optionEndLabels={optionEndLabels}
        {...optionsProps}
      />
      <TextInputNumber
        variant='outlined'
        error={formState.isSubmitted && !!formState.errors.quantity}
        required={required.quantity}
        inputProps={{ min: 1 }}
        {...muiRegister('quantity', { required: required.quantity })}
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
          margin: `${theme.spacings.sm} 0`,
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
              size='medium'
              variant='pill'
              color='secondary'
              endIcon={<IconSvg src={iconChevronRight} />}
            >
              <Trans>View shopping cart</Trans>
            </Button>
          </PageLink>
        }
      >
        <Trans>
          <strong>{name}</strong> has been added to your shopping cart!
        </Trans>
      </MessageSnackbar>
    </Box>
  )
}
