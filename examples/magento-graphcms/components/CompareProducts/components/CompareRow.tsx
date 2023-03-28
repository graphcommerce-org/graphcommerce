import { SectionContainer } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import { CompareListQuery } from '../graphql/CompareList.gql'

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
  return (
    <Box
      sx={{
        gridColumn: { xs: `span 2`, md: `span 3`, lg: `span 3` },
      }}
    >
      <SectionContainer labelLeft={attribute?.label}>
        <Box
          sx={(theme) => ({
            display: 'grid',
            gridTemplateColumns: {
              xs: `repeat(2, 1fr)`,
              md: `repeat(3, 1fr)`,
              lg: `repeat(3, 1fr)`,
            },
            gridColumnGap: theme.spacings.md,
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
