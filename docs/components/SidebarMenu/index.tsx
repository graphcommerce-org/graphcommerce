import { iconChevronDown, iconChevronUp, SvgIcon } from '@graphcommerce/next-ui'
import { Box, Collapse, List, ListItemButton, ListItemText } from '@mui/material'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import type { FileOrFolderNode, FileNode } from '../../lib/files'

function FileLink(props: FileNode & { level: number }) {
  const { matter, url, name, level } = props
  const indent = Math.max(0, level + 1) * 2

  const active = useRouter().asPath === `/${url}`

  return (
    <NextLink href={`/${url}`} passHref>
      <ListItemButton component='a' sx={{ pl: indent, borderRadius: 2 }} selected={active} dense>
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

function useIsSelected() {
  const { asPath } = useRouter()
  return (node: FileOrFolderNode) => isSelected(node, asPath)
}

export function MenuList(props: FileOrFolderNode & { level?: number }) {
  const { name, childNodes, type, level = 0 } = props
  const router = useRouter()
  const checkSelected = useIsSelected()

  const [open, setOpen] = React.useState(checkSelected(props))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setOpen(checkSelected(props)), [router.asPath])

  const handleClick = () => setOpen(!open)

  const indent = Math.max(0, level + 1) * 2

  const hasChildren = childNodes && childNodes.length

  if (hasChildren) {
    return (
      <>
        <ListItemButton onClick={handleClick} sx={{ pl: indent, borderRadius: 2 }} dense>
          <ListItemText>{name}</ListItemText>
          {open ? <SvgIcon src={iconChevronUp} /> : <SvgIcon src={iconChevronDown} />}
        </ListItemButton>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {type === 'file' && <FileLink {...props} level={level + 1} />}
            {childNodes?.map((child) => (
              <MenuList key={child.name} {...child} level={level + 1} />
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

export default function SidebarMenu(props: FileNode) {
  const { childNodes, type, ...link } = props

  return (
    <Box
      sx={{
        padding: 2,
        borderRight: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <List component='nav' disablePadding sx={{}}>
        <FileLink type={type} {...link} level={0} />
        {childNodes?.map((tree) => (
          <MenuList key={tree.path} {...tree} />
        ))}
      </List>
    </Box>
  )
}
