import { useWatch } from '@graphcommerce/ecommerce-ui'
import {
  CategoryTreeItem,
  UseCategoryTreeProps,
  useCategoryTree,
} from '@graphcommerce/magento-category'
import {
  ActionCard,
  ActionCardAccordion,
  ActionCardAccordionProps,
  ActionCardList,
  Button,
  IconSvg,
  iconChevronLeft,
  responsiveVal,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, SxProps, Theme } from '@mui/material'
import { useProductFiltersPro } from './ProductFiltersPro'

export type ProductFiltersProCategoryAccordionProps = {
  hideTitle?: boolean
  sx?: SxProps<Theme>
  categoryTree: CategoryTreeItem[]
  onChange: (uid: CategoryTreeItem) => void | Promise<void>
} & Pick<ActionCardAccordionProps, 'defaultExpanded'>

export function ProductFiltersProCategoryAccordion(props: ProductFiltersProCategoryAccordionProps) {
  const { hideTitle, sx, categoryTree, onChange, defaultExpanded } = props
  const { form } = useProductFiltersPro()

  const name = `filters.category_uid.in` as const
  const currentFilter = useWatch({ control: form.control, name })

  return (
    <ActionCardAccordion
      sx={[
        hideTitle ? { '& .MuiAccordionSummary-root': { display: 'none' } } : {},
        sx,
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      defaultExpanded={defaultExpanded}
      summary={<Trans id='Categories' />}
      right={
        currentFilter && currentFilter.length > 0 ? (
          <Button
            color='primary'
            onClick={(e) => {
              e.stopPropagation()
              form.setValue(name, null)
            }}
          >
            <Trans id='Clear' />
          </Button>
        ) : undefined
      }
      details={
        <ActionCardList
          size='responsive'
          variant='default'
          sx={{ mb: 2 }}
          value={form.getValues('url')}
          onChange={async (e, value) => {
            const item = categoryTree.find((i) => i.value === value)
            if (!item) return
            await onChange(item)
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
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ marginRight: 1 }}>
                      {item.isBack ? (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <IconSvg src={iconChevronLeft} size='medium' />
                          {item.title}
                        </Box>
                      ) : (
                        item.title
                      )}
                    </Box>
                    {item.count !== null && (
                      <Box sx={{ typography: 'caption', color: 'text.disabled' }}>
                        ({item.count})
                      </Box>
                    )}
                  </Box>
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
    />
  )
}

export type ProductFiltersCategorySectionProps = UseCategoryTreeProps &
  Omit<ProductFiltersProCategoryAccordionProps, 'categoryTree' | 'onChange'>

export function ProductFiltersProCategorySection(props: ProductFiltersCategorySectionProps) {
  const categoryTree = useCategoryTree(props)
  const { form, submit } = useProductFiltersPro()

  if (!categoryTree) return null
  return (
    <ProductFiltersProCategoryAccordion
      categoryTree={categoryTree}
      {...props}
      onChange={async (item) => {
        form.setValue('url', item.value)
        form.setValue('filters', { category_uid: { in: [item?.uid] } })
        await submit()
      }}
    />
  )
}
