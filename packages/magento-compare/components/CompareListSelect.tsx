import { SelectElement } from '@graphcommerce/ecommerce-ui'
import { useMotionValueValue } from '@graphcommerce/framer-utils'
import { useScrollY } from '@graphcommerce/next-ui'
import { Box, Container, FormControl, SxProps, Theme, useTheme } from '@mui/material'
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
  const theme2 = useTheme()
  const scrollY = useScrollY()
  const scrolled = useMotionValueValue(scrollY, (y) => ({
    xs:
      y >
      parseInt(theme2.appShell.headerHeightSm, 10) -
        parseInt(theme2.appShell.headerHeightSm, 10) * 0.5,
    md: y > parseInt(theme2.appShell.headerHeightSm, 10),
  }))

  return (
    <Box
      sx={[
        (theme) => ({
          pt: 1,
          pb: theme.spacings.xxs,
          background: theme.vars.palette.background[bgColor],
          position: 'sticky',
          zIndex: 10,
          top: {
            xs: `calc(${theme.appShell.headerHeightSm} / 2)`,
            lg: theme.page.vertical,
          },
          boxShadow: {
            xs: scrolled.xs ? theme.shadows[1] : 'none',
            md: scrolled.md ? theme.shadows[1] : 'none',
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Container sx={{ ...compareListStyles }}>
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
      </Container>
    </Box>
  )
}
