import { ListItem, ListItemButton, ListItemButtonProps, ListItemText } from '@mui/material'
import PageLink, { LinkProps as PageLinkProps } from 'next/link'
import { useRouter } from 'next/router'

export type MegaMenuItemProps = Omit<ListItemButtonProps<'a'>, 'href' | 'button'> &
  Pick<PageLinkProps, 'href'> & { open: string }

export function MegaMenuItem(props: MegaMenuItemProps) {
  const { href, children, sx = [], open, ...listItemProps } = props
  const hrefString = href.toString()
  const path = useRouter().asPath.split('?')[0]
  const active = hrefString === '/' ? path === hrefString : path.startsWith(hrefString)

  return (
    <PageLink key={href.toString()} href={href} passHref>
      <ListItem sx={{ display: 'contents' }}>
        <ListItemButton
          component='a'
          dense
          selected={active}
          {...listItemProps}
          sx={[
            { gridColumnStart: 1 },
            open.includes('/#') && {
              display: 'none',
            },
          ]}
        >
          <ListItemText
            sx={[{ typography: 'h3' }, ...(Array.isArray(sx) ? sx : [sx])]}
            disableTypography
            primary={children}
          />
        </ListItemButton>
      </ListItem>
    </PageLink>
  )
}
