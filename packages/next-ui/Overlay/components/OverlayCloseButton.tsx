import { useGo, usePageContext } from '@graphcommerce/framer-next-pages'
import { i18n } from '@lingui/core'
import { useState } from 'react'
import { Button, type ButtonProps } from '../../Button'

export function OverlayCloseButton(props: ButtonProps) {
  const { disabled, ...buttonProps } = props
  const { closeSteps } = usePageContext()
  const [isDisabled, setIsDisabled] = useState(disabled)
  const go = useGo(closeSteps * -1)

  const onClick = () => {
    setIsDisabled(true)
    go()
  }

  return (
    <Button
      onClick={onClick}
      disabled={isDisabled}
      aria-label={i18n._(/* i18n */ 'Close overlay')}
      {...buttonProps}
    />
  )
}
