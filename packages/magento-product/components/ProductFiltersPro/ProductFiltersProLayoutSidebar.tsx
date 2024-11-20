import { FormAutoSubmit } from '@graphcommerce/ecommerce-ui'
import { extendableComponent, StickyBelowHeader } from '@graphcommerce/next-ui'
import type { Theme } from '@mui/material'
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { Box, Container, useMediaQuery } from '@mui/material'
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
  children?: React.ReactNode
} & Partial<OwnerProps>

type OwnerProps = {
  headerPosition: 'before'
}

const name = 'ProductFiltersProLayoutSidebar'
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
    children,
  } = props

  const { form, submit } = useProductFiltersPro()
  const classes = withState({ headerPosition })

  // We only need to auto-submit when the layout is not sidebar and we're viewing on desktop
  const m = useMediaQuery<Theme>((t) => t.breakpoints.down('md'), { defaultMatches: false })
  const autoSubmitDisabled = m

  return (
    <>
      {headerPosition === 'before' ? header : null}

      <FormAutoSubmit control={form.control} disabled={autoSubmitDisabled} submit={submit} />

      <Container
        maxWidth={false}
        className={classes.content}
        sx={(theme) => ({
          display: 'grid',
          gridTemplate: {
            xs: `
              "content"           auto
              "horizontalFilters" auto
              "beforeContent"     auto
              "items"             auto
              "afterContent"      auto
            `,
            md: ` 
              "topleft content"   auto
              "sidebar content"   auto
              "sidebar beforeContent" auto
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
        {children && <Box gridArea='content'>{children}</Box>}
        <StickyBelowHeader sx={{ display: { md: 'none', gridArea: 'horizontalFilters' } }}>
          {horizontalFilters}
        </StickyBelowHeader>

        <Box gridArea='beforeContent' sx={{ mt: { md: 0 } }}>
          {count}
        </Box>
        <Box gridArea='items'>{items}</Box>

        {pagination && <Box gridArea='afterContent'>{pagination}</Box>}
      </Container>
    </>
  )
}
