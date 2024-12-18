import { useMotionValueValue } from '@graphcommerce/framer-utils'
import type { ProductListItemRenderer } from '@graphcommerce/magento-product'
import { MediaQuery, Overlay } from '@graphcommerce/next-ui'
import { Box, useTheme } from '@mui/material'
import { SearchOverlayBodyBase } from './SearchOverlayBodyBase'
import { SearchOverlayCategories } from './SearchOverlayCategories'
import { SearchOverlayHeader } from './SearchOverlayHeader'
import { SearchOverlayProducts } from './SearchOverlayProducts'
import { searchOverlayIsOpen, SearchOverlayProvider } from './SearchOverlayProvider'
import { SearchOverlaySuggestions } from './SearchOverlaySuggestions'

export type SearchOverlayProps = {
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

export function SearchOverlay(props: SearchOverlayProps) {
  const { productListRenderer, slotProps } = props
  const open = useMotionValueValue(searchOverlayIsOpen, (v) => v)
  const theme = useTheme()

  return (
    <Overlay
      active={open}
      onClosed={() => searchOverlayIsOpen.set(false)}
      variantMd='top'
      variantSm='bottom'
      sizeMd='floating'
      sizeSm='full'
      justifyMd='center'
      disableAnimation
      disableDrag
      widthMd={`min(${theme.breakpoints.values.lg}px, 100vw - ${theme.page.horizontal} * 2)`}
      bgColor='paper'
      className='SearchOverlay-root'
      {...slotProps?.overlay}
    >
      <SearchOverlayProvider open={open}>
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
}
