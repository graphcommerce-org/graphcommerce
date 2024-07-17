import { UseFormGraphQlOptions } from '@graphcommerce/ecommerce-ui'
import { ApolloQueryResult, useApolloClient } from '@graphcommerce/graphql'
import {
  useFormGqlMutationCart,
  CrosssellsDocument,
  CrosssellsQuery,
} from '@graphcommerce/magento-cart'
import { ErrorSnackbarProps, MessageSnackbarProps, nonNullable } from '@graphcommerce/next-ui'
import { Box, SxProps, Theme } from '@mui/material'
import { useRouter } from 'next/router'
import { useMemo, useRef } from 'react'
import { AddProductsToCartDocument, AddProductsToCartMutation } from './AddProductsToCart.gql'
import {
  AddProductsToCartSnackbar,
  AddProductsToCartSnackbarProps,
} from './AddProductsToCartSnackbar'
import { toUserErrors } from './toUserErrors'
import {
  AddProductsToCartContext,
  AddProductsToCartFields,
  RedirectType,
} from './useFormAddProductsToCart'

export type AddProductsToCartFormProps = {
  children: React.ReactNode
  sx?: SxProps<Theme>
  redirect?: RedirectType
  snackbarProps?: AddProductsToCartSnackbarProps

  /**
   * @deprecated use snackbarProps.errorSnackbar instead
   */
  errorSnackbar?: Omit<ErrorSnackbarProps, 'open'>
  /**
   * @deprecated use snackbarProps.successSnackbar instead
   */
  successSnackbar?: Omit<MessageSnackbarProps, 'open' | 'action'>
  /**
   * @deprecated use snackbarProps.disableSuccessSnackbar instead
   */
  disableSuccessSnackbar?: boolean
} & UseFormGraphQlOptions<AddProductsToCartMutation, AddProductsToCartFields>

const name = 'AddProductsToCartForm'

/**
 * Component that handles adding products to the cart. Used on the product page, but can be used for
 * any product listing.
 *
 * Can be configured globally in your theme.ts;
 *
 * - Uses react-hook-form's useForm hook under the hood and exposes the form as a context which can be
 *   consumed with `useFormAddProductsToCart` hook.
 * - Cleans up the submitted data.
 * - Redirects the user to the cart/checkout/added page after successful submission.
 */
export function AddProductsToCartForm(props: AddProductsToCartFormProps) {
  let {
    children,
    redirect,
    onComplete,
    sx,
    disableSuccessSnackbar,
    errorSnackbar,
    successSnackbar,
    snackbarProps,
    ...formProps
  } = props
  const router = useRouter()
  const client = useApolloClient()
  const crosssellsQuery = useRef<Promise<ApolloQueryResult<CrosssellsQuery>>>()

  if (typeof redirect !== 'undefined' && redirect !== 'added' && router.pathname === redirect)
    redirect = undefined

  const form = useFormGqlMutationCart<AddProductsToCartMutation, AddProductsToCartFields>(
    AddProductsToCartDocument,
    {
      ...formProps,
      experimental_useV2: true,
      // We're stripping out incomplete entered options.
      onBeforeSubmit: async (variables) => {
        const variables2 = (await formProps.onBeforeSubmit?.(variables)) ?? variables
        if (variables2 === false) return false

        const { cartId, cartItems } = variables2

        const requestData = {
          cartId,
          cartItems: cartItems
            .filter((cartItem) => cartItem.sku && cartItem.quantity !== 0)
            .map(({ customizable_options, ...cartItem }) => {
              const options = Object.values(customizable_options ?? {})
                .flat(1)
                .filter(Boolean)

              return {
                ...cartItem,
                quantity: cartItem.quantity || 1,
                selected_options: [
                  ...(cartItem.selected_options ?? []).filter(Boolean),
                  ...options,
                ],
                entered_options: [
                  ...(cartItem.entered_options
                    ?.filter((option) => option?.value)
                    .filter(nonNullable)
                    .map((option) => ({ uid: option.uid, value: `${option?.value}` })) ?? []),
                ],
              }
            }),
        }

        const sku = requestData.cartItems[requestData.cartItems.length - 1]?.sku

        if (sku && redirect === 'added') {
          // Preload crosssells
          crosssellsQuery.current = client.query({
            query: CrosssellsDocument,
            variables: { pageSize: 1, filters: { sku: { eq: sku } } },
          })
        }

        return requestData
      },
      onComplete: async (result, variables) => {
        await onComplete?.(result, variables)

        // After the form has been submitted, we're resetting the submitted SKU's
        form.getValues('cartItems').forEach((item, index) => {
          if (item.sku) form.setValue(`cartItems.${index}.sku`, '')
        })

        if (toUserErrors(result.data).length || result.errors?.length || !redirect) return

        if (redirect === 'added') {
          await crosssellsQuery.current
          const method = router.pathname.startsWith('/checkout/added')
            ? router.replace
            : router.push
          await method({
            pathname: '/checkout/added',
            query: { sku: variables.cartItems.map((i) => i.sku) },
          })
        } else {
          await router.push({ pathname: redirect })
        }
      },
    },
  )

  const submit = form.handleSubmit(() => {})

  return (
    <AddProductsToCartContext.Provider
      value={useMemo(() => ({ ...form, redirect }), [form, redirect])}
    >
      <Box component='form' onSubmit={submit} noValidate sx={sx} className={name}>
        {children}
      </Box>
      <AddProductsToCartSnackbar
        errorSnackbar={errorSnackbar}
        successSnackbar={successSnackbar}
        disableSuccessSnackbar={disableSuccessSnackbar}
        {...snackbarProps}
      />
    </AddProductsToCartContext.Provider>
  )
}
