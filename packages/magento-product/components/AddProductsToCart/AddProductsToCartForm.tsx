import type { UseFormGraphQlOptions } from '@graphcommerce/ecommerce-ui'
import type { ApolloQueryResult } from '@graphcommerce/graphql'
import { useApolloClient } from '@graphcommerce/graphql'
import type { CrosssellsQuery } from '@graphcommerce/magento-cart'
import { CrosssellsDocument, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import type { ErrorSnackbarProps, MessageSnackbarProps } from '@graphcommerce/next-ui'
import { nonNullable } from '@graphcommerce/next-ui'
import type { SxProps, Theme } from '@mui/material'
import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { useMemo, useRef } from 'react'
import type { AddProductsToCartMutation } from './AddProductsToCart.gql'
import { AddProductsToCartDocument } from './AddProductsToCart.gql'
import type { AddProductsToCartSnackbarProps } from './AddProductsToCartSnackbar'
import { AddProductsToCartSnackbar } from './AddProductsToCartSnackbar'
import { toUserErrors } from './toUserErrors'
import type { AddProductsToCartFields, RedirectType } from './useFormAddProductsToCart'
import { AddProductsToCartContext } from './useFormAddProductsToCart'

export type AddProductsToCartFormProps = {
  children: React.ReactNode
  sx?: SxProps<Theme>
  redirect?: RedirectType
  snackbarProps?: AddProductsToCartSnackbarProps
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
  let { children, redirect, onComplete, sx, snackbarProps, ...formProps } = props
  const router = useRouter()
  const client = useApolloClient()
  const crosssellsQuery = useRef<Promise<ApolloQueryResult<CrosssellsQuery>>>()

  if (typeof redirect !== 'undefined' && redirect !== 'added' && router.pathname === redirect)
    redirect = undefined

  const form = useFormGqlMutationCart<AddProductsToCartMutation, AddProductsToCartFields>(
    AddProductsToCartDocument,
    {
      ...formProps,
      // We're stripping out incomplete entered options.
      onBeforeSubmit: async (variables) => {
        const variables2 = (await formProps.onBeforeSubmit?.(variables)) ?? variables
        if (variables2 === false) return false

        const { cartId, cartItems } = variables2

        const requestData = {
          cartId,
          cartItems: cartItems
            .filter((cartItem) => cartItem.sku && cartItem.quantity !== 0)
            .map(({ selected_options_record = {}, entered_options_record = {}, ...cartItem }) => ({
              ...cartItem,
              quantity: cartItem.quantity || 1,
              selected_options: [
                ...(cartItem.selected_options ?? []).filter(nonNullable),
                ...Object.values(selected_options_record).flat(1).filter(nonNullable),
              ],
              entered_options: [
                ...(cartItem.entered_options ?? []).filter(nonNullable),
                ...Object.entries(entered_options_record).map(([uid, value]) => {
                  if (value instanceof Date) {
                    const dateValue = value.toISOString().replace(/.000Z/, '').replace('T', ' ')
                    return { uid, value: dateValue }
                  }
                  return { uid, value: value.toString() }
                }),
              ],
            })),
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
      <AddProductsToCartSnackbar {...snackbarProps} />
    </AddProductsToCartContext.Provider>
  )
}
