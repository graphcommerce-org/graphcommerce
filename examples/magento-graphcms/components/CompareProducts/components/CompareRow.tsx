import { SectionContainer } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import { CompareListQuery } from '../graphql/CompareList.gql'
import { useCompareListStyles } from '../hooks/useCompareGridStyles'

export type ComparelistItems = NonNullable<CompareListQuery['compareList']>['items']

type CompareRowProps = {
  compareAbleItems: ComparelistItems
  attribute: {
    code: string
    label: string
  } | null
}

export function CompareRow(props: CompareRowProps) {
  const { attribute, compareAbleItems } = props
  let columnCount: number

  if (compareAbleItems) {
    columnCount = compareAbleItems.length <= 3 ? compareAbleItems.length : 3
  } else {
    columnCount = 0
  }
  const compareListStyles = useCompareListStyles(columnCount)

  return (
    <Box
      sx={{
        gridColumn: { xs: `span 2`, md: `span 3`, lg: `span 3` },
      }}
    >
      <SectionContainer labelLeft={attribute?.label}>
        <Box
          sx={(theme) => ({
            ...compareListStyles,
            mb: theme.spacings.lg,
          })}
        >
          {compareAbleItems?.map((item) => (
            <Box
              key={item?.uid}
              dangerouslySetInnerHTML={{
                __html:
                  item?.attributes.find((itemAttribute) => itemAttribute?.code === attribute?.code)
                    ?.value ?? '',
              }}
            />
          ))}
        </Box>
      </SectionContainer>
    </Box>
  )
}
