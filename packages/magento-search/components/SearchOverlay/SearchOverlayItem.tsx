import { useMenuItem } from '@mui/base'
import { ListItemButton, ListItemButtonProps } from '@mui/material'
import { forwardRef, ElementType } from 'react'

type SearchOverlayItemProps<C extends ElementType = 'li'> = ListItemButtonProps<
  C,
  { component?: C }
>

const SearchOverlayItem = forwardRef(
  <C extends ElementType = 'li'>(
    props: SearchOverlayItemProps<C>,
    rootRef: React.Ref<C extends 'li' ? HTMLLIElement : HTMLAnchorElement>,
  ) => {
    const { sx, component, ...rest } = props
    const { getRootProps } = useMenuItem({ rootRef })

    return (
      <ListItemButton
        {...getRootProps()}
        component={component}
        sx={[
          (theme) => ({
            px: theme.page.horizontal,
            mx: `calc(${theme.page.horizontal} * -1)`,
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...rest}
      />
    )
  },
) as <C extends ElementType = 'li'>(
  props: SearchOverlayItemProps<C> & {
    ref?: React.Ref<C extends 'li' ? HTMLLIElement : HTMLAnchorElement>
  },
) => JSX.Element

const SearchOverlayItemWithRef = SearchOverlayItem as typeof SearchOverlayItem & {
  displayName?: string
}

SearchOverlayItemWithRef.displayName = 'SearchOverlayItem'

export { SearchOverlayItemWithRef as SearchOverlayItem }
