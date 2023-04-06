import { ChipMenu, extendableComponent, responsiveVal } from '@graphcommerce/next-ui'
import { Box, ListItem, ListItemText, Checkbox, SxProps, Theme } from '@mui/material'
import {
  useClearRefinements,
  UseClearRefinementsProps,
  useRefinementList,
  UseRefinementListProps,
} from 'react-instantsearch-hooks'

const name = 'ProductListSort' as const
const parts = ['menu', 'item', 'link'] as const
const { classes } = extendableComponent(name, parts)

type FilterChipProps = UseRefinementListProps &
  UseClearRefinementsProps & {
    title: string
  } & { sx?: SxProps<Theme> }

export function FilterChip(props: FilterChipProps) {
  const { title, sx, attribute } = props
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { items, refine } = useRefinementList({
    attribute,
    sortBy: ['name:asc'],
  })
  const clearRefinementApi = useClearRefinements({
    includedAttributes: [attribute],
  })
  const selectedOptions = items.filter((option) => option.isRefined).map((option) => option.label)

  return (
    <ChipMenu
      className={classes.menu}
      variant='outlined'
      selected={selectedOptions.length > 0}
      label={title}
      selectedLabel={selectedOptions.length ? selectedOptions.join(', ') : title}
      onDelete={selectedOptions.length > 0 ? () => clearRefinementApi.refine() : undefined}
      sx={Array.isArray(sx) ? sx : [sx]}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(1, minmax(0, 1fr))', md: 'repeat(2, 1fr)' },
          columnGap: responsiveVal(2, 10),
          minWidth: 0,
        }}
      >
        {items.map((option) => (
          <ListItem className={classes.item} button key={option?.value ?? ''} dense>
            <ListItemText
              onClick={() => {
                refine(option?.value)
              }}
            >
              {option?.label} <span>({option?.count})</span>
              <Checkbox
                edge='start'
                checked={option?.isRefined}
                tabIndex={-1}
                size='medium'
                color='primary'
                disableRipple
                inputProps={{ 'aria-labelledby': `filter-equal-${attribute}-${option?.value}` }}
                sx={[
                  {
                    padding: 0,
                    margin: '0 0 0 0',
                    float: 'right',
                  },
                ]}
              />
            </ListItemText>
          </ListItem>
        ))}
      </Box>
    </ChipMenu>
  )
}
