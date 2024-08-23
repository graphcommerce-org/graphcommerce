import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { Box, SxProps, Theme } from '@mui/material'
import { useCompareList } from '../hooks/useCompareList'
import { useCompareVisibleItems } from './CompareListForm'
import { CompareListRow } from './CompareListRow'
import { CompareListRowMoreInformation } from './CompareListRowMoreInformation'

export type CompareListAttributesProps = {
  sx?: SxProps<Theme>
}

export function CompareListAttributes(props: CompareListAttributesProps) {
  const { sx } = props
  const compareList = useCompareList()
  const compareListAttributes = filterNonNullableKeys(compareList.data?.compareList?.attributes)
  const items = useCompareVisibleItems()

  return (
    <Box
      sx={[
        (theme) => ({
          bgcolor: theme.vars.palette.background.default,
          '& :first-of-type > div': {
            mt: 0,
          },
          mx: `calc(${theme.page.horizontal} * -1)`,
          py: theme.spacings.md,
          px: theme.page.horizontal,
          [theme.breakpoints.up('lg')]: {
            borderRadius: theme.shape.borderRadius * 1.5,
            mx: `calc(${theme.spacings.lg} * -1)`,
            p: theme.spacings.lg,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {compareListAttributes.map((attribute) => (
        <CompareListRow compareAbleItems={items} attribute={attribute} key={attribute?.code} />
      ))}

      <CompareListRowMoreInformation compareAbleItems={items} />
    </Box>
  )
}
