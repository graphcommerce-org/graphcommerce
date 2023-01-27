import { useQuery } from '@graphcommerce/graphql'
import { Trans } from '@lingui/react'
import { Box, Container } from '@mui/material'
import { ProductListItems } from '../../ProductListItems/ProductListItems'
import { CompareListDocument } from '../graphql/CompareList.gql'
import { CurrentCompareUidDocument } from '../graphql/CurrentCompareUid.gql'

export function CompareList() {
  const { data: curCompareId } = useQuery(CurrentCompareUidDocument)

  const { data: compareListData } = useQuery(CompareListDocument, {
    variables: { uid: curCompareId?.currentCompareUid?.id ?? '' },
    fetchPolicy: 'network-only',
  })

  const gridColumns =
    compareListData?.compareList && compareListData?.compareList?.item_count <= 3
      ? compareListData?.compareList?.item_count
      : 3

  const array = compareListData?.compareList?.items?.slice(0, gridColumns)

  const compareListAttributes = compareListData?.compareList?.attributes

  const product = array?.map((i) => i?.product)

  return (
    <Container>
      <ProductListItems
        title='Compare items'
        items={product}
        size='small'
        sx={{
          gridTemplateColumns: { xs: `repeat(2, 1fr)`, md: `repeat(3, 1fr)`, lg: `repeat(3, 1fr)` },
        }}
      />
      <Box
        sx={(theme) => ({
          display: 'grid',
          gridTemplateColumns: { xs: `repeat(2, 1fr)`, md: `repeat(3, 1fr)`, lg: `repeat(3, 1fr)` },
          gridColumnGap: theme.spacings.md,
        })}
      >
        {array?.map((item) => (
          <Box key={item?.uid}>
            {compareListAttributes?.map((compareListAttribute) => (
              <>
                <Box>{compareListAttribute?.label}</Box>
                <Box>
                  {item?.attributes.map((attribute) =>
                    attribute?.code === compareListAttribute?.code ? (
                      <Box>{attribute?.value}</Box>
                    ) : null,
                  )}
                </Box>
              </>
            ))}
          </Box>
        ))}
      </Box>
    </Container>
  )
}
