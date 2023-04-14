import { SelectElement } from '@graphcommerce/ecommerce-ui'
import { Box, FormControl, SxProps, Theme } from '@mui/material'
import { useCompareList, useCompareListStyles } from '../hooks'
import { useCompareForm } from './CompareListForm'

export type CompareListSelectProps = {
  bgColor?: 'default' | 'paper'
  sx?: SxProps<Theme>
}

export function CompareListSelect(props: CompareListSelectProps) {
  const { bgColor = 'paper', sx = [] } = props

  const compareList = useCompareList().data?.compareList
  const compareListCount = compareList?.item_count ?? 0
  const gridColumns = compareListCount <= 3 ? compareListCount : 3
  const compareAbleItems = compareList?.items ?? []

  const { control, selectedPrevious, setValue } = useCompareForm()

  const compareListStyles = useCompareListStyles()
  return (
    <Box
      sx={[
        (theme) => ({
          py: theme.spacings.xxs,
          mx: `calc(${theme.page.horizontal} * -1)`,
          px: theme.page.horizontal,
          [theme.breakpoints.up('lg')]: {
            mx: `calc(${theme.spacings.lg} * -1)`,
            px: theme.spacings.lg,
          },
          background: theme.palette.background[bgColor],
          position: 'sticky',
          zIndex: 10,
          top: {
            xs: `calc(${theme.appShell.headerHeightSm} / 2)`,
            lg: `calc(${theme.page.vertical} / 2)`,
          },
          ...compareListStyles,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
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
