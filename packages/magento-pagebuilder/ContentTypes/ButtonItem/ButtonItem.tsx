/* eslint-disable import/no-extraneous-dependencies */
import { productLink } from '@graphcommerce/magento-product'
import { Button, ButtonProps } from '@mui/material'
import { extractAdvancedProps } from '../../utils'
import { ButtonItemContentType } from './types'
import { useQuery } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'

/**
 * Page Builder ButtonItem component.
 *
 * This component is part of the Page Builder / PWA integration. It can be consumed without Page
 * Builder.
 */
export const ButtonItem: ButtonItemContentType['component'] = (props) => {
  const [cssProps, cssClasses, additional] = extractAdvancedProps(props)

  const linkBase = useQuery(StoreConfigDocument).data?.storeConfig?.secure_base_link_url

  const { buttonType, link, openInNewTab = false, buttonText, linkType } = additional

  const buttonProps: ButtonProps<'a'> = {
    // onClick: handleClick,
    variant: buttonType === 'link' ? 'text' : 'pill',
    color: buttonType === 'primary' ? 'primary' : 'secondary',
  }

  if (!link) return null

  const relativeUrl = linkBase ? link.replace(linkBase, '').trim() : link

  return (
    <Button
      href={linkType === 'product' ? productLink({ url_key: relativeUrl }) : relativeUrl}
      // sx={sx}
      {...buttonProps}
      target={openInNewTab ? '_blank' : undefined}
    >
      {buttonText}
    </Button>
  )
}
