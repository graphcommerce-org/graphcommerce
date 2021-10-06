import { Scroller, ScrollerButton, ScrollerProvider } from '@graphcommerce/framer-scroller'
import {
  Form,
  FormRow,
  iconChevronLeft,
  iconChevronRight,
  responsiveVal,
  SvgImage,
  ToggleButton,
} from '@graphcommerce/next-ui'
import {
  Controller,
  useForm,
  useFormCompose,
  UseFormComposeOptions,
  useFormPersist,
} from '@graphcommerce/react-hook-form'
import { FormControl, FormHelperText, makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import { m } from 'framer-motion'
import React, { useEffect } from 'react'
import { usePaymentMethodContext } from '../PaymentMethodContext/PaymentMethodContext'

export type PaymentMethodTogglesProps = Pick<UseFormComposeOptions, 'step'>

// function Content(props: PaymentMethod) {
//   const { code } = props
//   const { modules } = usePaymentMethodContext()
//   const Component = modules[code]?.PaymentToggle ?? ((p: PaymentToggleProps) => <>{p.title}</>)
//   return <Component {...props} />
// }

const useStyles = makeStyles(
  (theme: Theme) => ({
    formRoot: {
      padding: '5px 0',
    },
    root: {
      position: 'relative',
      padding: 0,
    },
    toggleGroup: {
      display: 'inline-flex',
      gap: 10,
    },
    buttonRoot: {
      background: theme.palette.background.default,
      borderRadius: 0,
      width: 30,
      height: responsiveVal(60, 85),
      boxShadow: 'none',
      border: '1px solid #eee',
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
    scrollerRoot: {
      display: `grid`,
      gridAutoFlow: `column`,
      gridTemplateColumns: `repeat(30, max-content)`,
      gridTemplateRows: `100%`,
      gap: responsiveVal(4, 8),
      height: responsiveVal(60, 85),
      borderRadius: 5,
    },
    toggleButton: {
      ...theme.typography.h5,
      border: '1px solid #eee',
      borderRadius: 4,
      boxShadow: 'none',
      transition: 'color .15s ease',
      whiteSpace: 'nowrap',
      fontSize: responsiveVal(14, 20),
      [theme.breakpoints.up('sm')]: {
        fontSize: responsiveVal(17, 20),
      },
    },
    toggleButtonSelected: {
      border: `1px solid ${theme.palette.secondary.main}`,
      background: `${theme.palette.secondary.main}`,
      color: `${theme.palette.secondary.contrastText}`,
      '&:hover': {
        background: `${theme.palette.secondary.main}`,
      },
    },
    buttonContainer: {
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: 2,
      height: '100%',
    },
    buttonContainerRight: {
      left: 'unset',
      right: 0,
    },
  }),
  { name: 'PaymentMethodToggles' },
)

export default function PaymentMethodToggles(props: PaymentMethodTogglesProps) {
  const { step } = props
  const { methods, selectedMethod, setSelectedMethod, setSelectedModule, modules } =
    usePaymentMethodContext()

  const classes = useStyles()

  const form = useForm<{ code: string; paymentMethod?: string }>({
    mode: 'onChange',
    defaultValues: { code: selectedMethod?.code },
  })
  useFormPersist({ form, name: 'PaymentMethodToggle' })

  const { control, handleSubmit, watch, register, setValue, formState } = form

  const submitHandler = handleSubmit(() => {})

  useFormCompose({ form, step, submit: submitHandler, key: 'PaymentMethodToggles' })

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

  if (!methods || methods.length < 1) return <></>

  const sortedMethods = [...methods].sort((a, b) =>
    !modules?.[a?.code] ? 0 : !modules?.[b?.code] ? -1 : 1,
  )

  return (
    <Form onSubmit={submitHandler} noValidate classes={{ root: classes.formRoot }}>
      <input type='hidden' {...register('code', { required: true })} required />
      <FormRow className={classes.root}>
        <ScrollerProvider scrollSnapAlign='center'>
          <m.div className={classes.buttonContainer}>
            <ScrollerButton
              direction='left'
              classes={{
                root: clsx(classes.buttonRoot, classes.leftButtonRoot),
              }}
            >
              <SvgImage src={iconChevronLeft} alt='chevron left' size='small' loading='eager' />
            </ScrollerButton>
          </m.div>

          <FormControl>
            <Controller
              defaultValue=''
              control={control}
              name='paymentMethod'
              rules={{ required: 'Please select a payment method' }}
              render={({ field: { onChange, value, name, ref, onBlur } }) => (
                <Scroller className={classes.scrollerRoot} hideScrollbar tabIndex={0}>
                  {sortedMethods?.map((pm) => {
                    const buttonValue = `${pm.code}___${pm.child}`
                    return (
                      <ToggleButton
                        name={name}
                        aria-label={`payment_method_${pm.code}___${pm.child}`}
                        key={buttonValue}
                        value={buttonValue}
                        color='secondary'
                        disabled={!modules?.[pm.code]}
                        classes={{
                          root: classes.toggleButton,
                          selected: classes.toggleButtonSelected,
                        }}
                        onChange={(_, v: string) => {
                          onChange(v)
                          setValue('code', v)
                        }}
                        onBlur={onBlur}
                        selected={value === buttonValue}
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

          <m.div className={clsx(classes.buttonContainer, classes.buttonContainerRight)}>
            <ScrollerButton
              direction='right'
              classes={{
                root: clsx(classes.buttonRoot, classes.rightButtonRoot),
              }}
            >
              <SvgImage src={iconChevronRight} alt='chevron right' size='small' loading='eager' />
            </ScrollerButton>
          </m.div>
        </ScrollerProvider>
      </FormRow>
    </Form>
  )
}
