import { Box, ListItemButton, styled } from '@mui/material'
import PageLink from 'next/link'
import { IconSvg } from '../../IconSvg'
import { extendableComponent } from '../../Styles/extendableComponent'
import { iconChevronRight } from '../../icons'
import { NavigationNode, NavigationPath, useNavigation } from '../hooks/useNavigation'

type NavigationItemProps = NavigationNode & {
  parentPath: NavigationPath
  row: number
}

const name = 'NavigationItem'
const parts = ['li', 'ul', 'item'] as const
type OwnerState = {
  first: boolean
  last: boolean
}
const { withState, classes } = extendableComponent<OwnerState, typeof name, typeof parts>(
  name,
  parts,
)
export const navigationItemClasses = classes

export const NavigationList = styled('ul')({})
const NavigationListItem = styled('li')({ display: 'contents' })

export function NavigationItem(props: NavigationItemProps) {
  const { id, href, component, childItems, parentPath, row, childItemsCount, onItemClick } = props
  const { Render, path, select, hideRootOnNavigate } = useNavigation()

  const itemPath = [...parentPath, id]
  const selected = path.slice(0, itemPath.length).join('/') === itemPath.join('/')

  if (!href && (!childItems || childItems.length === 0) && !component) {
    if (process.env.NODE_ENV !== 'production')
      console.error('NavigationItem MUST have an href, childItems or component', props)
    return null
  }

  const first = row === 1
  const last = row === childItemsCount
  const stateClasses = withState({ first, last })

  const hidingRoot = hideRootOnNavigate && path.length > 0
  const hideItem = hidingRoot && itemPath.length === 1

  const column = hidingRoot ? itemPath.length - 1 : itemPath.length

  if (childItems) {
    return (
      <NavigationListItem className={stateClasses.li}>
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
            <Render {...props} hasChildren={false} />
          </Box>
          <IconSvg src={iconChevronRight} sx={{ flexShrink: 0 }} />
        </ListItemButton>

        <NavigationList
          sx={[
            { display: 'block', position: 'absolute', left: '-10000px', top: '-10000px' },
            selected && { display: 'contents' },
          ]}
          className={classes.ul}
        >
          {href && (
            <NavigationListItem className={stateClasses.li}>
              <PageLink href={href} passHref>
                <ListItemButton
                  className={withState({ first: true, last }).item}
                  sx={(theme) => ({
                    gridRowStart: 1,
                    gap: theme.spacings.xs,
                    gridColumnStart: column + 1,
                  })}
                  data-level={column + 1}
                  tabIndex={path.join(',').includes(itemPath.join(',')) ? undefined : -1}
                  onClick={onItemClick}
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
            </NavigationListItem>
          )}

          {childItems?.map((item, idx) => (
            <NavigationItem
              key={item.id}
              {...item}
              parentPath={itemPath}
              row={href ? idx + 2 : idx + 1}
              childItemsCount={childItems.length + 1}
              onItemClick={onItemClick}
            />
          ))}
        </NavigationList>
      </NavigationListItem>
    )
  }

  return (
    <NavigationListItem sx={[hideItem && { display: 'none' }]} className={stateClasses.li}>
      {href ? (
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
            onClick={onItemClick}
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
          sx={{ gridRowStart: row, gridColumnStart: column }}
          data-level={column}
          className={stateClasses.item}
        >
          {component}
        </Box>
      )}
    </NavigationListItem>
  )
}
