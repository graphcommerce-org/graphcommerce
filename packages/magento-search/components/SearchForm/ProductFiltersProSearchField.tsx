import { TextFieldElementProps } from '@graphcommerce/ecommerce-ui'
import {
  ProductFilterParams,
  globalFilterForm,
  useProductFiltersPro,
} from '@graphcommerce/magento-product'
import { TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useRef } from 'react'

type ProductFiltersProSearchFieldProps = Omit<
  TextFieldElementProps<ProductFilterParams>,
  'control' | 'name'
>

export function ProductFiltersProSearchField(props: ProductFiltersProSearchFieldProps) {
  const { InputProps, ...rest } = props

  const context = useProductFiltersPro(true)
  const searchInputElement = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const isSearchPage = router.asPath.startsWith('/search')

  const defaultValue = `${context?.params.search ?? router.query.url ?? ''}`

  useEffect(() => {
    if (!searchInputElement.current) return
    searchInputElement.current.value = isSearchPage ? defaultValue : ''
  }, [isSearchPage])

  return (
    <TextField
      fullWidth
      variant='outlined'
      type='text'
      name='search'
      color='primary'
      defaultValue={defaultValue}
      onChange={async (e: ChangeEvent<HTMLInputElement>) => {
        const ctx = context ?? globalFilterForm.current
        const { value = '' } = e.target
        // Go to the search page when we're not there.
        if (!ctx || !isSearchPage) {
          await router.push(`/search/${value}`)
          return
        }
        ctx.form.setValue('search', value)
        await ctx.submit()
      }}
      InputProps={{
        sx: {
          borderRadius: '100em',
        },
      }}
      // InputProps={{
      //   ...InputProps,
      //   endAdornment: (
      //     <SearchFormAdornment
      //       control={form?.control}
      //       name='search'
      //       onReset={() => {
      //         context?.form.setValue('search', null)
      //         return context.submit?.()
      //       }}
      //     />
      //   ),
      // }}
      inputRef={searchInputElement}
      {...rest}
    />
  )
}
