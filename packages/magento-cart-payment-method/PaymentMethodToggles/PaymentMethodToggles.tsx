import { Scroller, ScrollerButton, ScrollerProvider } from '@graphcommerce/framer-scroller'
import {
  Form,
  FormRow,
  iconChevronLeft,
  iconChevronRight,
  responsiveVal,
  IconSvg,
  ToggleButton,
  extendableComponent,
} from '@graphcommerce/next-ui'
import {
  Controller,
  FormPersist,
  useForm,
  useFormCompose,
  UseFormComposeOptions,
} from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { Box, FormControl, FormHelperText, SxProps, Theme } from '@mui/material'
import { useEffect } from 'react'
import { usePaymentMethodContext } from '../PaymentMethodContext/paymentMethodContextType'
import { useCartLock } from '../hooks/useCartLock'

export type PaymentMethodTogglesProps = Pick<UseFormComposeOptions, 'step'> & {
  sx?: SxProps<Theme>
}

const cmpName = 'PaymentMethodToggles' as const
const parts = [
  'formRoot',
  'root',
  'buttonRoot',
  'leftButtonRoot',
  'rightButtonRoot',
  'scrollerRoot',
  'toggleButton',
  'toggleButtonSelected',
  'buttonContainer',
  'buttonContainerRight',
] as const
const { classes } = extendableComponent(cmpName, parts)

export function PaymentMethodToggles(props: PaymentMethodTogglesProps) {
  const { step, sx = [] } = props
  const { methods, selectedMethod, setSelectedMethod, setSelectedModule, modules } =
    usePaymentMethodContext()

  const [lockState] = useCartLock()
  const form = useForm<{ code: string | null; paymentMethod?: string }>({
    defaultValues: { code: lockState.method },
  })

  const { control, handleSubmit, watch, register, setValue, formState } = form

  const submitHandler = handleSubmit(() => {})

  useFormCompose({ form, step, submit: submitHandler, key: 'PaymentMethodToggles' })

  useEffect(() => {
    if (selectedMethod?.code) setValue('code', selectedMethod.code)
  }, [selectedMethod?.code, setValue])

  const paymentMethod = watch('paymentMethod')
  useEffect(() => {
    const [code, child] = paymentMethod?.split('___') ?? ['']
    if (code === selectedMethod?.code) return

    const foundMethod = methods.find(
      (method) => method.code === code && (!child || method.child === child),
    )
    if (foundMethod && !modules?.[foundMethod?.code ?? '']) {
      console.error(`No PaymentModule found for method ${foundMethod.code}`)
    }
    setSelectedMethod(foundMethod)
    setSelectedModule(modules?.[foundMethod?.code ?? ''])
  }, [methods, modules, paymentMethod, selectedMethod?.code, setSelectedMethod, setSelectedModule])

  if (!methods || methods.length < 1) return null

  return (
    <Form
      onSubmit={submitHandler}
      noValidate
      className={classes.formRoot}
      sx={[
        {
          padding: '5px 0',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <input type='hidden' {...register('code', { required: true })} required />
      <FormRow className={classes.root} sx={{ position: 'relative', padding: 0 }}>
        <ScrollerProvider scrollSnapAlign='center'>
          <Box
            className={classes.buttonContainer}
            sx={{ position: 'absolute', left: 0, top: 0, zIndex: 2, height: '100%' }}
          >
            <ScrollerButton
              direction='left'
              className={(classes.buttonRoot, classes.leftButtonRoot)}
              sx={(theme) => ({
                background: theme.palette.background.paper,
                borderRadius: 0,
                width: 30,
                height: responsiveVal(60, 85),
                boxShadow: 'none',
                border: `1px solid ${theme.palette.divider}`,
                '&:focus': {
                  boxShadow: 'none',
                },
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
              })}
            >
              <IconSvg src={iconChevronLeft} size='small' />
            </ScrollerButton>
          </Box>

          <FormControl>
            <Controller
              defaultValue=''
              control={control}
              name='paymentMethod'
              rules={{ required: i18n._(/* i18n */ 'Please select a payment method') }}
              render={({ field: { onChange, value, name, onBlur } }) => (
                <Scroller
                  className={classes.scrollerRoot}
                  hideScrollbar
                  tabIndex={0}
                  sx={{
                    gridAutoColumns: `max-content`,
                    gridTemplateRows: `100%`,
                    gap: responsiveVal(4, 8),
                    height: responsiveVal(60, 85),
                    borderRadius: '5px',
                  }}
                >
                  {methods?.map((pm) => {
                    const buttonValue = pm.child ? `${pm.code}___${pm.child}` : pm.code

                    if (process.env.NODE_ENV === 'production' && !modules?.[pm.code]) return null

                    return (
                      <ToggleButton
                        name={name}
                        aria-label={pm.title}
                        key={buttonValue}
                        value={buttonValue}
                        color='secondary'
                        disabled={!modules?.[pm.code]}
                        className={classes.toggleButton}
                        onChange={(_, v: string) => {
                          onChange(v)
                          setValue('code', v)
                        }}
                        onBlur={onBlur}
                        selected={value === buttonValue}
                        sx={(theme) => ({
                          typography: 'h6',
                          border: `1px solid ${theme.palette.divider}`,
                          boxShadow: 'none',
                          transition: 'color .15s ease',
                          whiteSpace: 'nowrap',
                          '&.selected': {
                            border: `1px solid ${theme.palette.secondary.main}`,
                            background: `${theme.palette.secondary.main}`,
                            color: `${theme.palette.secondary.contrastText}`,
                            '&:hover': {
                              background: `${theme.palette.secondary.main}`,
                            },
                          },
                        })}
                      >
                        {!modules?.[pm.code] ? <>{pm.code}</> : <>{pm.title}</>}
                      </ToggleButton>
                    )
                  })}
                </Scroller>
              )}
            />

            {formState.errors.paymentMethod?.message && (
              <FormHelperText id='my-helper-text' error>
                {formState.errors.paymentMethod.message}
              </FormHelperText>
            )}
          </FormControl>

          <Box
            className={`${classes.buttonContainer} ${classes.buttonContainerRight}`}
            sx={{ position: 'absolute', right: 0, top: 0, zIndex: 2, height: '100%' }}
          >
            <ScrollerButton
              direction='right'
              className={`${classes.buttonRoot} ${classes.rightButtonRoot}`}
              sx={(theme) => ({
                background: theme.palette.background.paper,
                borderRadius: 0,
                width: 30,
                height: responsiveVal(60, 85),
                boxShadow: 'none',
                border: `1px solid ${theme.palette.divider}`,
                '&:focus': {
                  boxShadow: 'none',
                },
                borderTopRightRadius: 4,
                borderBottomRightRadius: 4,
              })}
            >
              <IconSvg src={iconChevronRight} size='small' />
            </ScrollerButton>
          </Box>
        </ScrollerProvider>
      </FormRow>
      <FormPersist form={form} name='PaymentMethodToggles' />
    </Form>
  )
}
