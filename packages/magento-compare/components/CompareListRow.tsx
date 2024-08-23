import { SectionContainer } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'
import { ComparableItemFragment } from '../graphql'
import { useCompareListStyles } from '../hooks/useCompareListStyles'

export type CompareRowProps = {
  compareAbleItems: ComparableItemFragment[]
  attribute: {
    code: string
    label: string
  } | null
}

export function CompareListRow(props: CompareRowProps) {
  const { attribute, compareAbleItems } = props
  const columnCount = compareAbleItems.length <= 3 ? compareAbleItems.length : 3

  const compareListStyles = useCompareListStyles()

  return (
    <Box>
      <SectionContainer
        labelLeft={attribute?.label}
        sx={(theme) => ({
          '& .SectionHeader-root': {
            justifyContent: 'center',
            borderBottom: 'none',
            pb: 0,
            '& > .MuiTypography-root': {
              pb: theme.spacings.xxs,
              borderBottom: `1px solid ${theme.vars.palette.divider}`,
              width: `calc(calc(calc(100% / 3) * ${columnCount}) + ${
                columnCount > 1 ? theme.spacings.md : '0px'
              })`,
              [theme.breakpoints.down('md')]: {
                width: '100%',
              },
            },
          },
        })}
      >
        <Box sx={[compareListStyles, (theme) => ({ mb: theme.spacings.lg })]}>
          {compareAbleItems?.map((item, idx) => (
            <Box
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              sx={{
                '& > p:first-of-type': { marginTop: 0 },
                '& > p:last-of-type': { marginBottom: 0 },
              }}
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
