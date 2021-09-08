import { FormControl, makeStyles, Theme } from '@material-ui/core'
import { Scroller, ScrollerButton, ScrollerProvider } from '@reachdigital/framer-scroller'
import {
  Form,
  FormRow,
  iconChevronLeft,
  iconChevronRight,
  responsiveVal,
  SvgImage,
  ToggleButton,
  ToggleButtonGroup,
} from '@reachdigital/next-ui'
import { Controller, useForm, useFormPersist } from '@reachdigital/react-hook-form'
import clsx from 'clsx'
import { m } from 'framer-motion'
import React, { useEffect, useRef } from 'react'
import { PaymentMethod, PaymentToggleProps } from '../Api/PaymentMethod'
import { usePaymentMethodContext } from '../PaymentMethodContext/PaymentMethodContext'

export type PaymentMethodToggleProps = Record<string, unknown>

function Content(props: PaymentMethod) {
  const { code } = props
  const { modules } = usePaymentMethodContext()
  const Component = modules[code]?.PaymentToggle ?? ((p: PaymentToggleProps) => <>{p.title}</>)
  return <Component {...props} />
}

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
      borderTopLeftRadius: 6,
      borderBottomLeftRadius: 6,
    },
    rightButtonRoot: {
      borderTopRightRadius: 6,
      borderBottomRightRadius: 6,
    },
    scrollerRoot: {
      display: `grid`,
      gridAutoFlow: `column`,
      gridTemplateColumns: `repeat(100, 32.5%)`,
      gridTemplateRows: `100%`,
      rowGap: 10,
      columnGap: 10,
      height: responsiveVal(60, 85),
    },
    toggleButton: {
      border: '1px solid #eee',
      borderRadius: 6,
      boxShadow: 'none',
      ...theme.typography.h5,
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
  { name: 'PaymentMethodToggle' },
)

export default function PaymentMethodToggle(props: PaymentMethodToggleProps) {
  const { methods, selectedMethod, setSelectedMethod, setSelectedModule, modules } =
    usePaymentMethodContext()

  const classes = useStyles()

  const form = useForm<{ code: string; paymentMethod?: string }>({
    mode: 'onChange',
    defaultValues: { code: selectedMethod?.code },
  })
  useFormPersist({ form, name: 'PaymentMethodToggle' })

  const { control, handleSubmit, watch, register, setValue } = form
  const submitHandler = handleSubmit(() => {})

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

  const groupRef = useRef<HTMLDivElement>(null)

  if (!methods || methods.length < 1) return <></>

  return (
    <Form onSubmit={submitHandler} noValidate classes={{ root: classes.formRoot }}>
      <input type='hidden' {...register('code', { required: true })} required />
      <FormRow className={classes.root}>
        <ScrollerProvider>
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
                <ToggleButtonGroup
                  onChange={(_, val: string) => {
                    onChange(val)
                    setValue('code', val?.split('___')[0])
                  }}
                  defaultValue=''
                  aria-label='Payment Method'
                  onBlur={onBlur}
                  value={value}
                  required
                  exclusive
                  ref={groupRef}
                  className={classes.toggleGroup}
                >
                  <Scroller className={classes.scrollerRoot} hideScrollbar>
                    {methods?.map((pm) => (
                      <ToggleButton
                        key={`${pm.code}___${pm.child}`}
                        value={`${pm.code}___${pm.child}`}
                        color='secondary'
                        disabled={!modules?.[pm.code]}
                        className={classes.toggleButton}
                      >
                        {!modules?.[pm.code] ? <>{pm.code} not implemented</> : <Content {...pm} />}
                      </ToggleButton>
                    ))}
                  </Scroller>
                </ToggleButtonGroup>
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
              <SvgImage src={iconChevronRight} alt='chevron right' size='small' loading='eager' />
            </ScrollerButton>
          </m.div>
        </ScrollerProvider>
      </FormRow>
    </Form>
  )
}
