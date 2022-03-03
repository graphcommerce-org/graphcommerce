import { iconChevronDown, iconChevronUp, IconSvg } from '@graphcommerce/next-ui'
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  darken,
  SxProps,
  Theme,
} from '@mui/material'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import type { FileOrFolderNode, FileNode } from '../../lib/files'

function FileLink(props: FileNode & { level: number; selected: string }) {
  const { matter, url, name, level, selected } = props
  const indent = Math.max(0, level + 1) * 2

  const active = selected === `/${url}`

  return (
    <NextLink href={`/${url}`} passHref>
      <ListItemButton
        component='a'
        sx={{
          pl: indent,
          borderRadius: 2,
          '&.Mui-selected': { color: (theme) => darken(theme.palette.primary.main, 0.01) },
        }}
        selected={active}
        dense
      >
        <ListItemText>{matter.menu ?? name}</ListItemText>
      </ListItemButton>
    </NextLink>
  )
}

function isSelected(node: FileOrFolderNode, asPath: string): boolean {
  const p = asPath.split('?')[0]
  const { type, childNodes } = node

  if (type === 'file' && p === `/${node.url}`) return true

  return childNodes?.some((child) => isSelected(child, p)) ?? false
}

export function MenuList(props: FileOrFolderNode & { level?: number; selected: string }) {
  const { name, childNodes, type, level = 0, selected } = props

  const [open, setOpen] = React.useState(isSelected(props, selected))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setOpen(isSelected(props, selected)), [selected])

  const handleClick = () => setOpen(!open)

  const indent = Math.max(0, level + 1) * 2

  const hasChildren = childNodes && childNodes.length

  if (hasChildren) {
    return (
      <>
        <ListItemButton onClick={handleClick} sx={{ pl: indent, borderRadius: 2 }} dense>
          <ListItemText>{name}</ListItemText>
          {open ? <IconSvg src={iconChevronUp} /> : <IconSvg src={iconChevronDown} />}
        </ListItemButton>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {type === 'file' && <FileLink {...props} level={level + 1} />}
            {childNodes?.map((child) => (
              <MenuList key={child.name} {...child} level={level + 1} selected={selected} />
            ))}
          </List>
        </Collapse>
      </>
    )
  }

  if (type === 'file') {
    return <FileLink {...props} level={level} />
  }

  return null
}

export default function SidebarMenu(props: FileNode & { sx?: SxProps<Theme>; selected: string }) {
  const { childNodes, type, sx, selected, ...link } = props

  return (
    <List component='nav' disablePadding sx={sx}>
      <FileLink type={type} {...link} level={0} selected={selected} />
      {childNodes?.map((tree) => (
        <MenuList key={tree.path} {...tree} selected={selected} />
      ))}
    </List>
  )
}
