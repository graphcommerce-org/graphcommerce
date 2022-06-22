import { Box, ListItemButton, SxProps, Theme } from '@mui/material'
import PageLink from 'next/link'
import React, { createContext, useContext, useMemo, useState } from 'react'
import { isElement } from 'react-is'
import { IconSvg } from '../../IconSvg'
import { extendableComponent } from '../../Styles/extendableComponent'
import { iconChevronRight } from '../../icons'

const parts = ['root', 'item', 'column', 'first', 'last'] as const
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
export type NavigationNode = {
  id: NavigationId
  name?: string
  href?: string
  component?: React.ReactNode
  childItems?: NavigationNode[]
  childItemsCount?: number
}

type NavigationItemProps = NavigationNode & {
  parentPath: NavigationPath
  row: number
}

function NavigationItem(props: NavigationItemProps) {
  const { id, href, component, childItems, parentPath, row, childItemsCount } = props
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
          className={[
            classes.item,
            row === 1 && classes.first,
            row === childItemsCount && classes.last,
          ].join(' ')}
          role='button'
          sx={{
            gridRowStart: row,
            gridColumnStart: level + levelOffset,
            gap: (theme) => theme.spacings.xxs,
            display: hideItem ? 'none' : 'flex',
          }}
          data-level={level + levelOffset}
          data-parentPath={parentPath.join(',')}
          disabled={selected}
          tabIndex={path.join(',').includes(parentPath.join(',')) ? undefined : -1}
          onClick={(e) => {
            e.preventDefault()
            if (!selected) select(itemPath)
          }}
        >
          <Box
            component='span'
            sx={{
              whiteSpace: 'nowrap',
              overflowX: 'hidden',
              textOverflow: 'ellipsis',
              flexGrow: 1,
            }}
          >
            <Render {...props} hasChildren={false} />
          </Box>
          <IconSvg src={iconChevronRight} sx={{ flexShrink: 0 }} />
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
              <PageLink href={href} passHref>
                <ListItemButton
                  className={[
                    classes.item,
                    classes.first,
                    row === childItemsCount && classes.last,
                  ].join(' ')}
                  sx={{
                    gridRowStart: 1,
                    gap: (theme) => theme.spacings.xs,
                    gridColumnStart: level + 1 + levelOffset,
                  }}
                  data-level={level + 1 + levelOffset}
                  data-parentPath={itemPath.join(',')}
                  tabIndex={path.join(',').includes(itemPath.join(',')) ? undefined : -1}
                >
                  <Box
                    component='span'
                    sx={{
                      whiteSpace: 'nowrap',
                      overflowX: 'hidden',
                      textOverflow: 'ellipsis',
                      flexGrow: 1,
                    }}
                  >
                    <Render {...props} hasChildren />
                  </Box>
                  <IconSvg src={iconChevronRight} sx={{ flexShrink: 0, visibility: 'hidden' }} />
                </ListItemButton>
              </PageLink>
            </Box>
          )}

          {childItems?.map((item, idx) => (
            <NavigationItem
              key={item.id}
              {...item}
              parentPath={itemPath}
              row={href ? idx + 2 : idx + 1}
              childItemsCount={childItems.length + 1}
            />
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
            className={[
              classes.item,
              row === 1 && classes.first,
              row === childItemsCount && classes.last,
            ].join(' ')}
            component='a'
            sx={{
              gridRowStart: row,
              gridColumnStart: level + levelOffset,
              gap: (theme) => theme.spacings.xxs,
            }}
            data-level={level + levelOffset}
            data-parentPath={parentPath.join(',')}
            tabIndex={path.join(',').includes(parentPath.join(',')) ? undefined : -1}
          >
            <Box
              component='span'
              sx={{
                whiteSpace: 'nowrap',
                overflowX: 'hidden',
                textOverflow: 'ellipsis',
                flexGrow: 1,
              }}
            >
              <Render {...props} hasChildren={false} />
            </Box>
            <IconSvg src={iconChevronRight} sx={{ flexShrink: 0, visibility: 'hidden' }} />
          </ListItemButton>
        </PageLink>
      ) : (
        <Box
          sx={{
            gridRowStart: row,
            gridColumnStart: level + levelOffset,
          }}
          data-level={level + levelOffset}
          data-parentPath={parentPath.join(',')}
          className={[
            classes.item,
            row === 1 && classes.first,
            row === childItemsCount && classes.last,
          ].join(' ')}
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
  const { items, path } = useContext(navigationContext)

  return (
    <Box
      className={classes.root}
      sx={[
        {
          display: 'grid',
          gridAutoFlow: 'column',
          scrollSnapAlign: 'end',
          '& > ul > li > a, & > ul > li > [role=button]': {
            '& span': {
              typography: 'h2',
            },
            // '& svg': { display: 'none' },
          },
          '& .Navigation-column': {
            boxShadow: (theme) => `inset 1px 0 ${theme.palette.divider}`,
          },
          '& .Navigation-item': {
            mx: (theme) => theme.spacings.md,
            whiteSpace: 'nowrap',
          },
          '& .Navigation-first': {
            // mt: (theme) => theme.spacings.md,
          },
          '& .Navigation-column:first-of-type': {
            boxShadow: 'none',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {path.length >= 0 && <Box sx={{ gridArea: '1 / 1 / 999 / 2' }} className={classes.column} />}
      {path.length >= 1 && <Box sx={{ gridArea: '1 / 2 / 999 / 3' }} className={classes.column} />}
      {path.length >= 2 && <Box sx={{ gridArea: '1 / 3 / 999 / 4' }} className={classes.column} />}
      {path.length >= 3 && <Box sx={{ gridArea: '1 / 4 / 999 / 5' }} className={classes.column} />}

      <Box sx={{ display: 'contents' }} component='ul'>
        {items.map((item, idx) => (
          <NavigationItem
            key={item.id}
            {...item}
            parentPath={[]}
            row={idx + 1}
            childItemsCount={items.length}
          />
        ))}
      </Box>
    </Box>
  )
}

export function useNavigation() {
  return useContext(navigationContext)
}
