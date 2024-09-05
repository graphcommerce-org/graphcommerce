import { alpha, ListItemButton, ListItemButtonProps } from '@mui/material'
import { forwardRef, ElementType, memo } from 'react'
import { useSearchItem } from './SearchOverlayProvider'

export type SearchOverlayItemProps<C extends ElementType = 'li'> = ListItemButtonProps<
  C,
  { component?: C }
>

export const SearchOverlayItem = memo(
  forwardRef(
    <C extends ElementType = 'li'>(
      props: SearchOverlayItemProps<C>,
      rootRef: React.Ref<C extends 'li' ? HTMLLIElement : HTMLAnchorElement>,
    ) => {
      const { sx, component, ...rest } = props

      const { getRootProps } = useSearchItem({ rootRef })

      return (
        <ListItemButton
          {...getRootProps()}
          component={component}
          sx={[
            (theme) => ({
              px: theme.page.horizontal,
              mx: `calc(${theme.page.horizontal} * -1)`,
              '&.Mui-selected': {
                boxShadow: `inset 0 0 0 2px ${theme.palette.secondary.main}`,
                backgroundColor: alpha(
                  theme.palette.background.paper,
                  theme.palette.action.selectedOpacity,
                ),
              },
            }),
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
          {...rest}
        />
      )
    },
  ),
) as <C extends ElementType = 'li'>(
  props: SearchOverlayItemProps<C> & {
    ref?: React.Ref<C extends 'li' ? HTMLLIElement : HTMLAnchorElement>
  },
) => JSX.Element
