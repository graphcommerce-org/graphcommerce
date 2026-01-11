'use client'

import { useMotionValueValue } from '@graphcommerce/framer-utils'
import {
  DarkLightModeMenuSecondaryItem,
  iconChevronRight,
  iconClose,
  iconCustomerService,
  iconHeart,
  IconSvg,
  MenuFabSecondaryItem,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import type { MotionValue } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import type { LayoutQuery } from '../../graphql/Layout.gql'

type NavigationItem = {
  id: string
  name: React.ReactNode
  href?: string
  children?: NavigationItem[]
}

export type NavigationDrawerProps = {
  selection: MotionValue<string[] | false>
  items: NavigationItem[]
  menu?: LayoutQuery['menu']
  store: string
}

function NavItem({
  item,
  level = 0,
  onClose,
}: {
  item: NavigationItem
  level?: number
  onClose: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const hasChildren = item.children && item.children.length > 0

  if (hasChildren) {
    return (
      <>
        <ListItem disablePadding>
          <ListItemButton onClick={() => setExpanded(!expanded)} sx={{ pl: 2 + level * 2 }}>
            <ListItemText primary={item.name} />
            <IconSvg
              src={iconChevronRight}
              size='small'
              sx={{
                transform: expanded ? 'rotate(90deg)' : 'none',
                transition: 'transform 0.2s',
              }}
            />
          </ListItemButton>
        </ListItem>
        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {item.children?.map((child) => (
              <NavItem key={child.id} item={child} level={level + 1} onClose={onClose} />
            ))}
          </List>
        </Collapse>
      </>
    )
  }

  if (item.href) {
    return (
      <ListItem disablePadding>
        <ListItemButton
          component={Link}
          href={item.href}
          onClick={onClose}
          sx={{ pl: 2 + level * 2 }}
        >
          <ListItemText primary={item.name} />
        </ListItemButton>
      </ListItem>
    )
  }

  return null
}

/**
 * Simple navigation drawer for App Router Uses MUI Drawer instead of the complex scroll-snap based
 * NavigationOverlay
 */
export function NavigationDrawer(props: NavigationDrawerProps) {
  const { selection, items, store } = props

  const isOpen = useMotionValueValue(selection, (s) => s !== false)

  const handleClose = () => {
    selection.set(false)
  }

  return (
    <Drawer
      anchor='left'
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: { xs: '80vw', sm: '320px' },
          maxWidth: '100%',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          p: 1,
        }}
      >
        <IconButton onClick={handleClose} aria-label='close'>
          <IconSvg src={iconClose} />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {items.map((item) =>
          // Skip React elements (dividers, etc.) for now
          typeof item === 'object' && 'id' in item ? (
            <NavItem key={item.id} item={item} onClose={handleClose} />
          ) : null,
        )}
      </List>
      <Divider />
      <List>
        <MenuFabSecondaryItem
          icon={<IconSvg src={iconHeart} size='medium' />}
          href={`/${store}/account`}
          onClick={handleClose}
        >
          <Trans>Account</Trans>
        </MenuFabSecondaryItem>
        <MenuFabSecondaryItem
          icon={<IconSvg src={iconCustomerService} size='medium' />}
          href={`/${store}/service`}
          onClick={handleClose}
        >
          <Trans>Customer Service</Trans>
        </MenuFabSecondaryItem>
        <DarkLightModeMenuSecondaryItem />
      </List>
    </Drawer>
  )
}
