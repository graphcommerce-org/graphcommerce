import {
  ProductListParams,
  ProductListQuery,
  ProductFiltersPro,
  toProductListParams,
} from '@graphcommerce/magento-product'
import { Overlay } from '@graphcommerce/next-ui'
import { useList } from '@mui/base/useList'
import { alpha, Box, useForkRef } from '@mui/material'
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from 'react'
import { useProductList } from '../../hooks/useProductList'

type SearchOverlayContextType = {
  params: ProductListParams
  setParams: React.Dispatch<React.SetStateAction<ProductListParams>>
  products: ProductListQuery['products']
  selectedIndex: number
  items: React.RefObject<HTMLElement>[]
  inputs: React.RefObject<HTMLElement>[]
  setClosed: () => void
  resetFocus: () => void
  registerItem: <T extends HTMLElement>(ref: React.RefObject<T>) => () => void
  registerInput: <T extends HTMLElement>(ref: React.RefObject<T>) => () => void
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

  const resetFocus = useCallback(() => {}, [])

  const { handleSubmit, products } = useProductList({
    skipOnLoad: false,
    params,
    quickSearch: true,
  })

  const setClosed = useCallback(() => setOpen(false), [setOpen])
  const items = useRef<React.RefObject<HTMLElement>[]>([])
  const inputs = useRef<React.RefObject<HTMLElement>[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const searchOverlayContext: SearchOverlayContextType = useMemo(
    () => ({
      params,
      setParams,
      products,
      setClosed,
      resetFocus,
      selectedIndex,
      items: items.current,
      inputs: inputs.current,
      registerItem: (item) => {
        if (item.current instanceof HTMLElement) {
          items.current.push(item)
        }
        return () => {
          items.current = items.current.filter((i) => i !== item)
        }
      },
      registerInput: (input) => {
        const controller = new AbortController()
        if (input.current instanceof HTMLElement) {
          inputs.current.push(input)

          input.current.addEventListener(
            'keydown',
            (event) => {
              if (event.key === 'ArrowDown') {
                event.preventDefault()
                // Cycle between -1 and items.current.length
                setSelectedIndex((prevIndex) => {
                  if (prevIndex === items.current.length - 1) return -1
                  return (prevIndex + 1) % items.current.length
                })
              } else if (event.key === 'ArrowUp') {
                event.preventDefault()
                // Cycle between -1 and items.current.length
                setSelectedIndex((prevIndex) => {
                  if (prevIndex === -1) return items.current.length - 1
                  return (prevIndex - 1) % items.current.length
                })
              } else if (event.key === 'Enter') {
                const element = items.current[selectedIndex].current
                element?.click()
              } else {
                setSelectedIndex(-1)
              }
            },
            { signal: controller.signal },
          )
        }
        return () => {
          inputs.current = inputs.current.filter((i) => i !== input)
          controller.abort()
        }
      },
    }),
    [params, setParams, products, setClosed, resetFocus, selectedIndex],
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
          {children}
        </ProductFiltersPro>
      </Overlay>
    </SearchOverlayContext.Provider>
  )
}

export function useSearchItem({ rootRef }: { rootRef?: React.Ref<Element> }) {
  const searchOverlay = useSearchOverlay()

  const internalRef = useRef<HTMLElement>(null)
  const forkedRef = useForkRef(rootRef, internalRef)
  const register = searchOverlay.registerItem
  useEffect(() => register(internalRef), [register, rootRef])

  return {
    getRootProps: () => ({
      ref: forkedRef,
      selected:
        searchOverlay.selectedIndex > -1 &&
        searchOverlay.selectedIndex === searchOverlay.items.indexOf(internalRef),
    }),
  }
}

export function useSearchInput({ rootRef }: { rootRef?: React.Ref<Element> }) {
  const searchOverlay = useSearchOverlay()

  const internalRef = useRef<HTMLElement>(null)
  const forkedRef = useForkRef(rootRef, internalRef)
  const register = searchOverlay.registerInput
  useEffect(() => register(internalRef), [register, rootRef])

  return {
    getRootProps: () => ({
      selected: searchOverlay.selectedIndex === -1,
      ref: forkedRef,
    }),
  }
}
