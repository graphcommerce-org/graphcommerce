import { productLink } from '@graphcommerce/magento-product'
import { Button, iconChevronRight, IconSvg, SectionContainer } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box } from '@mui/material'
import { useCompareListStyles } from '../hooks/useCompareListStyles'
import { CompareRowProps } from './CompareRow'

type MoreInformationRowProps = Pick<CompareRowProps, 'compareAbleItems'>

export function MoreInformationRow(props: MoreInformationRowProps) {
  const { compareAbleItems } = props
  const columnCount = compareAbleItems.length <= 3 ? compareAbleItems.length : 3

  const compareListStyles = useCompareListStyles()

  return (
    <Box>
      <SectionContainer
        labelLeft={<Trans id='More information' />}
        sx={(theme) => ({
          '& .SectionHeader-root': {
            justifyContent: 'center',
            borderBottom: 'none',
            pb: 0,
            '& > .MuiTypography-root': {
              pb: theme.spacings.xxs,
              borderBottom: `1px solid ${theme.palette.divider}`,
              width: `calc(calc(calc(100% / 3) * ${columnCount}) + ${
                columnCount > 1 ? theme.spacings.md : '0px'
              })`,
            },
          },
        })}
      >
        <Box sx={compareListStyles}>
          {compareAbleItems?.map((item) => {
            if (!item?.product) return null
            return (
              <Box key={item.uid}>
                <Button
                  variant='inline'
                  href={productLink(item?.product)}
                  endIcon={<IconSvg key='icon' src={iconChevronRight} size='inherit' />}
                  sx={{ justifyContent: 'flex-start' }}
                >
                  <Trans id='View Product' />
                </Button>
              </Box>
            )
          })}
        </Box>
      </SectionContainer>
    </Box>
  )
}
