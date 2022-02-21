import { iconChevronDown, iconChevronUp, SvgIcon } from '@graphcommerce/next-ui'
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import type { FileOrFolderNode, FileNode } from '../../lib/files'

function FileLink(props: FileNode & { level: number }) {
  const { matter, url, name, level, childNodes } = props
  const indent = Math.max(0, level + 1) * 2

  const active = useRouter().asPath === `/${url}`
  const hasChildren = !!childNodes && childNodes.length

  return (
    <NextLink href={`/${url}`} passHref>
      <ListItemButton component='a' sx={{ pl: indent }} selected={active}>
        <ListItemText>{matter.menu ?? name}</ListItemText>
        {hasChildren && !active && <SvgIcon src={iconChevronDown} />}
      </ListItemButton>
    </NextLink>
  )
}

export function MenuList(props: FileOrFolderNode & { level?: number }) {
  const { name, childNodes, type, level = 0, matter } = props
  const router = useRouter()

  const childActive = !!childNodes?.some((child) =>
    child.type === 'file' ? router.asPath.startsWith(`/${child.url}`) : false,
  )
  const [open, setOpen] = React.useState(childActive)

  useEffect(() => {
    setOpen(
      !!childNodes?.some((child) =>
        child.type === 'file' ? router.asPath.startsWith(`/${child.url}`) : false,
      ),
    )
  }, [childNodes, router.asPath])

  const handleClick = () => setOpen(!open)

  const indent = Math.max(0, level + 1) * 2

  const hasChildren = childNodes && childNodes.length

  if (type === 'file') {
    const active = !!router.asPath.startsWith(`/${props.url}`) && hasChildren

    return (
      <>
        <FileLink {...props} level={level} />
        <Collapse in={active} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {childNodes?.map((child) => (
              <MenuList key={child.name} {...child} level={level + 1} />
            ))}
          </List>
        </Collapse>
      </>
    )
  }

  return (
    <>
      <ListItemButton onClick={handleClick} sx={{ pl: indent }}>
        <ListItemText>{matter?.menu ?? name}</ListItemText>
        {open ? <SvgIcon src={iconChevronUp} /> : <SvgIcon src={iconChevronDown} />}
      </ListItemButton>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {childNodes?.map((child) => (
            <MenuList key={child.name} {...child} level={level + 1} />
          ))}
        </List>
      </Collapse>
    </>
  )
}

export default function SidebarMenu(props: FileNode) {
  const { childNodes, type, ...link } = props

  return (
    <List component='nav' disablePadding>
      <FileLink type={type} {...link} level={0} />
      {childNodes?.map((tree) => (
        <MenuList key={tree.path} {...tree} />
      ))}
    </List>
  )
}
