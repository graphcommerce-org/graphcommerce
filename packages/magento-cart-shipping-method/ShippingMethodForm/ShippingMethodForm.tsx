import { Scroller, ScrollerButton, ScrollerProvider } from '@graphcommerce/framer-scroller'
import {
  ApolloCartErrorAlert,
  useCartQuery,
  useFormGqlMutationCart,
} from '@graphcommerce/magento-cart'
import {
  Form,
  FormRow,
  iconChevronLeft,
  iconChevronRight,
  IconSvg,
  extendableComponent,
} from '@graphcommerce/next-ui'
import { Controller, useFormCompose, UseFormComposeOptions } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { FormControl, Alert, Box } from '@mui/material'
import { AvailableShippingMethod } from '../AvailableShippingMethod/AvailableShippingMethod'
import { GetShippingMethodsDocument } from './GetShippingMethods.gql'
import {
  ShippingMethodFormDocument,
  ShippingMethodFormMutation,
  ShippingMethodFormMutationVariables,
} from './ShippingMethodForm.gql'

export type ShippingMethodFormProps = Pick<UseFormComposeOptions, 'step'>

type OwnerProps = {
  itemCount?: number
}

const name = 'ShippingMethodForm' as const
const parts = ['root', 'alert', 'buttonRoot', 'buttonContainer', 'scrollerRoot'] as const
const { withState } = extendableComponent<OwnerProps, typeof name, typeof parts>(name, parts)

export function ShippingMethodForm(props: ShippingMethodFormProps) {
  const { step } = props
  const { data: cartQuery } = useCartQuery(GetShippingMethodsDocument)

  const currentAddress = cartQuery?.cart?.shipping_addresses?.[0]
  const available = currentAddress?.available_shipping_methods
  const selected = currentAddress?.selected_shipping_method
  const carrier = selected?.carrier_code ?? available?.[0]?.carrier_code
  const method = selected?.method_code ?? available?.[0]?.method_code ?? undefined
  const carrierMethod = carrier && method ? `${carrier}-${method}` : undefined

  const sortedAvailableShippingMethods = [
    ...(currentAddress?.available_shipping_methods ?? []),
    // eslint-disable-next-line no-nested-ternary
  ].sort((a, b) => (a === b ? 0 : a ? -1 : 1))

  const form = useFormGqlMutationCart<
    ShippingMethodFormMutation,
    ShippingMethodFormMutationVariables & { carrierMethod?: string }
  >(ShippingMethodFormDocument, {
    defaultValues: { carrierMethod, carrier, method },
  })

  const { handleSubmit, control, setValue, register, required, error } = form
  const submit = handleSubmit(() => {})
  useFormCompose({ form, step, submit, key: 'ShippingMethodForm' })

  const classes = withState({ itemCount: sortedAvailableShippingMethods.length })
  return (
    <Form onSubmit={submit} noValidate>
      <input type='hidden' {...register('carrier', { required: required.carrier })} />
      <input type='hidden' {...register('method', { required: required.method })} />

      <FormRow
        className={classes.root}
        sx={(theme) => ({
          marginTop: theme.spacings.xs,
          position: 'relative',
          padding: 0,
        })}
      >
        <ScrollerProvider scrollSnapAlign='center'>
          <Box
            className={classes.buttonContainer}
            sx={{
              position: 'absolute',
              left: 0,
              zIndex: 2,
              height: '100%',
              '& > div': { height: '100%' },
            }}
          >
            <ScrollerButton
              direction='left'
              className={classes.buttonRoot}
              sx={{
                bgcolor: 'background.default',
                borderRadius: 0,
                width: '30px',
                height: '100%',
                boxShadow: 'none',
                borderWidth: 1,
                borderColor: 'divider',
                '&:focus': {
                  boxShadow: 'none',
                },
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
                '&.itemCount1, &.itemCount2': {
                  display: 'none',
                },
              }}
            >
              <IconSvg
                src={iconChevronLeft}
                size='small'
                aria-label={i18n._(/* i18n */ `Scroll Left`)}
              />
            </ScrollerButton>
          </Box>

          <FormControl>
            <Controller
              defaultValue={carrierMethod}
              control={control}
              name='carrierMethod'
              rules={{ required: 'Please select a shipping method' }}
              render={({ field: { onChange, value, onBlur }, fieldState: { invalid } }) => (
                <>
                  <Scroller
                    className={classes.scrollerRoot}
                    sx={[
                      {
                        gridTemplateRows: `100%`,
                        gridTemplateColumns: `repeat(2, calc(50% - 20px))`,
                        gap: `6px`,
                        borderRadius: 0,
                        padding: '1px 1px',
                        '&:focus': {
                          outline: 'unset',
                        },
                      },
                      sortedAvailableShippingMethods.length === 2 && {
                        gridTemplateColumns: `repeat(2, calc(50% - 4px))`,
                      },
                      sortedAvailableShippingMethods.length === 1 && {
                        gridTemplateColumns: `repeat(2, calc(100% - 8px))`,
                      },
                    ]}
                    hideScrollbar
                    tabIndex={0}
                  >
                    {sortedAvailableShippingMethods.map((shippingMethod) => {
                      if (!shippingMethod) return null
                      const code = `${shippingMethod?.carrier_code}-${shippingMethod?.method_code}`
                      return (
                        <AvailableShippingMethod
                          key={code}
                          value={code}
                          onChange={(_, val: string) => {
                            onChange(val)
                            setValue('carrier', val.split('-')?.[0])
                            setValue('method', val.split('-')?.[1])

                            // todo(paales): what if there are additional options to submit, shouldn't we wait for that or will those always come back from this mutation?
                            // eslint-disable-next-line @typescript-eslint/no-floating-promises
                            submit()
                          }}
                          onBlur={onBlur}
                          selected={value === code}
                          {...shippingMethod}
                        >
                          Delivery from: Mon - Sat
                        </AvailableShippingMethod>
                      )
                    })}
                    {!currentAddress?.available_shipping_methods && (
                      <AvailableShippingMethod
                        available={false}
                        carrier_code='none'
                        carrier_title='No shipping methods available'
                      >
                        <Trans id='Please fill in your address to see shipping methods' />
                      </AvailableShippingMethod>
                    )}
                  </Scroller>

                  {invalid && currentAddress?.available_shipping_methods && (
                    <Alert
                      className={classes.alert}
                      severity='error'
                      sx={(theme) => ({
                        marginTop: theme.spacings.xxs,
                      })}
                    >
                      Please select a shipping method
                    </Alert>
                  )}
                </>
              )}
            />
          </FormControl>

          <Box
            sx={{
              position: 'absolute',
              right: 0,
              zIndex: 2,
              height: '100%',
              '& > div': { height: '100%' },
            }}
            className={classes.buttonContainer}
          >
            <ScrollerButton
              direction='right'
              sx={{
                bgcolor: 'background.default',
                borderRadius: 0,
                width: '30px',
                height: '100%',
                boxShadow: 'none',
                borderWidth: 1,
                borderColor: 'divider',
                '&:focus': {
                  boxShadow: 'none',
                },
                borderTopRightRadius: 4,
                borderBottomRightRadius: 4,
                '&.itemCount1, &.itemCount2': {
                  display: 'none',
                },
              }}
              className={classes.buttonRoot}
            >
              <IconSvg
                src={iconChevronRight}
                size='small'
                aria-label={i18n._(/* i18n */ `Scroll Right`)}
              />
            </ScrollerButton>
          </Box>
        </ScrollerProvider>
      </FormRow>

      <ApolloCartErrorAlert error={error} />
    </Form>
  )
}
