import { Trans } from '@lingui/react'
import { Theme, SxProps, List, ListItem, Link } from '@mui/material'
import { MenuRootButtonProps } from './MenuItemProps'
import { MenuRootButton } from './MenuRootButton'

export function MenuItem(props: MenuRootButtonProps) {
  const { active, children, include_in_menu, index, name, url_path } = props

  if (!include_in_menu) return null

  const hasChildren = children?.some((child) => child?.include_in_menu) || false

  const subMenuContainer: SxProps<Theme> = [
    (theme) => ({
      background: theme.palette.background.paper,
      height: '100%',
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'block',
        gridArea: 'items',
        gridRowStart: 'span 50',
        visibility: 'hidden',
        padding: theme.spacings.md,
      },
      boxShadow: `-1px 0 ${theme.palette.divider}`,
      columnCount: 2,
    }),
    !!active && {
      visibility: {
        sm: 'hidden',
        md: 'visible',
      },
    },
  ]

  const listItemStyles: SxProps<Theme> = (theme) => ({
    display: 'grid',
    breakInside: 'avoid',
    ...theme.typography.body1,
    padding: 2,
  })

  const subListItemStyles: SxProps<Theme> = {
    padding: '2px 0',
    '& .sub-item-link': {
      color: 'unset',
    },
  }

  return (
    <ListItem sx={{ display: 'contents' }}>
      <MenuRootButton {...props} hasChildren={hasChildren} index={index} />
      <List sx={subMenuContainer} className='submenu-container'>
        {url_path && (
          <ListItem sx={listItemStyles}>
            <Link href={url_path} underline='none'>
              <Trans id='View all' /> {name && name?.toLocaleLowerCase()}
            </Link>
          </ListItem>
        )}

        {children?.map((child) =>
          child?.include_in_menu ? (
            <ListItem sx={listItemStyles} key={child?.name}>
              {child.url_path && (
                <Link href={child?.url_path} underline='none'>
                  {child?.name}
                </Link>
              )}
              {child?.children && child.children.length > 0 ? (
                <List>
                  {child.children?.map((subChild) =>
                    subChild?.include_in_menu ? (
                      <ListItem key={subChild?.name} sx={[listItemStyles, subListItemStyles]}>
                        {subChild.url_path && (
                          <Link
                            href={subChild?.url_path}
                            underline='none'
                            className='sub-item-link'
                          >
                            {subChild?.name}
                          </Link>
                        )}
                      </ListItem>
                    ) : null,
                  )}
                </List>
              ) : null}
            </ListItem>
          ) : null,
        )}
      </List>
    </ListItem>
  )
}
