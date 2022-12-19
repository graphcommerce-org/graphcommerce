import { ListItemButtonProps, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { IconSvg } from '../../IconSvg'
import { iconChevronRight } from '../../icons'
import { NextLink } from '../../Theme'

export type ButtonLinkListItemProps = {
  url: string
  endIcon?: React.ReactNode
} & ListItemButtonProps<typeof NextLink>

export function ButtonLinkListItem(props: ButtonLinkListItemProps) {
  const {
    children,
    url,
    endIcon = <IconSvg src={iconChevronRight} />,
    ...ButtonLinkListItemProps
  } = props

  return (
    <ListItemButton
      href={url}
      LinkComponent={NextLink}
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
