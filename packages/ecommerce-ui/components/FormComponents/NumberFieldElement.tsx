import {
  extendableComponent,
  iconMin,
  iconPlus,
  IconSvg,
  responsiveVal,
} from '@graphcommerce/next-ui'
import { FieldValues } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import {
  IconButton,
  IconButtonProps,
  SxProps,
  useForkRef,
  Theme,
  useEventCallback,
} from '@mui/material'
import { ChangeEvent, Ref, useRef } from 'react'
import { TextFieldElement, TextFieldElementProps } from './TextFieldElement'

export type NumberFieldElementProps<T extends FieldValues = FieldValues> = Omit<
  TextFieldElementProps<T>,
  'type'
> & {
  DownProps?: IconButtonProps
  UpProps?: IconButtonProps
  sx?: SxProps<Theme>
}

type OwnerState = { size?: 'small' | 'medium' }
const name = 'TextInputNumber' as const
const parts = ['quantity', 'quantityInput', 'button'] as const
const { withState } = extendableComponent<OwnerState, typeof name, typeof parts>(name, parts)

export function NumberFieldElement<T extends FieldValues = FieldValues>(
  props: NumberFieldElementProps<T>,
) {
  const {
    DownProps = {},
    UpProps = {},
    inputProps = {},
    inputRef,
    sx = [],
    size = 'medium',
    ...textFieldProps
  } = props

  const classes = withState({ size })
  const ref = useRef<HTMLInputElement>(null)
  const forkRef = useForkRef(ref, inputRef as Ref<HTMLInputElement>)

  return (
    <TextFieldElement
      {...textFieldProps}
      size={size}
      type='number'
      inputRef={forkRef}
      className={`${textFieldProps.className ?? ''} ${classes.quantity}`}
      sx={[{ width: responsiveVal(80, 120) }, ...(Array.isArray(sx) ? sx : [sx])]}
      autoComplete='off'
      InputProps={{
        ...textFieldProps.InputProps,
        startAdornment: (
          <IconButton
            aria-label={i18n._(/* i18n */ 'Decrease')}
            size='medium'
            edge='start'
            onClick={useEventCallback(() => {
              if ((ref.current?.value ?? Infinity) >= inputProps.max) return

              ref.current?.stepUp()
              ref.current?.dispatchEvent(new Event('change', { bubbles: true }))
            })}
            tabIndex={-1}
            color='inherit'
            {...DownProps}
            className={`${classes.button} ${DownProps.className ?? ''}`}
          >
            {DownProps.children ?? <IconSvg src={iconMin} size='small' />}
          </IconButton>
        ),
        endAdornment: (
          <IconButton
            aria-label={i18n._(/* i18n */ 'Increase')}
            size='medium'
            edge='end'
            onClick={useEventCallback(() => {
              if ((ref.current?.value ?? 0) <= inputProps.min) return

              ref.current?.stepDown()
              ref.current?.dispatchEvent(new Event('change', { bubbles: true }))
            })}
            tabIndex={-1}
            color='inherit'
            {...UpProps}
            className={`${classes.button} ${UpProps.className ?? ''}`}
          >
            {UpProps.children ?? <IconSvg src={iconPlus} size='small' />}
          </IconButton>
        ),
      }}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        if (textFieldProps.onChange) textFieldProps.onChange(e)
      }}
      inputProps={{
        ...inputProps,
        'aria-label': i18n._(/* i18n */ 'Number'),
        sx: [
          {
            textAlign: 'center',
            '&::-webkit-inner-spin-button,&::-webkit-outer-spin-button': {
              appearance: 'none',
            },
          },
        ],
        className: `${inputProps?.className ?? ''} ${classes.quantityInput}`,
      }}
    />
  )
}
