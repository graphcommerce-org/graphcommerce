import { ApolloCartErrorSnackbar } from '@graphcommerce/magento-cart'
import {
  Button,
  ErrorSnackbar,
  IconSvg,
  ListFormat,
  MessageSnackbar,
  iconChevronRight,
  nonNullable,
} from '@graphcommerce/next-ui'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Plural, Trans } from '@lingui/macro'
import { Box } from '@mui/material'
import { OrderItemsFragment } from '../OrderItems/OrderItems.gql'
import { ReorderItemsDocument } from './ReorderItems.gql'

export type ReorderItemsProps = OrderItemsFragment & {
  orderNumber: string
}

export function ReorderItems(props: ReorderItemsProps) {
  const { orderNumber, items } = props

  const form = useFormGqlMutation(ReorderItemsDocument, {
    defaultValues: {
      orderNumber,
    },
  })

  const { formState, handleSubmit, error, data: cartData } = form

  const submitHandler = handleSubmit(() => {})

  const errors = cartData?.reorderItems?.userInputErrors
  const cart = cartData?.reorderItems?.cart

  if (!items) return null

  return (
    <Box component='form' onSubmit={submitHandler}>
      <Button variant='contained' color='primary' type='submit' loading={formState.isSubmitting}>
        <Trans>Reorder</Trans>
      </Button>

      {error && <ApolloCartErrorSnackbar error={error} />}

      {!!errors?.length && (
        <ErrorSnackbar variant='pill' severity='error' open={!!errors.length}>
          <>{errors.map((e) => e?.message).join(', ')}</>
        </ErrorSnackbar>
      )}

      {cart && (
        <MessageSnackbar
          variant='pill'
          severity='success'
          open={!!cart}
          action={
            <Button
              href='/cart'
              id='view-shopping-cart-button'
              size='medium'
              variant='pill'
              color='secondary'
              endIcon={<IconSvg src={iconChevronRight} />}
              sx={{ display: 'flex' }}
            >
              <Trans>View shopping cart</Trans>
            </Button>
          }
        >
          <Plural
            value={items.length}
            one={
              <Trans>
                <ListFormat listStyle='long' type='conjunction'>
                  {items.map((item) => item?.product_name).filter(nonNullable)}
                </ListFormat>{' '}
                has been added to your shopping cart
              </Trans>
            }
            two={
              <Trans>
                <ListFormat listStyle='long' type='conjunction'>
                  {items.map((item) => item?.product_name).filter(nonNullable)}
                </ListFormat>{' '}
                have been added to your shopping cart!
              </Trans>
            }
            other={<Trans># products have been added to your shopping cart!</Trans>}
          />
        </MessageSnackbar>
      )}
    </Box>
  )
}
