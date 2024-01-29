/* eslint-disable import/no-extraneous-dependencies */
import { productLink } from '@graphcommerce/magento-product'
import { Button, ButtonProps } from '@mui/material'
import { extractAdvancedProps } from '../../utils'
import { ButtonItemContentType } from './types'

/**
 * Page Builder ButtonItem component.
 *
 * This component is part of the Page Builder / PWA integration. It can be consumed without Page
 * Builder.
 */
export const ButtonItem: ButtonItemContentType['component'] = (props) => {
  const [cssProps, cssClasses, additional] = extractAdvancedProps(props)

  const { buttonType, link, openInNewTab = false, buttonText, linkType } = additional

  const buttonProps: ButtonProps<'a'> = {
    // onClick: handleClick,
    variant: buttonType === 'link' ? 'text' : 'pill',
    color: buttonType === 'primary' ? 'primary' : 'secondary',
  }

  if (!link) return null

  return (
    <Button
      href={linkType === 'product' ? productLink({ url_key: link }) : link}
      // sx={sx}
      {...buttonProps}
      target={openInNewTab ? '_blank' : undefined}
    >
      {buttonText}
    </Button>
  )
}
