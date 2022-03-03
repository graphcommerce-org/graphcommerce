import { iconChevronRight, LinkOrButton, LinkOrButtonProps, IconSvg } from '@graphcommerce/next-ui'
import { ComposedSubmitRenderComponentProps } from '@graphcommerce/react-hook-form'
import { forwardRef } from 'react'

type ComposedLinkOrButtonProps = ComposedSubmitRenderComponentProps &
  Omit<LinkOrButtonProps, 'loading'>

/** Makes a ComposedSubmitRenderComponent rendered as a LinkOrButton */
export const ComposedSubmitLinkOrButton = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  ComposedLinkOrButtonProps
>(({ buttonState, submit, error, children, button, ...otherProps }, ref) => {
  const loading =
    buttonState.isSubmitting || (buttonState.isSubmitSuccessful && !error) ? true : undefined
  return (
    <LinkOrButton
      ref={ref}
      button={{
        variant: 'pill',
        endIcon: <IconSvg src={iconChevronRight} />,
        ...button,
        type: 'submit',
      }}
      loading={loading}
      color='secondary'
      onClick={submit}
      {...otherProps}
    >
      {children}
    </LinkOrButton>
  )
})
