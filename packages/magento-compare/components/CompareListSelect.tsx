import { SelectElement } from '@graphcommerce/ecommerce-ui'
import { Box, FormControl } from '@mui/material'
import { useCompareList, useCompareListStyles } from '../hooks'
import { useCompareForm, useSelectedState } from './CompareForm'

export type CompareListSelectProps = object

export function CompareListSelect(props: CompareListSelectProps) {
  const compareList = useCompareList().data?.compareList
  const compareListCount = compareList?.item_count ?? 0
  const gridColumns = compareListCount <= 3 ? compareListCount : 3
  const compareAbleItems = compareList?.items ?? []

  console.log('CompareListSelect')

  const { control, selectedPrevious, setValue } = useCompareForm()

  const compareListStyles = useCompareListStyles(gridColumns)
  return (
    <Box
      sx={(theme) => ({
        px: { xs: theme.spacings.xs, md: theme.spacings.md, lg: theme.spacings.lg },
        py: theme.spacings.xxs,
        [theme.breakpoints.down('md')]: {
          boxShadow: 2,
        },
        background: theme.palette.background.paper,
        position: 'sticky',
        zIndex: 10,
        top: {
          xs: `calc(${theme.appShell.headerHeightSm} / 2)`,
          lg: `calc(${theme.page.vertical} / 2)`,
        },
        ...compareListStyles,
      })}
    >
      {[...Array(gridColumns).keys()].map((compareSelectIndex) => (
        <FormControl key={compareSelectIndex}>
          <SelectElement
            control={control}
            name={`selected.${compareSelectIndex}`}
            options={compareAbleItems.map((i, id) => ({
              id,
              label: i?.product?.name ?? '',
            }))}
            size='small'
            onChange={(to) => {
              const from = selectedPrevious.current?.[compareSelectIndex]
              const found = selectedPrevious.current?.indexOf(Number(to))
              if (found > -1) setValue(`selected.${found}`, from)
            }}
          />
        </FormControl>
      ))}
    </Box>
  )
}
