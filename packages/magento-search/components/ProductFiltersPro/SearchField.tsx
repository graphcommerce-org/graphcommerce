import { iconSearch, IconSvg, showPageLoadIndicator } from '@graphcommerce/next-ui'
import type { FabProps } from '@mui/material'
import { Fab } from '@mui/material'
import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'
import type { ProductFiltersProSearchInputProps } from './ProductFiltersProSearchInput'
import { useSearchPageAndParam } from './useSearchPageAndParam'

export type SearchFieldProps = ProductFiltersProSearchInputProps & {
  fab?: FabProps
  visible?: boolean
  searchField?: Record<string, unknown>
}

const ProductFiltersProSearchInputLazy = dynamic(
  async () => (await import('./ProductFiltersProSearchInput')).ProductFiltersProSearchOutlinedInput,
)

export function SearchField(props: SearchFieldProps) {
  const { fab, formControl, visible: incomingVisible } = props

  const [searchPage] = useSearchPageAndParam()
  const [expanded, setExpanded] = useState(searchPage)
  useMemo(() => {
    if (!searchPage) setExpanded(searchPage)
  }, [searchPage])

  const visible = incomingVisible || expanded || searchPage

  return (
    <>
      {visible && (
        <ProductFiltersProSearchInputLazy
          {...props}
          formControl={formControl}
          inputRef={(element: HTMLInputElement) => element?.focus()}
          // autoFocus
          buttonProps={{
            onClick: () => {
              setExpanded(false)
            },
          }}
          onBlur={() => {
            if (!searchPage && !showPageLoadIndicator.get()) setExpanded(false)
          }}
        />
      )}
      <Fab
        onClick={() => {
          setExpanded(true)
          // inputRef.current?.focus()
        }}
        color='inherit'
        size='large'
        {...fab}
        sx={[
          { display: { xs: visible ? 'none' : 'inline-flex' } },
          ...(Array.isArray(fab?.sx) ? fab.sx : [fab?.sx]),
        ]}
      >
        <IconSvg src={iconSearch} size='large' />
      </Fab>
    </>
  )
}
