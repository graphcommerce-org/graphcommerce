import { productLink, useProductLink } from '@graphcommerce/magento-product'
import { Button, iconChevronRight, IconSvg, SectionContainer } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box } from '@mui/material'
import { ComparelistItems } from './CompareRow'

type MoreInformationRowProps = {
  compareAbleItems: ComparelistItems
}

export function MoreInformationRow(props: MoreInformationRowProps) {
  const { compareAbleItems } = props

  return (
    <Box sx={{ gridColumn: { xs: `span 2`, md: `span 3`, lg: `span 3` } }}>
      <SectionContainer labelLeft={<Trans id='More information' />}>
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
          {compareAbleItems?.map((item, idx) => {
            if (!item?.product) return null
            return (
              <Button
                key={idx}
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
