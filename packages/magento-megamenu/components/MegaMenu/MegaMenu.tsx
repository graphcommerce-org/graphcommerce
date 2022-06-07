import { IconSvg, iconChevronRight } from '@graphcommerce/next-ui'
import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  SxProps,
  Theme,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { MegaMenuItemFragment } from '../../queries/MegaMenuItem.gql'
import { MegaMenuQueryFragment } from '../../queries/MegaMenuQueryFragment.gql'
import { MegaMenuItem } from './MegaMenuItem'

const buttonStyle: SxProps<Theme> = () => ({
  minWidth: 220,
  ml: 3,
  mr: 3,
  // borderRadius: 0,
})

function PageLink(props: Pick<MegaMenuItemFragment, 'url_path' | 'name'> & { level?: number }) {
  const { url_path, name, level } = props

  return (
    <Link href={`/${url_path}`} passHref>
      <ListItemButton component='a' sx={buttonStyle}>
        <ListItemText primary={name} />

        {/* {level === 0 ? <Typography variant='h2'>{name}</Typography> : name} */}
      </ListItemButton>
    </Link>
  )
}

export function MenuList(
  props: Omit<MegaMenuItemFragment, 'uid'> & {
    addLevel: boolean
    level?: number
    open: string
    setOpen: (any) => void
  },
) {
  const { name, children, url_path, addLevel, level = 0, open = '', setOpen } = props

  const viewOpen = (url: string) => {
    if (!open.includes(`/#/${url}`)) {
      setOpen(url === '/#' ? url : `/#/${url}`)
    }
  }
  const filteredChildren = children?.filter((item) => item?.include_in_menu === 1)
  const hasChildren = filteredChildren && filteredChildren.length > 0

  if (hasChildren) {
    return (
      <ListItem component='li' sx={{ display: 'contents' }}>
        <Box
          sx={[
            {
              gridColumnStart: level + 1,
            },
            open.includes('/#') &&
              level === 0 && {
                display: 'none',
              },
          ]}
        >
          <Link href={`/${url_path}`} passHref>
            <ListItemButton
              component='a'
              sx={buttonStyle}
              onClick={(e) => {
                if (viewOpen) {
                  viewOpen(url_path as string)
                }
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              <ListItemText primary={name} />
              <ListItemIcon sx={{ minWidth: 0 }}>
                <IconSvg src={iconChevronRight} />
              </ListItemIcon>

              {/* {level === 0 ? <Typography variant='h2'>{name}</Typography> : name} */}
            </ListItemButton>
          </Link>
        </Box>

        <List
          component='ul'
          sx={[
            {
              display: 'contents',
              zIndex: 1,
            },
            !open.includes(`/${url_path}`) && {
              display: 'block',
              zIndex: -1,
              position: 'absolute',
              left: '-100%',
            },
          ]}
        >
          {url_path !== '#' && (
            <ListItem sx={{ gridColumnStart: level + 2, gridRowStart: 1, padding: 0 }}>
              <PageLink {...props} name={`All ${name}`} url_path={url_path} level={level + 1} />
            </ListItem>
          )}

          {filteredChildren?.map((child) => (
            <MenuList
              {...child}
              level={level + 1}
              open={open}
              setOpen={setOpen}
              addLevel={addLevel}
            />
          ))}
        </List>
      </ListItem>
    )
  }

  if (!hasChildren) {
    return (
      <ListItem
        sx={[
          { gridColumnStart: level + 1, padding: 0 },
          open.includes('/#') &&
            level === 0 && {
              display: 'none',
            },
        ]}
        component='li'
      >
        <PageLink {...props} level={level} />
      </ListItem>
    )
  }

  return null
}

export function MegaMenu(
  props: MegaMenuQueryFragment & {
    addLevel: boolean
    sx?: SxProps<Theme>
    open: string
    setOpen: (string) => void
    itemsBefore?: React.ReactNode
    itemsAfter?: React.ReactNode
  },
) {
  const { menu, open, addLevel, setOpen, itemsBefore, itemsAfter } = props

  let extendedMenu = menu

  if (addLevel) {
    extendedMenu = {
      items: [
        {
          include_in_menu: 1,
          name: 'Products',
          uid: '#',
          url_path: '#',
          children: menu?.items,
        },
      ],
    }
  }

  const filteredMenu = extendedMenu?.items?.filter((item) => item?.include_in_menu === 1)

  return (
    <Box component='nav' id='main-nav' aria-label='Main'>
      <List
        disablePadding
        sx={{
          display: 'grid',
          gridAutoFlow: 'column',
          padding: 4,
        }}
      >
        {[...React.Children.toArray(itemsBefore)]}
        {filteredMenu?.map((tree) => (
          <MenuList
            key={tree?.url_path}
            {...tree}
            level={0}
            open={open}
            setOpen={setOpen}
            addLevel={addLevel}
          />
        ))}
        <Box
          component='li'
          sx={[
            { gridColumnStart: 1 },
            open.includes('/#') && {
              display: 'none',
            },
          ]}
        >
          <Divider key='divider' variant='middle' sx={{ my: '6px' }} />
          {[...React.Children.toArray(itemsAfter)]}
        </Box>
      </List>
    </Box>
  )
}
