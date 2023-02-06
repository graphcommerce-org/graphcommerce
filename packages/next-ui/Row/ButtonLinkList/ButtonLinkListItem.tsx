import { ListItemButtonProps, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { IconSvg } from '../../IconSvg'
import { NextLink } from '../../Theme'
import { iconChevronRight } from '../../icons'

export type ButtonLinkListItemProps = {
  endIcon?: React.ReactNode
  url: string
} & Omit<ListItemButtonProps<typeof NextLink>, 'href'>

export function ButtonLinkListItem(props: ButtonLinkListItemProps) {
  const {
    children,
    url,
    endIcon = <IconSvg src={iconChevronRight} />,
    ...listItemButtonProps
  } = props

  return (
    <ListItemButton
      component={NextLink}
      href={url}
      sx={(theme) => ({
        padding: `${theme.spacings.xxs} 0`,
        borderBottom: `1px solid ${theme.palette.divider}`,
        justifyContent: 'space-between',
      })}
      {...listItemButtonProps}
    >
      <ListItemText>{children}</ListItemText>
      <ListItemIcon>{endIcon}</ListItemIcon>
    </ListItemButton>
  )
}
