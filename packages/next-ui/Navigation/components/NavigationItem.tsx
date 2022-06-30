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
}

type NavigationItemProps = NavigationNode & {
  parentPath: NavigationPath
  idx: number
  onLinkClick?: () => void
} & OwnerState

const componentName = 'NavigationItem'
const parts = ['li', 'ul', 'item'] as const

const { withState, classes } = extendableComponent<OwnerState, typeof componentName, typeof parts>(
  componentName,
  parts,
)
export const navigationItemClasses = classes

const NavigationLI = styled('li')({ display: 'contents' })

export function NavigationItem(props: NavigationItemProps) {
  const { id, parentPath, idx, first, last, onLinkClick: onNavigationClick } = props

  const row = idx + 1
  const { path, select, hideRootOnNavigate } = useNavigation()

  const itemPath = [...parentPath, id]
  const selected = path.slice(0, itemPath.length).join('/') === itemPath.join('/')

  const stateClasses = withState({ first, last })

  const hidingRoot = hideRootOnNavigate && path.length > 0
  const hideItem = hidingRoot && itemPath.length === 1

  const column = hidingRoot ? itemPath.length - 1 : itemPath.length

  const isHref = isNavigationHref(props)
  const isButton = isNavigationButton(props)
  const isComponent = isNavigationComponent(props)

  let result: React.ReactElement<any, any> | null = null

  if (isButton) {
    const { childItems, name } = props

    result = (
      <>
        <ListItemButton
          className={stateClasses.item}
          role='button'
          sx={{
            gridRowStart: row,
            gridColumnStart: column,
            gap: (theme) => theme.spacings.xxs,
            display: hideItem ? 'none' : 'flex',
          }}
          data-level={column}
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
            {name}
          </Box>
          <IconSvg src={iconChevronRight} sx={{ flexShrink: 0 }} />
        </ListItemButton>

        <NavigationItems items={childItems} selected={selected} parentPath={itemPath} />
      </>
    )
  }

  if (isHref) {
    const { name, href } = props
    result = (
      <PageLink href={href} passHref>
        <ListItemButton
          className={stateClasses.item}
          component='a'
          sx={(theme) => ({
            gridRowStart: row,
            gridColumnStart: column,
            gap: theme.spacings.xxs,
          })}
          data-level={column}
          tabIndex={path.join(',').includes(parentPath.join(',')) ? undefined : -1}
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
    )
  }

  if (isComponent) {
    const { component } = props
    result = (
      <Box
        sx={{ gridRowStart: row, gridColumnStart: column }}
        data-level={column}
        className={stateClasses.item}
      >
        {component}
      </Box>
    )
  }

  return (
    <NavigationLI sx={[hideItem && !isButton && { display: 'none' }]} className={stateClasses.li}>
      {result}
    </NavigationLI>
  )
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

  return (
    <NavigationUList
      sx={[
        { display: 'block', position: 'absolute', left: '-10000px', top: '-10000px' },
        selected && { display: 'contents' },
      ]}
      className={navigationItemClasses.ul}
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
        />
      ))}
    </NavigationUList>
  )
}
