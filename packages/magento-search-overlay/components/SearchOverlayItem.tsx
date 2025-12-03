import { sxx } from '@graphcommerce/next-ui'
import type { ListItemButtonProps } from '@mui/material'
import { alpha, ListItemButton } from '@mui/material'
import type { ElementType } from 'react'
import { forwardRef, memo } from 'react'
import { useSearchItem } from './SearchOverlayProvider'

export type SearchOverlayItemProps<C extends ElementType = 'li'> = ListItemButtonProps<
  C,
  { component?: C }
>

export const SearchOverlayItem = memo(
  forwardRef(
    <C extends ElementType = 'li'>(
      props: React.PropsWithoutRef<SearchOverlayItemProps<C>>,
      rootRef: React.Ref<C extends 'li' ? HTMLLIElement : HTMLAnchorElement>,
    ) => {
      const { sx, component, ...rest } = props

      const { getRootProps } = useSearchItem({ rootRef })

      return (
        <ListItemButton
          {...getRootProps()}
          component={component}
          sx={sxx(
            (theme) => ({
              px: theme.page.horizontal,
              mx: `calc(${theme.page.horizontal} * -1)`,
              '&.Mui-selected': {
                boxShadow: `inset 0 0 0 2px ${theme.palette.primary.main}`,
                backgroundColor: alpha(
                  theme.palette.background.paper,
                  theme.palette.action.selectedOpacity,
                ),
              },
            }),
            sx,
          )}
          {...rest}
        />
      )
    },
  ),
) as <C extends ElementType = 'li'>(
  props: SearchOverlayItemProps<C> & {
    ref?: React.Ref<C extends 'li' ? HTMLLIElement : HTMLAnchorElement>
  },
) => React.ReactNode
