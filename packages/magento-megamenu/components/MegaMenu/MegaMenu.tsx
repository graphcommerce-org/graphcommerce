import { IconSvg, iconChevronRight } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, Collapse, Button, List, ListItem, ListItemText, SxProps, Theme } from '@mui/material'
import PageLink from 'next/link'
import React, { useEffect } from 'react'
import { MegaMenuItemFragment } from '../../queries/MegaMenuItem.gql'
import { MegaMenuQueryFragment } from '../../queries/MegaMenuQueryFragment.gql'

const listStyles: SxProps<Theme> = (theme) => ({
  display: 'grid',
  gridAutoFlow: 'column',
})

const buttonStyle: SxProps<Theme> = (theme) => ({
  minWidth: 200,
  justifyContent: 'space-between',
  borderRadius: 0,
})

function isSelected(node: Omit<MegaMenuItemFragment, 'uid'>): boolean {
  const { children, url_path } = node
  return false
}

export function MenuList(
  props: Omit<MegaMenuItemFragment, 'uid'> & { level?: number; selected: string },
) {
  const { name, children, url_path, level = 0, selected } = props
  const [open, setOpen] = React.useState(isSelected(props, selected))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setOpen(isSelected(props, selected)), [selected])
  const handleClick = () => setOpen(!open)
  const indent = Math.max(0, level + 1) * 2
  const hasChildren = children && children.length > 0

  if (hasChildren) {
    return (
      <ListItem onClick={handleClick} component='li' sx={{ display: 'contents' }}>
        <Box sx={{ gridColumnStart: level + 1 }}>
          <PageLink href={url_path} passHref>
            <Button variant='text' sx={buttonStyle} size='large'>
              {name}
              {open ? <IconSvg src={iconChevronRight} /> : <IconSvg src={iconChevronRight} />}
            </Button>
          </PageLink>
        </Box>
        {url_path === 'men' ||
        url_path === 'men/photography' ||
        url_path === 'men/photography/sunrise' ? (
          <List component='ul' sx={{ display: 'contents' }}>
            {/* <FileLink {...props} level={level + 1} /> */}

            {children?.map((child) => (
              <MenuList {...child} level={level + 1} selected={selected} />
            ))}
          </List>
        ) : (
          ''
        )}
      </ListItem>
    )
  }

  if (!hasChildren) {
    return (
      <ListItem sx={{ gridColumnStart: level + 1, padding: 0 }} component='li'>
        <PageLink href={url_path} passHref>
          <Button variant='text' sx={buttonStyle} size='large'>
            {name}
          </Button>
        </PageLink>
      </ListItem>
    )
  }

  return null
}

export function MegaMenu(props: MegaMenuQueryFragment & { sx?: SxProps<Theme>; selected: string }) {
  const { menu, sx, selected, ...link } = props
  if (!menu) return false
  const includedMenu = menu.items?.filter((item) => item?.include_in_menu === 1)

  return (
    <Box component='nav' id='main-nav' aria-label='Main'>
      <List disablePadding sx={listStyles}>
        {includedMenu?.map((tree) => (
          <MenuList key={tree?.url_path} {...tree} selected={selected} />
        ))}
      </List>
    </Box>
  )
}
