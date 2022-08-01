/* eslint-disable @typescript-eslint/no-use-before-define */
import { Box, ListItemButton, styled, Theme, useEventCallback, useMediaQuery } from '@mui/material'
import PageLink from 'next/link'
import { useEffect } from 'react'
import { IconSvg } from '../../IconSvg'
import { extendableComponent } from '../../Styles/extendableComponent'
import { iconChevronRight } from '../../icons'
import {
  isNavigationButton,
  isNavigationComponent,
  isNavigationHref,
  NavigationNode,
  NavigationPath,
  useNavigation,
} from '../hooks/useNavigation'
import type { NavigationList } from './NavigationList'

type OwnerState = {
  first?: boolean
  last?: boolean
  // It is actually used.
  // eslint-disable-next-line react/no-unused-prop-types
  column: number
}

type NavigationItemProps = NavigationNode & {
  parentPath: NavigationPath
  idx: number
  NavigationList: typeof NavigationList
} & OwnerState &
  mouseEventPref

export type mouseEventPref = {
  mouseEvent: 'click' | 'hover'
}

const componentName = 'NavigationItem'
const parts = ['li', 'ul', 'item'] as const

const { withState } = extendableComponent<OwnerState, typeof componentName, typeof parts>(
  componentName,
  parts,
)

const NavigationLI = styled('li')({ display: 'contents' })

export function NavigationItem(props: NavigationItemProps) {
  const { id, parentPath, idx, first, last, NavigationList, mouseEvent } = props

  const row = idx + 1
  const { selected, select, hideRootOnNavigate, onClose, animating } = useNavigation()

  const itemPath = [...parentPath, id]
  const isSelected = selected.slice(0, itemPath.length).join('/') === itemPath.join('/')

  const hidingRoot = hideRootOnNavigate && selected.length > 0
  const hideItem = hidingRoot && itemPath.length === 1

  const column = hidingRoot ? itemPath.length - 1 : itemPath.length
  const classes = withState({ first, last, column: itemPath.length })

  const onCloseHandler: React.MouseEventHandler<HTMLAnchorElement> = useEventCallback((e) => {
    if (!isNavigationHref(props)) return
    const { href } = props
    onClose?.(e, href)
  })

  const isDesktop = useMediaQuery<Theme>((theme) => theme.breakpoints.up('md'))

  if (isNavigationButton(props)) {
    const { childItems, name } = props
    return (
      <NavigationLI className={classes.li}>
        <ListItemButton
          className={classes.item}
          role='button'
          sx={[
            (theme) => ({
              gridRowStart: row,
              gridColumnStart: column,
              gap: theme.spacings.xxs,
              display: hideItem ? 'none' : 'flex',
              '&.Mui-disabled': {
                opacity: 1,
                background: theme.palette.action.hover,
              },
            }),
            mouseEvent === 'hover'
              ? {
                  '&.Mui-disabled': {
                    cursor: 'pointer',
                    pointerEvents: 'auto',
                  },
                }
              : {},
          ]}
          disabled={isSelected}
          tabIndex={selected.join(',').includes(parentPath.join(',')) ? undefined : -1}
          onClick={(e) => {
            e.preventDefault()
            if (!isSelected && animating.current === false) {
              select(itemPath)
            }
          }}
          onMouseEnter={
            itemPath.length > 1 && mouseEvent === 'hover'
              ? (e) => {
                  if (isDesktop && animating.current === false && !isSelected) {
                    e.preventDefault()
                    setTimeout(() => select(itemPath), 0)
                  }
                }
              : undefined
          }
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
            {name}
          </Box>
          <IconSvg src={iconChevronRight} sx={{ flexShrink: 0 }} />
        </ListItemButton>

        <NavigationList
          items={childItems}
          selected={isSelected}
          parentPath={itemPath}
          mouseEvent={mouseEvent}
        />
      </NavigationLI>
    )
  }

  if (isNavigationHref(props)) {
    const { name, href } = props
    return (
      <NavigationLI sx={[hideItem && { display: 'none' }]} className={classes.li}>
        <PageLink href={href} passHref>
          <ListItemButton
            className={classes.item}
            component='a'
            sx={(theme) => ({
              gridRowStart: row,
              gridColumnStart: column,
              gap: theme.spacings.xxs,
            })}
            tabIndex={selected.join(',').includes(parentPath.join(',')) ? undefined : -1}
            onClick={onCloseHandler}
          >
            <Box
              component='span'
              sx={{
                whiteSpace: 'nowrap',
                overflowX: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {name}
            </Box>
          </ListItemButton>
        </PageLink>
      </NavigationLI>
    )
  }

  if (isNavigationComponent(props)) {
    const { component } = props
    return (
      <NavigationLI sx={[hideItem && { display: 'none' }]} className={classes.li}>
        <Box sx={{ gridRowStart: row, gridColumnStart: column }} className={classes.item}>
          {component}
        </Box>
      </NavigationLI>
    )
  }

  if (process.env.NODE_ENV !== 'production') throw Error('NavigationItem: unknown type')

  return null
}
