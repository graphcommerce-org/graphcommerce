import { SectionContainer } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import { ComparableItemFragment } from '../graphql/ComparableItem.gql'
import { useCompareListStyles } from '../hooks/useCompareListStyles'

export type CompareRowProps = {
  compareAbleItems: ComparableItemFragment[]
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
    <Box>
      <SectionContainer
        labelLeft={attribute?.label}
        sx={(theme) => ({
          '& .SectionHeader-root': {
            justifyContent: 'center',
            '& > .MuiTypography-root': {
              width: `calc(calc(calc(100% / 3) * ${columnCount}) + ${
                columnCount > 1 ? theme.spacings.md : '0px'
              })`,
            },
          },
        })}
      >
        <Box sx={[compareListStyles, (theme) => ({ mb: theme.spacings.lg })]}>
          {compareAbleItems?.map((item, idx) => (
            <Box
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
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
