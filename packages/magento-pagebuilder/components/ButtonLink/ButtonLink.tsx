/* eslint-disable import/no-extraneous-dependencies */
import { productLink } from '@graphcommerce/magento-product'
import { Button, ButtonProps, SxProps, Theme } from '@mui/material'
import { ButtonLinkProps } from './getButtonLinkProps'
import { useQuery } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'

type ButtonLinkComponentProps = ButtonLinkProps & {
  sx?: SxProps<Theme>
}

function isButton(props: any): props is ButtonLinkComponentProps {
  return (props as ButtonLinkComponentProps)?.link !== undefined
}

export function ButtonLink(props: ButtonLinkComponentProps) {
  // if (!isButton(props)) return null

  const { buttonType, link, openInNewTab = false, buttonText, linkType, sx } = props

  const linkBase = useQuery(StoreConfigDocument).data?.storeConfig?.secure_base_link_url

  const buttonProps: ButtonProps<'a'> = {
    variant: buttonType === 'link' ? 'text' : 'pill',
    color: buttonType === 'primary' ? 'primary' : 'secondary',
  }

  if (!link) return null

  const relativeUrl = linkBase ? link.replace(linkBase, '').trim() : link

  return (
    <Button
      href={linkType === 'product' ? productLink({ url_key: relativeUrl }) : relativeUrl}
      sx={sx}
      {...buttonProps}
      target={openInNewTab ? '_blank' : undefined}
    >
      {buttonText}
    </Button>
  )
}
