import {
  ProductListParams,
  ProductListQuery,
  ProductFiltersPro,
  toProductListParams,
} from '@graphcommerce/magento-product'
import { Overlay } from '@graphcommerce/next-ui'
import { useMenu, MenuProvider } from '@mui/base/useMenu'
import { alpha, Box } from '@mui/material'
import React, { createContext, useContext, ReactNode, useState, useMemo, useCallback } from 'react'
import { useProductList } from '../../hooks/useProductList'

type SearchOverlayContextType = {
  params: ProductListParams
  setParams: React.Dispatch<React.SetStateAction<ProductListParams>>
  products: ProductListQuery['products']
  setClosed: () => void
  resetFocus: () => void
}

const SearchOverlayContext = createContext<SearchOverlayContextType | undefined>(undefined)

export function useSearchOverlay() {
  const context = useContext(SearchOverlayContext)
  if (context === undefined) {
    throw new Error('useSearchOverlay must be used within a SearchOverlayProvider')
  }
  return context
}

type SearchOverlayProviderProps = {
  children: ReactNode
  open: boolean
  setOpen: (open: boolean) => void
}

export function SearchOverlayProvider({ children, open, setOpen }: SearchOverlayProviderProps) {
  const [params, setParams] = useState<ProductListParams>({
    filters: {},
    sort: {},
    url: 'search',
    pageSize: 6,
    currentPage: 1,
    search: 'cute',
  })

  const { getListboxProps, contextValue, dispatch } = useMenu({
    autoFocus: false,
    componentName: 'SearchOverlay',
    onItemsChange(items) {
      // dispatch({ type: })
      // focus on first item
      console.log(items)
    },
  })

  const resetFocus = useCallback(() => {
    dispatch({ type: 'list:clearSelection' })
  }, [dispatch])

  const { handleSubmit, products } = useProductList({
    skipOnLoad: false,
    params,
    quickSearch: true,
  })

  const setClosed = useCallback(() => setOpen(false), [setOpen])

  const searchOverlayContext = useMemo(
    () => ({ params, setParams, products, setClosed, resetFocus }),
    [params, setParams, products, setClosed, resetFocus],
  )

  return (
    <SearchOverlayContext.Provider value={searchOverlayContext}>
      <Overlay
        active={open}
        onClosed={setClosed}
        variantMd='top'
        variantSm='bottom'
        sizeMd='floating'
        sizeSm='full'
        justifyMd='center'
        sx={(theme) => ({
          '& .LayoutOverlayBase-background': {
            backdropFilter: 'blur(16px)',
            backgroundColor: alpha(theme.palette.background.paper, 0.8),
          },
        })}
        bgColor='default'
      >
        <ProductFiltersPro
          params={params}
          filterTypes={{}}
          autoSubmitMd
          handleSubmit={(formValues) =>
            // eslint-disable-next-line @typescript-eslint/require-await
            handleSubmit(formValues, async () => {
              setParams(toProductListParams(formValues))
            })
          }
        >
          <MenuProvider value={contextValue}>
            <Box component='ul' {...getListboxProps()} sx={{ listStyle: 'none', p: 0, m: 0 }}>
              {children}
            </Box>
          </MenuProvider>
        </ProductFiltersPro>
      </Overlay>
    </SearchOverlayContext.Provider>
  )
}
