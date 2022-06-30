import { Box, SxProps, Theme } from '@mui/material'
import { useContext } from 'react'
import { extendableComponent } from '../../Styles/extendableComponent'
import { NavigationContext } from '../hooks/useNavigation'
import { NavigationItem } from './NavigationItem'

const parts = ['root', 'column'] as const
const { classes } = extendableComponent('Navigation', parts)

type NavigationBaseProps = {
  sx?: SxProps<Theme>
  onItemClick: () => void
}

export function NavigationBase(props: NavigationBaseProps) {
  const { sx = [], onItemClick } = props
  const { items, path } = useContext(NavigationContext)

  return (
    <Box
      className={classes.root}
      sx={[
        {
          display: 'grid',
          gridAutoFlow: 'column',
          scrollSnapAlign: 'end',
          '& > ul > li > a, & > ul > li > [role=button]': {
            '& span': {
              typography: 'h2',
            },
            // '& svg': { display: 'none' },
          },
          '& .Navigation-column': {
            boxShadow: (theme) => `inset 1px 0 ${theme.palette.divider}`,
          },
          '& .NavigationItem-item': {
            mx: (theme) => theme.spacings.md,
            whiteSpace: 'nowrap',
          },
          '& .NavigationItem-item.first': {
            // mt: (theme) => theme.spacings.md,
          },
          '& .Navigation-column:first-of-type': {
            boxShadow: 'none',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {path.length >= 0 && <Box sx={{ gridArea: '1 / 1 / 999 / 2' }} className={classes.column} />}
      {path.length >= 1 && <Box sx={{ gridArea: '1 / 2 / 999 / 3' }} className={classes.column} />}
      {path.length >= 2 && <Box sx={{ gridArea: '1 / 3 / 999 / 4' }} className={classes.column} />}
      {path.length >= 3 && <Box sx={{ gridArea: '1 / 4 / 999 / 5' }} className={classes.column} />}

      <Box sx={{ display: 'contents' }} component='ul'>
        {items.map((item, idx) => (
          <NavigationItem
            key={item.id}
            {...item}
            parentPath={[]}
            row={idx + 1}
            childItemsCount={items.length}
            onItemClick={onItemClick}
          />
        ))}
      </Box>
    </Box>
  )
}
