import { Box } from '@mui/material'
import PageLink from 'next/link'
import React, { createContext, useContext, useMemo, useState } from 'react'
import { isElement } from 'react-is'
import { Button } from '../../Button'
import { IconSvg } from '../../IconSvg'
import { iconChevronRight } from '../../icons'

function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined
}

export type NavigationPath = NavigationId[]
type SelectPath = (path: NavigationPath) => void
export type NavigationContext = {
  path: NavigationPath
  select: SelectPath
  Render: RenderItem<NavigationNode>
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
        <Button
          sx={{
            gridColumnStart: level + levelOffset,
            justifyContent: 'space-between',
            minWidth: 200,
            display: hideItem ? 'none' : undefined,
          }}
          data-level={level + levelOffset}
          onClick={() => (selected ? select(parentPath) : select(itemPath))}
          endIcon={<IconSvg src={iconChevronRight} />}
        >
          <Render {...props} hasChildren={false} />
        </Button>

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
                <Button
                  component='a'
                  sx={{
                    gridColumnStart: level + 1 + levelOffset,
                    justifyContent: 'space-between',
                    minWidth: 200,
                  }}
                  data-level={level + 1 + levelOffset}
                >
                  <Render {...props} hasChildren />
                </Button>
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
          <Button
            component='a'
            sx={{ gridColumnStart: level + levelOffset, justifyContent: 'space-between' }}
            data-level={level + levelOffset}
          >
            <Render {...props} hasChildren={false} />
          </Button>
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

type RenderItem<ItemProps extends NavigationNode> = React.VFC<
  Omit<ItemProps, 'childItems'> & { children?: React.ReactNode; hasChildren: boolean }
>

type NavigationBaseProps<ItemProps extends NavigationNode> = {
  items: ItemProps[]
  renderItem: RenderItem<ItemProps>
  onChange?: (path: NavigationPath) => void
  hideRootOnNavigate?: boolean
}

export function NavigationBase<ItemProps extends NavigationNode>(
  props: NavigationBaseProps<ItemProps>,
) {
  const { items: childItems, renderItem, onChange, hideRootOnNavigate = false } = props

  const [path, select] = useState<NavigationPath>([])
  const value = useMemo<NavigationContext>(
    () => ({
      hideRootOnNavigate,
      path,
      select: (incomming: NavigationPath) => {
        select(incomming)
        onChange?.(incomming)
      },
      Render: renderItem,
    }),
    [hideRootOnNavigate, path, renderItem, onChange],
  )

  return (
    <navigationContext.Provider value={value}>
      <Box sx={{ display: 'grid', gridAutoFlow: 'column', justifyContent: 'start', columnGap: 4 }}>
        <Box sx={{ display: 'contents' }} component='ul'>
          {childItems?.map((item) => (
            <NavigationItem key={item.id} {...item} level={1} parentPath={[]} />
          ))}
        </Box>
      </Box>
    </navigationContext.Provider>
  )
}

export type NavItemProps = NavigationNode & {
  name?: string
}

export type NavigationProps = {
  items: (NavItemProps | React.ReactElement)[]
} & Omit<NavigationBaseProps<NavItemProps>, 'items' | 'renderItem'>

export function Navigation(props: NavigationProps) {
  const { items, ...other } = props

  const childItems: NavItemProps[] = useMemo(
    () =>
      items
        .map((item, index) => (isElement(item) ? { id: item.key ?? index, component: item } : item))
        .filter(nonNullable),
    [items],
  )

  return (
    <Box className='myoverlay'>
      <NavigationBase<NavItemProps>
        items={childItems}
        renderItem={({ id, hasChildren, children, href, name, component }) => {
          if (component) return <>{component}</>
          return (
            <>
              {hasChildren && 'All'} {name}
            </>
          )
        }}
        {...other}
      />
    </Box>
  )
}
