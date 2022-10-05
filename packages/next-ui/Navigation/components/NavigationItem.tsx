/* eslint-disable @typescript-eslint/no-use-before-define */
import { useMotionValueValue } from '@graphcommerce/framer-utils'
import { alpha, Box, ListItemButton, styled, useEventCallback, useTheme } from '@mui/material'
import PageLink from 'next/link'
import React from 'react'
import { IconSvg } from '../../IconSvg'
import { extendableComponent } from '../../Styles/extendableComponent'
import { useMatchMedia } from '../../hooks'
import { iconChevronRight } from '../../icons'
import {
  isNavigationButton,
  isNavigationComponent,
  isNavigationHref,
  NavigationNode,
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
  parentPath: string
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

export const NavigationItem = React.memo<NavigationItemProps>((props) => {
  const { id, parentPath, idx, first, last, NavigationList, mouseEvent } = props
  const { selection, hideRootOnNavigate, closing, animating, serverRenderDepth } = useNavigation()

  const row = idx + 1

  const itemPath = [...(parentPath ? parentPath.split(',') : []), id]

  const isSelected = useMotionValueValue(
    selection,
    (s) => s !== false && s.slice(0, itemPath.length).join('/') === itemPath.join('/'),
  )
  const hidingRoot = useMotionValueValue(
    selection,
    (s) => s === false || (hideRootOnNavigate && s.length > 0),
  )

  const tabIndex = useMotionValueValue(selection, (s) =>
    s !== false && s.join(',').includes(parentPath) ? undefined : -1,
  )

  const hideItem = hidingRoot && itemPath.length === 1

  const column = hidingRoot ? itemPath.length - 1 : itemPath.length
  const classes = withState({ first, last, column: itemPath.length })

  const onCloseHandler: React.MouseEventHandler<HTMLAnchorElement> = useEventCallback(() => {
    if (!isNavigationHref(props)) return
    closing.set(true)
  })

  const matchMedia = useMatchMedia()

  if (isNavigationButton(props)) {
    const { childItems, name, href } = props

    const skipChildren = itemPath.length + 1 > serverRenderDepth && !isSelected && !!href

    return (
      <NavigationLI className={classes.li}>
        <ListItemButton
          component={href ? 'a' : 'div'}
          href={href || undefined}
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
                background: alpha(theme.palette.action.hover, 0.025),
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
          tabIndex={tabIndex}
          onClick={(e) => {
            e.preventDefault()
            if (!isSelected && !animating.get()) {
              selection.set(itemPath)
            }
          }}
          onMouseMove={
            (itemPath.length > 1 || !hideRootOnNavigate) && mouseEvent === 'hover'
              ? (e) => {
                  if (!isSelected && !animating.get() && matchMedia.up('md')) {
                    e.preventDefault()
                    setTimeout(() => selection.set(itemPath), 0)
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

        {!skipChildren && (
          <NavigationList
            items={childItems}
            selected={isSelected}
            parentPath={itemPath.join(',')}
            mouseEvent={mouseEvent}
          />
        )}
      </NavigationLI>
    )
  }

  if (isNavigationHref(props)) {
    const { name, href } = props

    return (
      <NavigationLI sx={[hideItem && { display: 'none' }]} className={classes.li}>
        <PageLink href={href} passHref prefetch={false}>
          <ListItemButton
            className={classes.item}
            component='a'
            sx={(theme) => ({
              gridRowStart: row,
              gridColumnStart: column,
              gap: theme.spacings.xxs,
            })}
            tabIndex={tabIndex}
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

  return null
})

if (process.env.NODE_ENV !== 'production') {
  NavigationItem.displayName = 'NavigationItem'
}
