import { useGo, usePageContext } from '@graphcommerce/framer-next-pages'
import { t } from '@lingui/core/macro'
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
      aria-label={t`Close overlay`}
      {...buttonProps}
    />
  )
}
