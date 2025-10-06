import { EmailElement, TextFieldElement } from '@graphcommerce/ecommerce-ui'
import {
  Button,
  FormActions,
  FormRow,
  FullPageMessage,
  iconBox,
  IconSvg,
  useUrlQuery,
} from '@graphcommerce/next-ui'
import { useFormGqlQuery } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/macro'
import { Box, Typography } from '@mui/material'
import { useMemo } from 'react'
import { ApolloCustomerErrorAlert } from '../ApolloCustomerError'
import { OrderDetails, OrderItems, OrderStateLabel, OrderTotals } from '../Order'
import type { GuestOrderQueryVariables } from './GuestOrder.gql'
import { GuestOrderDocument } from './GuestOrder.gql'

export function GuestOrderOverviewForm() {
  const [urlQuery, setUrlQuery] = useUrlQuery<Partial<GuestOrderQueryVariables>>(true)

  const form = useFormGqlQuery(GuestOrderDocument, {
    defaultValues: urlQuery,
    onBeforeSubmit: (variables) => {
      variables.orderNumber = variables.orderNumber.replace(/^#/, '')
      return variables
    },
    onComplete: async (data, variables) => {
      await setUrlQuery(variables)
    },
  })

  const {
    control,
    data: orderData,
    required,
    handleSubmit,
    formState,
    error,
    reset,
    getValues,
  } = form

  useMemo(() => {
    if (Object.keys(getValues()).length > 0 && Object.keys(urlQuery).length === 0) reset()
  }, [getValues, reset, urlQuery])

  const submitHandler = handleSubmit(() => {})

  const showForm = !orderData?.guestOrder || !formState.isSubmitSuccessful

  return (
    <>
      {showForm ? (
        <Box component='form' onSubmit={submitHandler} noValidate>
          <FormRow>
            <TextFieldElement
              control={control}
              name='orderNumber'
              required={required.orderNumber}
              label={<Trans>Order number</Trans>}
            />
          </FormRow>
          <FormRow>
            <EmailElement control={control} name='email' required={required.email} />
            <TextFieldElement
              control={control}
              name='postcode'
              required={required.postcode}
              label={<Trans>Postcode</Trans>}
              autoComplete='postal_code'
            />
          </FormRow>

          <ApolloCustomerErrorAlert error={error} />

          <FormActions>
            <Button
              type='submit'
              loading={formState.isSubmitting}
              color='secondary'
              variant='pill'
              size='large'
            >
              <Trans>Get order</Trans>
            </Button>
          </FormActions>
        </Box>
      ) : (
        <>
          {!orderData?.guestOrder && (
            <FullPageMessage
              title={<Trans>Order not found</Trans>}
              icon={<IconSvg src={iconBox} size='xxl' />}
            />
          )}

          {orderData?.guestOrder && (
            <>
              <Typography sx={(theme) => ({ textAlign: 'center', mb: theme.spacings.lg })}>
                <OrderStateLabel {...orderData.guestOrder} />
              </Typography>
              <OrderDetails order={orderData.guestOrder} />
              <OrderItems order={orderData.guestOrder} />
              <OrderTotals order={orderData.guestOrder} />
              {/* <OrderAdditional order={order} /> */}
            </>
          )}
        </>
      )}
    </>
  )
}
