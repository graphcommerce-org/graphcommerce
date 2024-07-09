import { IconSvg, iconSearch, showPageLoadIndicator } from '@graphcommerce/next-ui'
import { Fab, FabProps } from '@mui/material'
import { useMemo, useRef, useState } from 'react'
import { ProductFiltersProSearchInputProps } from './ProductFiltersProSearchInput'
import { useSearchPageAndParam } from './useSearchPageAndParam'
import dynamic from 'next/dynamic'

type ProductFiltersProSearchFieldProps = ProductFiltersProSearchInputProps & {
  fab?: FabProps
}

const ProductFiltersProSearchInputLazy = dynamic(
  async () => (await import('./ProductFiltersProSearchInput')).ProductFiltersProSearchOutlinedInput,
)

export function ProductFiltersProSearchField(props: ProductFiltersProSearchFieldProps) {
  const { fab, formControl } = props

  const [searchPage] = useSearchPageAndParam()
  const [expanded, setExpanded] = useState(searchPage)
  useMemo(() => {
    if (expanded !== searchPage) setExpanded(searchPage)
  }, [searchPage])

  const visible = expanded || searchPage
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      {visible && (
        <ProductFiltersProSearchInputLazy
          {...props}
          formControl={formControl}
          inputRef={inputRef}
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
          inputRef.current?.focus()
        }}
        color='inherit'
        size='large'
        {...fab}
        sx={[
          {
            display: {
              xs: visible ? 'none' : 'inline-flex',
            },
          },
          ...(Array.isArray(fab?.sx) ? fab.sx : [fab?.sx]),
        ]}
      >
        <IconSvg src={iconSearch} size='large' />
      </Fab>
    </>
  )
}
