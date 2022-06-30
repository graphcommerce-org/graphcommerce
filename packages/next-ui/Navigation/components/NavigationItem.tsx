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

const parts = ['root', 'column', 'first'] as const
const { classes } = extendableComponent('NavigationItem', parts)

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
                  tabIndex={path.join(',').includes(itemPath.join(',')) ? undefined : -1}
                  onClick={() => {
                    if (onItemClick) {
                      onItemClick()
                    }
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
            tabIndex={path.join(',').includes(parentPath.join(',')) ? undefined : -1}
            onClick={() => {
              if (onItemClick) {
                onItemClick()
              }
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
