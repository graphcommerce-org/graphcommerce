import { ProductListItemRenderer } from '@graphcommerce/magento-product'
import { breakpointVal, Overlay } from '@graphcommerce/next-ui'
import { LayoutHeaderClose } from '@graphcommerce/next-ui/Layout/components/LayoutHeaderClose'
import { Box, styled, useTheme } from '@mui/material'
import { useState } from 'react'
import { SearchOverlayCategories } from './SearchOverlayCategories'
import { SearchInput } from './SearchOverlayInput'
import { SearchOverlayProducts } from './SearchOverlayProducts'
import { useSearchOverlay, SearchOverlayProvider } from './SearchOverlayProvider'
import { SearchOverlaySuggestions } from './SearchOverlaySuggestions'
import { memoDeep } from '@graphcommerce/next-ui'

const SearchOverlayHeaderRoot = styled(Box, { name: 'SearchOverlayHeader', slot: 'Root' })(
  ({ theme }) => ({
    position: 'sticky',
    display: 'grid',
    top: 0,
    zIndex: 1,
    background: 'transparent',
    boxShadow: theme.shadows[4],
    height: theme.appShell.headerHeightSm,
    gap: theme.page.horizontal,
    paddingRight: theme.page.horizontal,
    alignItems: 'center',
    gridTemplateColumns: '1fr auto auto',
    [theme.breakpoints.up('md')]: {
      height: theme.appShell.appBarHeightMd,
    },
  }),
)

type SearchOverlayHeaderProps = {
  className?: string
  slotProps?: {
    root?: React.ComponentProps<typeof SearchOverlayHeaderRoot>
    input?: React.ComponentProps<typeof SearchOverlayHeaderInput>
    close?: React.ComponentProps<typeof LayoutHeaderClose>
  }
}

const SearchOverlayHeader = memoDeep((props: SearchOverlayHeaderProps) => {
  const { params, setClosed } = useSearchOverlay()
  const { className, slotProps } = props

  return (
    <SearchOverlayHeaderRoot className={className} {...slotProps?.root}>
      <SearchInput
        sx={(theme) => ({
          width: '100%',
          height: '100%',
          typography: 'h4',
          px: theme.page.horizontal,
          ...breakpointVal(
            'borderRadius',
            theme.shape.borderRadius * 3,
            theme.shape.borderRadius * 4,
            theme.breakpoints.values,
          ),
        })}
        inputSx={{ typography: 'h4', p: 0 }}
        autoFocus
        params={params}
        size='medium'
        {...slotProps?.input}
      />
      <LayoutHeaderClose onClose={setClosed} {...slotProps?.close} />
    </SearchOverlayHeaderRoot>
  )
})

const SearchOverlayBodyBase = styled('div', { name: 'SearchOverlayBodyBase' })(({ theme }) => ({
  padding: `0 ${theme.page.horizontal} ${theme.page.vertical}`,
  '&:empty': { display: 'none' },
}))

type SearchOverlayProps = {
  productListRenderer: ProductListItemRenderer
  slotProps?: {
    overlay?: Partial<React.ComponentProps<typeof Overlay>>
    header?: React.ComponentProps<typeof SearchOverlayHeader>
    body?: Partial<React.ComponentProps<typeof SearchOverlayBodyBase>>
    suggestions?: Partial<React.ComponentProps<typeof SearchOverlaySuggestions>>
    categories?: Partial<React.ComponentProps<typeof SearchOverlayCategories>>
    products?: Partial<React.ComponentProps<typeof SearchOverlayProducts>>
  }
}

export const SearchOverlay = memoDeep((props: SearchOverlayProps) => {
  const { productListRenderer, slotProps } = props
  const [open, setOpen] = useState(true)
  const theme = useTheme()

  return (
    <Overlay
      active={open}
      onClosed={() => setOpen(false)}
      variantMd='top'
      variantSm='bottom'
      sizeMd='floating'
      sizeSm='full'
      justifyMd='center'
      disableAnimation
      disableDrag
      widthMd={`min(${theme.breakpoints.values.lg}px, 100vw - ${theme.page.horizontal} * 2)`}
      bgColor='paper'
      {...slotProps?.overlay}
    >
      <SearchOverlayProvider open={open} setOpen={setOpen}>
        <SearchOverlayHeader {...slotProps?.header} />
        <SearchOverlayBodyBase {...slotProps?.body}>
          <SearchOverlaySuggestions {...slotProps?.suggestions} />
          <SearchOverlayCategories {...slotProps?.categories} />
          <SearchOverlayProducts
            productListRenderer={productListRenderer}
            {...slotProps?.products}
          />
        </SearchOverlayBodyBase>
      </SearchOverlayProvider>
    </Overlay>
  )
})
