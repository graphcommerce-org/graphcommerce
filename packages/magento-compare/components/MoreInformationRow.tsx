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
    <Box sx={{ gridColumn: { xs: `span 2`, md: `span 3`, lg: `span 3` } }}>
      <SectionContainer labelLeft={<Trans id='More information' />}>
        <Box
          sx={(theme) => ({
            ...compareListStyles,
          })}
        >
          {compareAbleItems?.map((item) => {
            if (!item?.product) return null
            return (
              <Button
                key={item.uid}
                variant='text'
                href={productLink(item?.product)}
                endIcon={<IconSvg key='icon' src={iconChevronRight} size='inherit' />}
                sx={{ justifySelf: 'baseline' }}
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
