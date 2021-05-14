import { TypedDocumentNode, useQuery } from '@apollo/client'
import { Box, makeStyles, Theme } from '@material-ui/core'
import { CustomerTokenDocument } from '@reachdigital/magento-customer/CustomerToken.gql'
import { ProductInterface } from '@reachdigital/magento-graphql'
import Button, { ButtonProps } from '@reachdigital/next-ui/Button'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import MessageSnackbar from '@reachdigital/next-ui/Snackbar/MessageSnackbar'
import SvgImage from '@reachdigital/next-ui/SvgImage'
import TextInputNumber from '@reachdigital/next-ui/TextInputNumber'
import { iconCheckmark, iconChevronRight } from '@reachdigital/next-ui/icons'
import { DeepPartial, UnpackNestedValue, Path } from '@reachdigital/react-hook-form'
import PageLink from 'next/link'
import React from 'react'
import { useFormGqlMutationCart } from '../../hooks/useFormGqlMutationCart'

const useStyles = makeStyles(
  (theme: Theme) => ({
    button: {
      marginTop: theme.spacings.sm,
      width: '100%',
    },
  }),
  { name: 'AddToCart' },
)

export type AddToCartProps = React.ComponentProps<typeof AddToCartButton>

export default function AddToCartButton<Q, V extends { cartId: string; [index: string]: unknown }>(
  props: Pick<ProductInterface, 'name'> & {
    mutation: TypedDocumentNode<Q, V>
    variables: Omit<V, 'cartId'>
    name: string
  } & Omit<ButtonProps, 'type' | 'name'>,
) {
  const { name, mutation, variables, ...buttonProps } = props

  const form = useFormGqlMutationCart<Q, V>(mutation, {
    defaultValues: variables as UnpackNestedValue<DeepPartial<V>>,
  })

  const { handleSubmit, formState, error, muiRegister, required } = form
  const submitHandler = handleSubmit(() => {})
  const classes = useStyles()

  const { data: tokenQuery } = useQuery(CustomerTokenDocument)

  return (
    <form onSubmit={submitHandler} noValidate>
      <TextInputNumber
        variant='outlined'
        error={formState.isSubmitted && !!formState.errors.quantity}
        required={required.quantity}
        inputProps={{ min: 1 }}
        {...muiRegister('quantity' as Path<V>, { required: required.quantity })}
        helperText={formState.isSubmitted && formState.errors.quantity}
        disabled={formState.isSubmitting}
        size='small'
      />

      <Button
        type='submit'
        classes={{ root: classes.button }}
        loading={formState.isSubmitting}
        color='primary'
        variant='pill'
        size='large'
        {...buttonProps}
      >
        Add to Cart
      </Button>

      <ApolloErrorAlert error={error} />

      <MessageSnackbar
        open={!formState.isSubmitting && formState.isSubmitSuccessful && !error?.message}
        variant='pill'
        color='default'
        action={
          <PageLink href='/cart'>
            <Button
              size='medium'
              variant='pill'
              color='secondary'
              endIcon={<SvgImage src={iconChevronRight} shade='inverted' alt='chevron right' />}
            >
              View shopping cart
            </Button>
          </PageLink>
        }
      >
        <Box alignItems='center' display='flex'>
          <SvgImage src={iconCheckmark} loading='eager' alt='checkmark' />
          <strong>{name}</strong>&nbsp;has been added to your shopping cart!
        </Box>
      </MessageSnackbar>
    </form>
  )
}
