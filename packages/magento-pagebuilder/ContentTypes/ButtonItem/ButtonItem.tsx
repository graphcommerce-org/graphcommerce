/* eslint-disable import/no-extraneous-dependencies */
import { useApolloClient, useQuery } from '@graphcommerce/graphql'
import { productLink, ProductLinkProps } from '@graphcommerce/magento-product'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { Button, ButtonProps } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { RouteDocument } from '../../Route.gql'
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

  const config = useQuery(StoreConfigDocument).data?.storeConfig
  const client = useApolloClient()
  const { locale, push } = useRouter()

  const { buttonType, link, openInNewTab = false, buttonText, linkType } = additional

  const buttonProps: ButtonProps<'a'> = {
    // onClick: handleClick,
    variant: buttonType === 'link' ? 'text' : 'pill',
    color: buttonType === 'primary' ? 'primary' : 'secondary',
  }

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = async (e) => {
    const { target } = e

    const baseUrl = config?.secure_base_link_url ?? 'x'

    if (!(target instanceof HTMLAnchorElement)) return
    if (!target.href.startsWith(baseUrl)) return
    e.preventDefault()

    const url = target.href.substring(baseUrl.length - 1)

    const res = await client.query({ query: RouteDocument, variables: { url } })

    const route = res.data?.route
    if (!route) {
      console.warn('Route not found', url)
      return
    }

    if (route.type === 'PRODUCT') {
      await push(productLink(route as ProductLinkProps))
    }
  }

  return (
    <Button href={link ?? ''} sx={cssProps} {...buttonProps} onClick={handleClick}>
      {buttonText}
    </Button>
  )
}
