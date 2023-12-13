import { FormAutoSubmit, FormProvider } from '@graphcommerce/ecommerce-ui'
import { extendableComponent, StickyBelowHeader } from '@graphcommerce/next-ui'
import { Box, Container, Theme, useMediaQuery } from '@mui/material'
import React from 'react'
import { useProductFiltersPro } from './ProductFiltersPro'

export type ProductFiltersProLayoutSidebarProps = {
  items: React.ReactNode
  clearAll?: React.ReactNode
  horizontalFilters: React.ReactNode
  sidebarFilters?: React.ReactNode
  count?: React.ReactNode
  pagination: React.ReactNode
  header?: React.ReactNode
} & Partial<OwnerProps>

type OwnerProps = {
  headerPosition: 'before'
}

const name = 'ProductFiltersProLayoutSidebar' as const
const parts = ['root', 'content'] as const
const { withState } = extendableComponent<OwnerProps, typeof name, typeof parts>(name, parts)

export function ProductFiltersProLayoutSidebar(props: ProductFiltersProLayoutSidebarProps) {
  const {
    items,
    clearAll,
    horizontalFilters,
    count,
    pagination,
    sidebarFilters,
    header,
    headerPosition = 'before',
  } = props

  const { form } = useProductFiltersPro()
  const classes = withState({ headerPosition })

  // We only need to auto-submit when the layout is not sidebar and we're viewing on desktop
  const m = useMediaQuery<Theme>((t) => t.breakpoints.down('md'), { defaultMatches: false })
  const autoSubmitDisabled = m

  return (
    <FormProvider {...form}>
      {headerPosition === 'before' ? header : null}

      <FormAutoSubmit disabled={autoSubmitDisabled} />

      <StickyBelowHeader sx={{ display: { md: 'none' } }}>{horizontalFilters}</StickyBelowHeader>

      <Container
        maxWidth={false}
        className={classes.content}
        sx={(theme) => ({
          display: 'grid',
          gridTemplate: {
            xs: `
              "beforeContent" auto
              "items"         auto
              "afterContent"  auto
            `,
            md: `
              "topleft beforeContent" auto
              "sidebar items"         min-content
              "sidebar afterContent"  1fr
              /300px   auto
            `,
          },

          columnGap: { md: theme.spacings.md, xl: theme.spacings.xxl },

          '& .ProductListItemsBase-root.sizeNormal': {
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
              xl: 'repeat(4, 1fr)',
            },
          },
        })}
      >
        <Box gridArea='topleft' sx={{ display: { xs: 'none', md: 'block' }, alignSelf: 'center' }}>
          {clearAll}
        </Box>
        {sidebarFilters && (
          <Box gridArea='sidebar' sx={{ display: { xs: 'none', md: 'block' } }}>
            {sidebarFilters}
          </Box>
        )}

        <Box gridArea='beforeContent' sx={{ mt: { md: 0 } }}>
          {count}
        </Box>
        <Box gridArea='items'>{items}</Box>

        {pagination && <Box gridArea='afterContent'>{pagination}</Box>}
      </Container>
    </FormProvider>
  )
}
