import type { ButtonProps } from '@graphcommerce/next-ui'
import { iconChevronRight, IconSvg, Button } from '@graphcommerce/next-ui'
import type { ComposedSubmitRenderComponentProps } from '@graphcommerce/react-hook-form'
import { forwardRef } from 'react'

type ComposedSubmitButtonProps = ComposedSubmitRenderComponentProps &
  Omit<ButtonProps, 'loading' | 'onSubmit'>

/** Makes a ComposedSubmitRenderComponent rendered as a LinkOrButton */
export const ComposedSubmitButton = forwardRef<HTMLButtonElement, ComposedSubmitButtonProps>(
  (props, ref) => {
    const { buttonState, submit, error, children, onClick, ...otherProps } = props
    const loading =
      buttonState.isSubmitting || (buttonState.isSubmitSuccessful && !error) ? true : undefined

    return (
      <Button
        ref={ref}
        color='secondary'
        variant='pill'
        endIcon={<IconSvg src={iconChevronRight} />}
        type='submit'
        {...otherProps}
        loading={loading}
        onClick={(e) => {
          onClick?.(e)
          return submit()
        }}
      >
        {children}
      </Button>
    )
  },
)
