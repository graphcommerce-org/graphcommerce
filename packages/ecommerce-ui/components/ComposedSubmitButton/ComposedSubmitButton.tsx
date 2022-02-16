import {
  iconChevronRight,
  LinkOrButton,
  LinkOrButtonProps,
  SvgIcon,
  Button,
  ButtonProps,
} from '@graphcommerce/next-ui'
import { ComposedSubmitRenderComponentProps } from '@graphcommerce/react-hook-form'
import { forwardRef } from 'react'

type ComposedSubmitButtonProps = ComposedSubmitRenderComponentProps &
  Omit<ButtonProps, 'loading' | 'onSubmit'>

/** Makes a ComposedSubmitRenderComponent rendered as a LinkOrButton */
export const ComposedSubmitButton = forwardRef<HTMLButtonElement, ComposedSubmitButtonProps>(
  ({ buttonState, submit, error, children, ...otherProps }, ref) => {
    const loading =
      buttonState.isSubmitting || (buttonState.isSubmitSuccessful && !error) ? true : undefined

    return (
      <Button
        ref={ref}
        color='secondary'
        variant='pill'
        endIcon={<SvgIcon src={iconChevronRight} />}
        type='submit'
        {...otherProps}
        loading={loading}
        onClick={submit}
      >
        {children}
      </Button>
    )
  },
)
