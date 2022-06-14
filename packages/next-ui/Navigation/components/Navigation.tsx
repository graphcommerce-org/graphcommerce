import { Box, ListItemButton, SxProps, Theme } from '@mui/material'
import PageLink from 'next/link'
import React, { createContext, useContext, useMemo, useState } from 'react'
import { isElement } from 'react-is'
import { Button } from '../../Button'
import { IconSvg } from '../../IconSvg'
import { extendableComponent } from '../../Styles/extendableComponent'
import { iconChevronRight } from '../../icons'

const parts = ['root', 'button'] as const
const { classes } = extendableComponent('Navigation', parts)

function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined
}

export type NavigationPath = NavigationId[]
type SelectPath = (path: NavigationPath) => void
export type NavigationContext = {
  path: NavigationPath
  select: SelectPath
  Render: RenderItem
  items: NavigationNode[]
  hideRootOnNavigate: boolean
}

const navigationContext = createContext(undefined as unknown as NavigationContext)

type NavigationId = string | number
type NavigationNode = {
  id: NavigationId
  name?: string
  href?: string
  component?: React.ReactNode
  childItems?: NavigationNode[]
}

type NavigationItemProps = NavigationNode & {
  parentPath: NavigationPath
}

function NavigationItem(props: NavigationItemProps) {
  const { id, href, component, childItems, parentPath } = props
  const { Render, path, select, hideRootOnNavigate } = useContext(navigationContext)

  const itemPath = [...parentPath, id]
  const level = itemPath.length
  const selected = path.slice(0, level).join('/') === itemPath.join('/')

  if (!href && (!childItems || childItems.length === 0) && !component) {
    if (process.env.NODE_ENV !== 'production')
      console.error('NavigationItem MUST have an href, childItems or component', props)
    return null
  }

  // let visible = selected
  const isRoot = itemPath.length === 1
  const hidingRoot = hideRootOnNavigate && path.length > 0
  const hideItem = hidingRoot && isRoot

  const levelOffset = hidingRoot ? -1 : 0

  if (childItems) {
    return (
      <Box sx={{ display: 'contents' }} component='li'>
        <ListItemButton
          className={classes.button}
          component='a'
          sx={{
            gridColumnStart: level + levelOffset,
            justifyContent: 'space-between',
            minWidth: 200,
            display: hideItem ? 'none' : undefined,
          }}
          data-level={level + levelOffset}
          onClick={() => (selected ? select(parentPath) : select(itemPath))}
        >
          <Render {...props} hasChildren={false} />
          <IconSvg src={iconChevronRight} />
        </ListItemButton>

        <Box
          sx={[
            { display: 'block', position: 'absolute', left: '-10000px', top: '-10000px' },
            selected && { display: 'contents' },
          ]}
          component='ul'
        >
          {href && (
            <Box sx={{ display: 'contents' }} component='li'>
              <PageLink href={href}>
                <ListItemButton
                  className={classes.button}
                  component='a'
                  sx={{
                    gridColumnStart: level + 1 + levelOffset,
                    justifyContent: 'space-between',
                    minWidth: 200,
                  }}
                  data-level={level + 1 + levelOffset}
                >
                  <Render {...props} hasChildren />
                </ListItemButton>
              </PageLink>
            </Box>
          )}

          {childItems?.map((item) => (
            <NavigationItem key={item.id} {...item} parentPath={itemPath} />
          ))}
        </Box>
      </Box>
    )
  }

  return (
    <Box component='li' sx={{ display: hideItem ? 'none' : 'contents' }}>
      {href ? (
        <PageLink href={href} passHref>
          <ListItemButton
            className={classes.button}
            component='a'
            sx={{ gridColumnStart: level + levelOffset, justifyContent: 'space-between' }}
            data-level={level + levelOffset}
          >
            <Render {...props} hasChildren={false} />
          </ListItemButton>
        </PageLink>
      ) : (
        <Box
          sx={{ gridColumnStart: level + levelOffset, justifyContent: 'space-between' }}
          data-level={level + levelOffset}
        >
          {component}
        </Box>
      )}
    </Box>
  )
}

type RenderItem = React.VFC<
  Omit<NavigationNode, 'childItems'> & { children?: React.ReactNode; hasChildren: boolean }
>

export type NavigationProviderProps = {
  items: (NavigationNode | React.ReactElement)[]
  renderItem: RenderItem
  onChange?: (path: NavigationPath) => void
  hideRootOnNavigate?: boolean
  children?: React.ReactNode
}

export function NavigationProvider(props: NavigationProviderProps) {
  const { items, renderItem, onChange, hideRootOnNavigate = false, children } = props

  const [path, select] = useState<NavigationPath>([])
  const value = useMemo<NavigationContext>(
    () => ({
      hideRootOnNavigate,
      path,
      select: (incomming: NavigationPath) => {
        select(incomming)
        onChange?.(incomming)
      },
      items: items
        .map((item, index) => (isElement(item) ? { id: item.key ?? index, component: item } : item))
        .filter(nonNullable),
      Render: renderItem,
    }),
    [hideRootOnNavigate, path, renderItem, items, onChange],
  )

  return <navigationContext.Provider value={value}>{children}</navigationContext.Provider>
}

type NavigationBaseProps = {
  sx?: SxProps<Theme>
}
export function NavigationBase(props: NavigationBaseProps) {
  const { sx = [] } = props
  const { items } = useContext(navigationContext)

  return (
    <Box
      className={classes.root}
      sx={[
        { display: 'grid', gridAutoFlow: 'column', justifyContent: 'start', columnGap: 4 },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box sx={{ display: 'contents' }} component='ul'>
        {items.map((item) => (
          <NavigationItem key={item.id} {...item} parentPath={[]} />
        ))}
      </Box>
    </Box>
  )
}

export function useNavigation() {
  return useContext(navigationContext)
}
