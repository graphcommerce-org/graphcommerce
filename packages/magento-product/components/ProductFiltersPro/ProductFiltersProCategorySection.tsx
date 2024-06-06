import { UseCategoryTreeProps, useCategoryTree } from '@graphcommerce/magento-category'
import {
  ActionCard,
  ActionCardAccordion,
  ActionCardList,
  IconSvg,
  iconChevronLeft,
  useIconSvgSize,
  responsiveVal,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, SxProps, Theme } from '@mui/material'
import { useRouter } from 'next/router'

export type ProductFiltersCategorySectionProps = UseCategoryTreeProps & {
  hideTitle?: boolean
  sx?: SxProps<Theme>
}

export function ProductFiltersProCategorySection(props: ProductFiltersCategorySectionProps) {
  const { hideTitle, sx } = props
  const router = useRouter()
  const categoryTree = useCategoryTree(props)

  if (!categoryTree) return null

  const size = useIconSvgSize('medium')

  return (
    <ActionCardAccordion
      sx={[
        hideTitle ? { '& .MuiAccordionSummary-root': { display: 'none' } } : {},
        sx,
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      defaultExpanded
      summary={<Trans id='Categories' />}
      details={
        <ActionCardList value='cat' variant='default'>
          {categoryTree.map((item) => (
            <ActionCard
              {...item}
              title={
                item.isBack ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconSvg src={iconChevronLeft} size='medium' />
                    {item.title}
                  </Box>
                ) : (
                  item.title
                )
              }
              sx={[
                item.isBack ? {} : {},
                {
                  '&.sizeSmall': { pl: responsiveVal(8 * item.indent, 12 * item.indent) },
                  '&.sizeMedium': { pl: responsiveVal(10 * item.indent, 14 * item.indent) },
                  '&.sizeLarge': { pl: responsiveVal(12 * item.indent, 16 * item.indent) },
                  '&.sizeResponsive': { pl: responsiveVal(8 * item.indent, 16 * item.indent) },
                },
              ]}
              value={item.href}
              key={item.href}
              selected={item.selected}
              onClick={() => router.push(item.href)}
            />
          ))}
        </ActionCardList>
      }
      right={undefined}
    />
  )
}
