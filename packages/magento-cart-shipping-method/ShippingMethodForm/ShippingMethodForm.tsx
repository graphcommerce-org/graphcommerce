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
  responsiveVal,
  SvgImage,
  SvgImageSimple,
  UseStyles,
} from '@graphcommerce/next-ui'
import { Controller, useFormCompose, UseFormComposeOptions } from '@graphcommerce/react-hook-form'
import { FormControl, makeStyles, Theme } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import clsx from 'clsx'
import { m } from 'framer-motion'
import React from 'react'
import AvailableShippingMethod from '../AvailableShippingMethod/AvailableShippingMethod'
import { GetShippingMethodsDocument } from './GetShippingMethods.gql'
import {
  ShippingMethodFormDocument,
  ShippingMethodFormMutation,
  ShippingMethodFormMutationVariables,
} from './ShippingMethodForm.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      marginTop: theme.spacings.xs,
      position: 'relative',
      padding: 0,
    },
    itemtest: {
      background: 'silver',
      width: 300,
    },
    alert: {
      marginTop: theme.spacings.xxs,
    },
    toggleGroup: {
      display: 'inline-flex',
      gap: 10,
    },
    buttonRoot: {
      background: theme.palette.background.default,
      borderRadius: 0,
      width: 30,
      height: '100%',
      boxShadow: 'none',
      border: `1px solid ${theme.palette.divider}`,
      '&:focus': {
        boxShadow: 'none',
      },
    },
    leftButtonRoot: {
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
    },
    rightButtonRoot: {
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
    },
    buttonContainer: {
      position: 'absolute',
      left: 0,
      zIndex: 2,
      height: '100%',
      '& > div': {
        height: '100%',
      },
    },
    buttonContainerRight: {
      left: 'unset',
      right: 0,
    },
    scrollerRoot: {
      gridTemplateRows: `100%`,
      gap: 6,
      borderRadius: 0,
      padding: '1px 1px',
    },
    scrollerRootTwoItems: {
      gridTemplateColumns: `repeat(2, calc(50% - 20px))`,
    },
  }),
  { name: 'ShippingMethodForm' },
)

export type ShippingMethodFormProps = Pick<UseFormComposeOptions, 'step'> &
  UseStyles<typeof useStyles>

export default function ShippingMethodForm(props: ShippingMethodFormProps) {
  const { step } = props
  const { data: cartQuery } = useCartQuery(GetShippingMethodsDocument)
  const classes = useStyles(props)

  const currentAddress = cartQuery?.cart?.shipping_addresses?.[0]
  const available = currentAddress?.available_shipping_methods
  const selected = currentAddress?.selected_shipping_method
  const carrier = selected?.carrier_code ?? available?.[0]?.carrier_code
  const method = selected?.method_code ?? available?.[0]?.method_code ?? undefined
  const carrierMethod = carrier && method ? `${carrier}-${method}` : undefined

  const sortedAvailableShippingMethods = [
    ...(currentAddress?.available_shipping_methods ?? []),
  ].sort((a, b) => (a === b ? 0 : a ? -1 : 1))

  const form = useFormGqlMutationCart<
    ShippingMethodFormMutation,
    ShippingMethodFormMutationVariables & { carrierMethod?: string }
  >(ShippingMethodFormDocument, {
    defaultValues: { carrierMethod, carrier, method },
    mode: 'onChange',
  })

  const { handleSubmit, control, setValue, register, required, error } = form
  const submit = handleSubmit(() => {})
  useFormCompose({ form, step, submit, key: 'ShippingMethodForm' })

  return (
    <Form onSubmit={submit} noValidate>
      <input type='hidden' {...register('carrier', { required: required.carrier })} />
      <input type='hidden' {...register('method', { required: required.method })} />

      <FormRow className={classes.root}>
        <ScrollerProvider scrollSnapAlign='center'>
          <m.div className={classes.buttonContainer}>
            <ScrollerButton
              direction='left'
              classes={{
                root: clsx(classes.buttonRoot, classes.leftButtonRoot),
              }}
            >
              <SvgImageSimple
                src={iconChevronLeft}
                alt='chevron left'
                size='small'
                loading='eager'
              />
            </ScrollerButton>
          </m.div>

          <FormControl>
            <Controller
              defaultValue={carrierMethod}
              control={control}
              name='carrierMethod'
              rules={{ required: 'Please select a shipping method' }}
              render={({ field: { onChange, value, onBlur }, fieldState: { invalid } }) => (
                <>
                  <Scroller
                    className={clsx(
                      classes.scrollerRoot,
                      sortedAvailableShippingMethods.length <= 2 && classes.scrollerRootTwoItems,
                    )}
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
                        Please fill in your address to see shipping methods
                      </AvailableShippingMethod>
                    )}
                  </Scroller>

                  {invalid && currentAddress?.available_shipping_methods && (
                    <Alert classes={{ root: classes.alert }} severity='error'>
                      Please select a shipping method
                    </Alert>
                  )}
                </>
              )}
            />
          </FormControl>

          <m.div className={clsx(classes.buttonContainer, classes.buttonContainerRight)}>
            <ScrollerButton
              direction='right'
              classes={{
                root: clsx(classes.buttonRoot, classes.rightButtonRoot),
              }}
            >
              <SvgImageSimple
                src={iconChevronRight}
                alt='chevron right'
                size='small'
                loading='eager'
              />
            </ScrollerButton>
          </m.div>
        </ScrollerProvider>
      </FormRow>

      <ApolloCartErrorAlert error={error} />
    </Form>
  )
}
