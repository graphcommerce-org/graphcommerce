import { ListItemButtonProps, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import PageLink from 'next/link'
import React from 'react'
import { IconSvg } from '../../IconSvg'
import { iconChevronRight } from '../../icons'

export type ButtonLinkListItemProps = {
  url: string
  endIcon?: React.ReactNode
} & Omit<ListItemButtonProps<typeof PageLink>, 'href'>

export function ButtonLinkListItem(props: ButtonLinkListItemProps) {
  const {
    children,
    url,
    endIcon = <IconSvg src={iconChevronRight} />,
    ...ButtonLinkListItemProps
  } = props

  return (
    <ListItemButton
      component={PageLink}
      href={url}
      sx={(theme) => ({
        padding: `${theme.spacings.xxs} 0`,
        borderBottom: `1px solid ${theme.palette.divider}`,
        justifyContent: 'space-between',
      })}
      {...ButtonLinkListItemProps}
    >
      <ListItemText>{children}</ListItemText>
      <ListItemIcon>{endIcon}</ListItemIcon>
    </ListItemButton>
  )
}
