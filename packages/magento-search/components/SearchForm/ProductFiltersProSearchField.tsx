import { TextFieldElementProps } from '@graphcommerce/ecommerce-ui'
import { ProductFilterParams, globalFormContextRef } from '@graphcommerce/magento-product'
import { IconSvg, iconClose, iconSearch } from '@graphcommerce/next-ui'
import { FabProps, IconButton, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

type ProductFiltersProSearchFieldProps = Omit<
  TextFieldElementProps<ProductFilterParams>,
  'control' | 'name'
> & {
  fab?: FabProps
}

export function ProductFiltersProSearchField(props: ProductFiltersProSearchFieldProps) {
  const { InputProps, ...rest } = props

  const router = useRouter()

  const searchPage = router.asPath.startsWith('/search')
  const [expanded, setExpanded] = useState(searchPage)

  const ref = useRef<HTMLInputElement>(null)

  const start = useRef<number | null>(null)

  useEffect(() => {
    if (!searchPage) setExpanded(false)
  }, [searchPage])

  if (!expanded && !searchPage) {
    return (
      <IconButton onClick={() => setExpanded(true)}>
        <IconSvg src={iconSearch} />
      </IconButton>
    )
  }

  return (
    <TextField
      fullWidth
      variant='standard'
      type='text'
      name='search'
      color='primary'
      onChange={(e) => {
        const context = globalFormContextRef.current

        if (!start.current) start.current = Date.now()

        // When we're not on the search page, we want to navigate as soon as possible.
        // We only want to navigate once, and let the rest be handled by the search page.
        if (!context) {
          return router.push(`/search/${e.target.value}`)
        }

        context.form.setValue('currentPage', 1)
        context.form.setValue('search', e.target.value)
        return context.submit()
      }}
      InputProps={{
        ...InputProps,
        endAdornment: (
          <IconButton
            onClick={() => {
              const context = globalFormContextRef.current
              if (ref.current) ref.current.value = ''

              if (!context) return undefined

              context.form.setValue('currentPage', 1)
              context.form.setValue('search', '')
              return context.submit()
            }}
            size='small'
          >
            <IconSvg src={iconClose} />
          </IconButton>
        ),
      }}
      inputRef={ref}
      {...rest}
    />
  )
}
