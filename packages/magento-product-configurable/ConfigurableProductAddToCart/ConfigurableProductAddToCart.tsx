import { useFormGqlMutationCart, ApolloCartErrorAlert } from '@graphcommerce/magento-cart'
import { Money } from '@graphcommerce/magento-store'
import {
  AnimatedRow,
  Button,
  MessageSnackbar,
  TextInputNumber,
  iconChevronRight,
  SvgImageSimple,
} from '@graphcommerce/next-ui'
import { Divider, makeStyles, Theme, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { AnimatePresence } from 'framer-motion'
import PageLink from 'next/link'
import React from 'react'
import { Selected, useConfigurableContext } from '../ConfigurableContext'
import cheapestVariant from '../ConfigurableContext/cheapestVariant'
import ConfigurableOptionsInput from '../ConfigurableOptions'
import {
  ConfigurableProductAddToCartDocument,
  ConfigurableProductAddToCartMutationVariables,
} from './ConfigurableProductAddToCart.gql'

type ConfigurableProductAddToCartProps = {
  variables: Omit<ConfigurableProductAddToCartMutationVariables, 'cartId' | 'selectedOptions'>
  name: string
  optionEndLabels?: Record<string, React.ReactNode>
  children?: React.ReactNode
}

const useStyles = makeStyles(
  (theme: Theme) => ({
    form: {
      width: '100%',
    },
    button: {
      marginTop: theme.spacings.sm,
      marginBottom: theme.spacings.sm,
      width: '100%',
    },
    finalPrice: {
      marginTop: theme.spacings.sm,
    },
    quantity: {
      marginTop: theme.spacings.sm,
    },
    divider: {
      margin: `${theme.spacings.sm} 0`,
    },
  }),
  { name: 'ConfigurableProductAddToCart' },
)

export default function ConfigurableProductAddToCart(props: ConfigurableProductAddToCartProps) {
  const { name, children, variables, optionEndLabels, ...buttonProps } = props
  const { getUids, getVariants, selection } = useConfigurableContext(variables.sku)
  const classes = useStyles()

  const form = useFormGqlMutationCart(ConfigurableProductAddToCartDocument, {
    defaultValues: variables,
    onBeforeSubmit: ({ selectedOptions, ...vars }) => ({
      ...vars,
      // todo: selectedOptions should contain the correct values directly
      selectedOptions: getUids(selectedOptions?.[0] as unknown as Selected),
    }),
  })
  const { handleSubmit, formState, muiRegister, required, control, error, data } = form
  const submitHandler = handleSubmit(() => {})

  return (
    <form onSubmit={submitHandler} noValidate className={classes.form}>
      <Divider className={classes.divider} />
      <ConfigurableOptionsInput
        name='selectedOptions'
        sku={variables.sku}
        control={control}
        rules={{ required: required.selectedOptions }}
        errors={formState.errors.selectedOptions}
        optionEndLabels={optionEndLabels}
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
      />
      <Typography component='div' variant='h3' className={classes.finalPrice}>
        <Money
          {...cheapestVariant(getVariants(selection))?.product?.price_range.minimum_price
            .final_price}
        />
      </Typography>
      {children}
      <Button
        type='submit'
        loading={formState.isSubmitting}
        color='primary'
        variant='pill'
        size='large'
        text='bold'
        classes={{ root: classes.button }}
        {...buttonProps}
      >
        Add to Cart
      </Button>

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
              endIcon={<SvgImageSimple src={iconChevronRight} inverted />}
            >
              View shopping cart
            </Button>
          </PageLink>
        }
      >
        <>
          <strong>{name}</strong>&nbsp;has been added to your shopping cart!
        </>
      </MessageSnackbar>
    </form>
  )
}
