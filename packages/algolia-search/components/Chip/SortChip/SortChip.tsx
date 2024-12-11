import {
  ChipMenu,
  extendableComponent,
  responsiveVal,
  useStorefrontConfig,
} from '@graphcommerce/next-ui'
import type { SxProps, Theme } from '@mui/material'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { useSortBy } from 'react-instantsearch-hooks-web'

const name = 'SortChip'
const parts = ['menu', 'item'] as const
const { classes } = extendableComponent(name, parts)

export type SortByItem = {
  value: string
  label: string
}

export type SortByRenderState = {
  initialIndex?: string
  currentRefinement: string
  options: SortByItem[]
  refine: (value: string) => void
  canRefine: boolean
}

export type SortChipProps = {
  title: string
  sx?: SxProps<Theme>
}

export function SortChip(props: SortChipProps) {
  const { title, sx } = props

  const { initialIndex, currentRefinement, options, refine, canRefine } = useSortBy({
    items: useStorefrontConfig().sortOptions ?? [],
  })

  if (options.length < 1) return null

  const selectedOption = options.find((option) => option.value === currentRefinement)

  return (
    <ChipMenu
      className={classes.menu}
      variant='outlined'
      selected={Boolean(selectedOption)}
      label={title}
      selectedLabel={selectedOption ? selectedOption.label : title}
      onDelete={
        selectedOption ? () => canRefine && refine(initialIndex ?? options[0].value) : undefined
      }
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
        {options.map((option) => (
          <ListItem className={classes.item} key={option?.value ?? ''} dense>
            <ListItemText
              onClick={() => {
                refine(option?.value)
              }}
            >
              {option?.label}
              <Checkbox
                edge='start'
                checked={Boolean(options.find((o) => o.value === selectedOption?.value))}
                tabIndex={-1}
                size='medium'
                color='primary'
                disableRipple
                inputProps={{ 'aria-labelledby': `sort-${option?.value}` }}
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
