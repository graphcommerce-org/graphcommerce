import { productLink } from '@graphcommerce/magento-product'
import { Button, iconChevronRight, IconSvg, SectionContainer } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box } from '@mui/material'
import { useCompareListStyles } from '../hooks/useCompareGridStyles'
import { ComparelistItems } from './CompareRow'

type MoreInformationRowProps = {
  compareAbleItems: ComparelistItems
}

export function MoreInformationRow(props: MoreInformationRowProps) {
  const { compareAbleItems } = props
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
        labelLeft={<Trans id='More information' />}
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
        <Box sx={{ ...compareListStyles }}>
          {compareAbleItems?.map((item) => {
            if (!item?.product) return null
            return (
              <Button
                key={item.uid}
                variant='text'
                href={productLink(item?.product)}
                endIcon={<IconSvg key='icon' src={iconChevronRight} size='inherit' />}
                sx={{ justifyContent: 'flex-start' }}
              >
                <Trans id='View Product' />
              </Button>
            )
          })}
        </Box>
      </SectionContainer>
    </Box>
  )
}
