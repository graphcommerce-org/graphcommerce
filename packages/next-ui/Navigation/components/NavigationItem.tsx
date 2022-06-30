/* eslint-disable @typescript-eslint/no-use-before-define */
import { Box, ListItemButton, styled } from '@mui/material'
import PageLink from 'next/link'
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

type OwnerState = {
  first: boolean
  last: boolean
  // It is actually used.
  // eslint-disable-next-line react/no-unused-prop-types
  column: number
}

type NavigationItemProps = NavigationNode & {
  parentPath: NavigationPath
  idx: number
  onLinkClick?: () => void
} & OwnerState

const componentName = 'NavigationItem'
const parts = ['li', 'ul', 'item'] as const

const { withState } = extendableComponent<OwnerState, typeof componentName, typeof parts>(
  componentName,
  parts,
)

const NavigationLI = styled('li')({ display: 'contents' })

export function NavigationItem(props: NavigationItemProps) {
  const { id, parentPath, idx, first, last, onLinkClick: onNavigationClick } = props

  const row = idx + 1
  const { selected, select, hideRootOnNavigate } = useNavigation()

  const itemPath = [...parentPath, id]
  const thisIsSelected = selected.slice(0, itemPath.length).join('/') === itemPath.join('/')

  const hidingRoot = hideRootOnNavigate && selected.length > 0
  const hideItem = hidingRoot && itemPath.length === 1

  const column = hidingRoot ? itemPath.length - 1 : itemPath.length
  const classes = withState({ first, last, column: itemPath.length })

  if (isNavigationButton(props)) {
    const { childItems, name } = props
    return (
      <NavigationLI className={classes.li}>
        <ListItemButton
          className={classes.item}
          role='button'
          sx={{
            gridRowStart: row,
            gridColumnStart: column,
            gap: (theme) => theme.spacings.xxs,
            display: hideItem ? 'none' : 'flex',
          }}
          data-level={column}
          disabled={thisIsSelected}
          tabIndex={selected.join(',').includes(parentPath.join(',')) ? undefined : -1}
          onClick={(e) => {
            e.preventDefault()
            if (!thisIsSelected) select(itemPath)
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
            {name}
          </Box>
          <IconSvg src={iconChevronRight} sx={{ flexShrink: 0 }} />
        </ListItemButton>

        <NavigationItems items={childItems} selected={thisIsSelected} parentPath={itemPath} />
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
            data-level={column}
            tabIndex={selected.join(',').includes(parentPath.join(',')) ? undefined : -1}
            onClick={onNavigationClick}
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
            <IconSvg src={iconChevronRight} sx={{ flexShrink: 0, visibility: 'hidden' }} />
          </ListItemButton>
        </PageLink>
      </NavigationLI>
    )
  }

  if (isNavigationComponent(props)) {
    const { component } = props
    return (
      <NavigationLI sx={[hideItem && { display: 'none' }]} className={classes.li}>
        <Box
          sx={{ gridRowStart: row, gridColumnStart: column }}
          data-level={column}
          className={classes.item}
        >
          {component}
        </Box>
      </NavigationLI>
    )
  }

  if (process.env.NODE_ENV !== 'production') throw Error('NavigationItem: unknown type')

  return null
}

const NavigationUList = styled('ul')({})

type NavigationItemsProps = {
  parentPath?: NavigationPath
  items: NavigationNode[]
  onLinkClick?: () => void
  selected?: boolean
}

export function NavigationItems(props: NavigationItemsProps) {
  const { items, onLinkClick, parentPath = [], selected = false } = props

  const classes = withState({ first: false, last: false, column: 0 })

  return (
    <NavigationUList
      sx={[
        { display: 'block', position: 'absolute', left: '-10000px', top: '-10000px' },
        selected && { display: 'contents' },
      ]}
      className={classes.ul}
    >
      {items.map((item, idx) => (
        <NavigationItem
          key={item.id}
          {...item}
          parentPath={parentPath}
          idx={idx}
          first={idx === 0}
          last={idx === items.length - 1}
          onLinkClick={onLinkClick}
          column={0}
        />
      ))}
    </NavigationUList>
  )
}
