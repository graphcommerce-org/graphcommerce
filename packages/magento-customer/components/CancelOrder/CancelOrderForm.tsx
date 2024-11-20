import { ApolloErrorSnackbar, CheckboxElement, SelectElement } from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  breakpointVal,
  Button,
  filterNonNullableKeys,
  FormRow,
  iconChevronDown,
  IconSvg,
} from '@graphcommerce/next-ui'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/macro'
import type { AccordionProps } from '@mui/material'
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box } from '@mui/material'
import { canCancelOrder } from '../../utils'
import type { OrderDetailsFragment } from '../OrderDetails/OrderDetails.gql'
import type { CancelOrderMutation, CancelOrderMutationVariables } from './CancelOrder.gql'
import { CancelOrderDocument } from './CancelOrder.gql'

type CancelOrderFormProps = {
  order: OrderDetailsFragment
} & Omit<AccordionProps, 'children'>

export function CancelOrderForm(props: CancelOrderFormProps) {
  const { order, sx, ...rest } = props
  const { id: orderId } = order

  const form = useFormGqlMutation<
    CancelOrderMutation,
    CancelOrderMutationVariables & { confirm: boolean }
  >(CancelOrderDocument, { defaultValues: { orderId: atob(orderId) } })

  const config = useQuery(StoreConfigDocument).data?.storeConfig
  const options = config?.order_cancellation_reasons
  const enabled = config?.order_cancellation_enabled

  const { control, formState, required, handleSubmit, error, data: cancelOrderData } = form

  const submitHandler = handleSubmit(() => {})

  const submittedWithoutErrors =
    formState.isSubmitSuccessful && !error && !cancelOrderData?.cancelOrder?.error

  const visible = enabled && (canCancelOrder(order) || submittedWithoutErrors)

  if (!visible) return null

  if (submittedWithoutErrors)
    return (
      <Alert sx={(theme) => ({ mb: theme.spacings.xxl })}>
        <Trans>Order has successfully been canceled</Trans>
      </Alert>
    )

  return (
    <Accordion
      sx={[
        (theme) => ({
          mb: theme.spacings.xxl,
          ...breakpointVal(
            'borderRadius',
            theme.shape.borderRadius * 2,
            theme.shape.borderRadius * 3,
            theme.breakpoints.values,
          ),
          '::before': { display: 'none' },
          '&.Mui-expanded:last-of-type': {
            mb: theme.spacings.xxl,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...rest}
    >
      <AccordionSummary
        expandIcon={<IconSvg src={iconChevronDown} />}
        sx={[
          (theme) => ({
            px: theme.spacings.xs,
            '& .MuiAccordionSummary-content': {
              alignItems: 'center',
              columnGap: 2,
              justifyContent: 'space-between',
            },
          }),
        ]}
      >
        <Trans>Cancel order</Trans>
      </AccordionSummary>
      <AccordionDetails sx={(theme) => ({ px: theme.spacings.xs, py: 0 })}>
        <Box component='form' onSubmit={submitHandler} noValidate>
          <FormRow>
            <SelectElement
              control={control}
              name='reason'
              label={<Trans>Reason</Trans>}
              required={required.reason}
              disabled={formState.isSubmitting || submittedWithoutErrors}
              options={filterNonNullableKeys(options)?.map(({ description }) => ({
                id: description,
                label: description,
              }))}
            />
          </FormRow>

          <CheckboxElement
            required
            control={control}
            name='confirm'
            color='error'
            label={
              <Trans>I understand that my order will be canceled and this can not be undone.</Trans>
            }
          />

          {submittedWithoutErrors && (
            <Alert>
              <Trans>Order has successfully been canceled</Trans>
            </Alert>
          )}

          {cancelOrderData?.cancelOrder?.error && (
            <Alert severity='error'>{cancelOrderData?.cancelOrder?.error}</Alert>
          )}

          <ApolloErrorSnackbar error={error} />

          <FormRow
            sx={(theme) => ({
              justifyContent: 'center',
              justifyItems: 'start',
              gridAutoFlow: 'column',
              gap: theme.spacings.sm,
            })}
          >
            <Button
              type='submit'
              variant='pill'
              color='error'
              loading={formState.isSubmitting}
              disabled={submittedWithoutErrors}
              size='large'
              sx={{ color: 'white', bgcolor: 'error.main' }}
            >
              <Trans>Cancel order</Trans>
            </Button>
          </FormRow>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}
