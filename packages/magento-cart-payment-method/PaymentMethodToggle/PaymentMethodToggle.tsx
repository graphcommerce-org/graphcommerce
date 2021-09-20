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
import React, { useEffect } from 'react'
import { usePaymentMethodContext } from '../PaymentMethodContext/PaymentMethodContext'

export type PaymentMethodToggleProps = Record<string, unknown>

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
      gridTemplateColumns: `repeat(100, 32.5%)`,
      gridTemplateRows: `100%`,
      rowGap: 10,
      columnGap: 10,
      height: responsiveVal(60, 85),
      borderRadius: 5,
    },
    toggleButton: {
      border: '1px solid #eee',
      borderRadius: 4,
      boxShadow: 'none',
      transition: 'color .25s ease',
      ...theme.typography.h5,
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

  const { control, handleSubmit, watch, register, setValue, getValues } = form
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
                <Scroller className={classes.scrollerRoot} hideScrollbar>
                  {methods?.map((pm) => (
                    <ToggleButtonGroup
                      key={`tbg___${pm.code}___${pm.child}`}
                      onChange={(_, val: string[]) => {
                        const v = val[0]

                        onChange(v)
                        setValue('code', v?.split('___')[0])
                      }}
                    >
                      <ToggleButton
                        aria-label={`payment_method_${pm.code}___${pm.child}`}
                        key={`${pm.code}___${pm.child}`}
                        value={`${pm.code}___${pm.child}`}
                        color='secondary'
                        disabled={!modules?.[pm.code]}
                        classes={{
                          root: classes.toggleButton,
                          selected: classes.toggleButtonSelected,
                        }}
                        onBlur={onBlur}
                        selected={getValues().code === pm.code}
                      >
                        {!modules?.[pm.code] ? (
                          <>{pm.code} not implemented</>
                        ) : (
                          /* <Content {...pm} />*/ <>{pm.title}</>
                        )}
                      </ToggleButton>
                    </ToggleButtonGroup>
                  ))}
                </Scroller>
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
