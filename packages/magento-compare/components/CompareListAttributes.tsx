import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { Box, SxProps, Theme } from '@mui/material'
import { useCompareList } from '../hooks/useCompareList'
import { useCompareVisibleItems } from './CompareForm'
import { CompareRow } from './CompareRow'
import { MoreInformationRow } from './MoreInformationRow'

type CompareListAttributesProps = {
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
          backgroundColor: theme.palette.background.default,
          py: theme.spacings.md,
          px: {
            xs: theme.spacings.xs,
            md: theme.spacings.md,
            lg: theme.spacings.lg,
          },
          [theme.breakpoints.up('md')]: {
            mb: theme.spacings.md,
            borderRadius: theme.shape.borderRadius * 1.5,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {compareListAttributes.map((attribute) => (
        <CompareRow compareAbleItems={items} attribute={attribute} key={attribute?.code} />
      ))}

      <MoreInformationRow compareAbleItems={items} />
    </Box>
  )
}
