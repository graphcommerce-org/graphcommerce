import { IconSvg, iconChevronRight } from '@graphcommerce/next-ui'
import { Box, Button, List, ListItem, SxProps, Theme } from '@mui/material'
import Link from 'next/link'
import React from 'react'
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

function PageLink(props: Pick<MegaMenuItemFragment, 'url_path' | 'name'>) {
  const { url_path, name } = props

  return (
    <Link href={`/${url_path}`} passHref>
      <Button variant='text' sx={buttonStyle} size='large'>
        {name}
      </Button>
    </Link>
  )
}

export function MenuList(
  props: Omit<MegaMenuItemFragment, 'uid'> & { level?: number; selected: string },
) {
  const { name, children, url_path, level = 0, selected } = props
  const [open, setOpen] = React.useState<string[]>([])

  // useEffect(() => setOpen(''))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClick = (url: string) => {
    if (!open.includes(url)) {
      setOpen([...open, url])
    } else {
      setOpen(open.filter((item) => item !== url))
    }
    console.log(open)
  }
  const hasChildren = children && children.length > 0

  if (hasChildren) {
    return (
      <ListItem component='li' sx={{ display: 'contents' }}>
        <Box sx={{ gridColumnStart: level + 1 }}>
          <Link href={`/${url_path}`} passHref>
            <Button
              variant='text'
              sx={buttonStyle}
              size='large'
              onClick={(e) => {
                if (handleClick) {
                  handleClick(url_path as string)
                }
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              {name}
              {open ? <IconSvg src={iconChevronRight} /> : <IconSvg src={iconChevronRight} />}
            </Button>
          </Link>
        </Box>
        {url_path === 'men' ||
        url_path === 'men/photography' ||
        url_path === 'men/photography/sunrise' ? (
          <List component='ul' sx={{ display: 'contents' }}>
            <Box sx={{ gridColumnStart: level + 2, gridRowStart: 1 }}>
              <PageLink {...props} name={`All ${name}`} url_path={url_path} />
            </Box>

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
        <PageLink {...props} />
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
