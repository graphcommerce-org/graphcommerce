import { UseCategoryTreeProps, useCategoryTree } from '@graphcommerce/magento-category'
import {
  ActionCard,
  ActionCardAccordion,
  ActionCardList,
  ActionCardListForm,
  ActionCardProps,
  IconSvg,
  iconChevronLeft,
  responsiveVal,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, SxProps, Theme } from '@mui/material'
import { useProductFiltersPro } from './ProductFiltersPro'

export type ProductFiltersCategorySectionProps = UseCategoryTreeProps & {
  hideTitle?: boolean
  sx?: SxProps<Theme>
}

export function ProductFiltersProCategorySection(props: ProductFiltersCategorySectionProps) {
  const { hideTitle, sx } = props
  const categoryTree = useCategoryTree(props)
  const { form, submit } = useProductFiltersPro()

  if (!categoryTree) return null

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
        <ActionCardList
          size='responsive'
          variant='default'
          value={form.getValues('url')}
          onChange={async (e, value) => {
            const item = categoryTree.find((i) => i.value === value)
            if (!item) return

            form.setValue('url', item.value)
            form.setValue('filters', { category_uid: { in: [item?.uid] } })
            await submit()
          }}
        >
          {categoryTree.map((item) => {
            const indent = item.isBack ? 0 : item.indent + 1
            return (
              <ActionCard
                key={item.value}
                {...item}
                size='responsive'
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
                sx={{
                  '&.sizeSmall': { pl: responsiveVal(8 * indent, 12 * indent) },
                  '&.sizeMedium': { pl: responsiveVal(10 * indent, 14 * indent) },
                  '&.sizeLarge': { pl: responsiveVal(12 * indent, 16 * indent) },
                  '&.sizeResponsive': { pl: responsiveVal(8 * indent, 16 * indent) },
                  '& .ActionCard-title.selected': { fontWeight: 'bold' },
                }}
              />
            )
          })}
        </ActionCardList>
      }
      right={undefined}
    />
  )
}
