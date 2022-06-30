import { Box, ListItemButton } from '@mui/material'
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
const parts = ['li', 'item'] as const
type OwnerState = {
  first: boolean
  last: boolean
}
const { withState } = extendableComponent<OwnerState, typeof name, typeof parts>(name, parts)

export function NavigationItem(props: NavigationItemProps) {
  const { id, href, component, childItems, parentPath, row, childItemsCount, onItemClick } = props
  const { Render, path, select, hideRootOnNavigate } = useNavigation()

  const itemPath = [...parentPath, id]
  const level = itemPath.length
  const selected = path.slice(0, level).join('/') === itemPath.join('/')

  if (!href && (!childItems || childItems.length === 0) && !component) {
    if (process.env.NODE_ENV !== 'production')
      console.error('NavigationItem MUST have an href, childItems or component', props)
    return null
  }

  const first = row === 1
  const last = row === childItemsCount
  const classes = withState({ first, last })

  const isRoot = itemPath.length === 1
  const hidingRoot = hideRootOnNavigate && path.length > 0
  const hideItem = hidingRoot && isRoot

  const levelOffset = hidingRoot ? -1 : 0

  if (childItems) {
    return (
      <Box sx={{ display: 'contents' }} component='li' className={classes.li}>
        <ListItemButton
          className={classes.item}
          role='button'
          sx={{
            gridRowStart: row,
            gridColumnStart: level + levelOffset,
            gap: (theme) => theme.spacings.xxs,
            display: hideItem ? 'none' : 'flex',
          }}
          data-level={level + levelOffset}
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
            <Box sx={{ display: 'contents' }} component='li' className={classes.li}>
              <PageLink href={href} passHref>
                <ListItemButton
                  className={withState({ first: true, last }).item}
                  sx={(theme) => ({
                    gridRowStart: 1,
                    gap: theme.spacings.xs,
                    gridColumnStart: level + 1 + levelOffset,
                  })}
                  data-level={level + 1 + levelOffset}
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
            </Box>
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
        </Box>
      </Box>
    )
  }

  return (
    <Box component='li' sx={{ display: hideItem ? 'none' : 'contents' }} classes={classes.li}>
      {href ? (
        <PageLink href={href} passHref>
          <ListItemButton
            className={classes.item}
            component='a'
            sx={(theme) => ({
              gridRowStart: row,
              gridColumnStart: level + levelOffset,
              gap: theme.spacings.xxs,
            })}
            data-level={level + levelOffset}
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
          sx={{ gridRowStart: row, gridColumnStart: level + levelOffset }}
          data-level={level + levelOffset}
          className={classes.item}
        >
          {component}
        </Box>
      )}
    </Box>
  )
}
