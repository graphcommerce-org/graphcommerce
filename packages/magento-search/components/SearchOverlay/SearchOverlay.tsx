import { ProductListItemRenderer } from '@graphcommerce/magento-product'
import { Overlay } from '@graphcommerce/next-ui'
import { useTheme } from '@mui/material'
import { useState } from 'react'
import { SearchOverlayBodyBase } from './SearchOverlayBodyBase'
import { SearchOverlayCategories } from './SearchOverlayCategories'
import { SearchOverlayHeader } from './SearchOverlayHeader'
import { SearchOverlayProducts } from './SearchOverlayProducts'
import { SearchOverlayProvider } from './SearchOverlayProvider'
import { SearchOverlaySuggestions } from './SearchOverlaySuggestions'
import { useOpenWithShortKey } from './useOpenWithShortKey'

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

export function SearchOverlay(props: SearchOverlayProps) {
  const { productListRenderer, slotProps } = props
  const [open, setOpen] = useState(false)
  const theme = useTheme()
  useOpenWithShortKey(setOpen)

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
      smSpacingTop={() => `6px`}
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
}
