import { useQuery } from '@apollo/client'
import { Divider, makeStyles, Theme, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useFormGqlMutationCart, ApolloCartErrorAlert } from '@reachdigital/magento-cart'
import { CustomerTokenDocument } from '@reachdigital/magento-customer'
import { ProductSidebarDelivery } from '@reachdigital/magento-product'
import { Money } from '@reachdigital/magento-store'
import {
  AnimatedRow,
  Button,
  MessageSnackbar,
  SvgImage,
  TextInputNumber,
  iconCheckmark,
  iconChevronRight,
} from '@reachdigital/next-ui'
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
      ...theme.typography.h4,
      fontWeight: theme.typography.fontWeightBold,
      marginTop: theme.spacings.sm,
    },
    quantity: {
      marginTop: theme.spacings.sm,
    },
    divider: {
      margin: '20px 0 5px 0',
    },
    messageIcon: {
      marginBottom: '-2px',
      marginRight: 5,
    },
  }),
  { name: 'ConfigurableAddToCart' },
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

  const { data: tokenQuery } = useQuery(CustomerTokenDocument)
  const requireAuth = Boolean(tokenQuery?.customerToken && !tokenQuery?.customerToken.valid)

  return requireAuth ? (
    <PageLink href='/account/signin' passHref>
      <Button color='primary' variant='contained' {...buttonProps}>
        Add to Cart
      </Button>
    </PageLink>
  ) : (
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
      <div className={classes.finalPrice}>
        <Money
          {...cheapestVariant(getVariants(selection))?.product?.price_range.minimum_price
            .final_price}
        />
      </div>
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
        open={!formState.isSubmitting && formState.isSubmitSuccessful && !error?.message && !data?.addProductsToCart?.user_errors?.length}
        variant='pill'
        color='default'
        action={
          <PageLink href='/cart'>
            <Button
              size='medium'
              variant='pill'
              color='secondary'
              endIcon={
                <SvgImage
                  src={iconChevronRight}
                  shade='inverted'
                  loading='eager'
                  alt='chevron right'
                />
              }
            >
              View shopping cart
            </Button>
          </PageLink>
        }
      >
        <div>
          <SvgImage
            src={iconCheckmark}
            size='small'
            loading='eager'
            alt='checkmark'
            className={classes.messageIcon}
          />
          <strong>{name}</strong>&nbsp;has been added to your shopping cart!
        </div>
      </MessageSnackbar>
    </form>
  )
}
