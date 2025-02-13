import { useQuery } from '@graphcommerce/graphql'
import type { GlobalHeadProps as GlobalHeadPropsBase } from '@graphcommerce/next-ui'
import { GlobalHead as GlobalHeadBase } from '@graphcommerce/next-ui'
import { getImageProps } from 'next/image'
import React from 'react'
import { StoreConfigDocument } from '../../graphql'

export type GlobalHeadProps = Omit<GlobalHeadPropsBase, 'name'> & { disableIcon?: boolean }

export const GlobalHead = React.memo<GlobalHeadProps>((props) => {
  const { children, disableIcon = false } = props
  const name = useQuery(StoreConfigDocument).data?.storeConfig?.website_name ?? ''

  const { head_shortcut_icon, secure_base_media_url } =
    useQuery(StoreConfigDocument).data?.storeConfig ?? {}

  let icon: string | undefined
  if (head_shortcut_icon && secure_base_media_url) {
    icon = getImageProps({
      src: `${secure_base_media_url}favicon/${head_shortcut_icon}`,
      alt: 'favicon',
      width: 16,
      height: 16,
    }).props.src
  }

  return (
    <GlobalHeadBase name={name} {...props}>
      {!disableIcon && (
        <>
          <link rel='icon' href={icon ?? '/favicon.ico'} sizes='any' key='icon' />
          {!icon && <link rel='icon' href='/favicon.svg' type='image/svg+xml' key='icon-svg' />}
        </>
      )}
      {children}
    </GlobalHeadBase>
  )
})
