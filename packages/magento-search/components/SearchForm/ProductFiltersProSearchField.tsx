import {
  FormAutoSubmit,
  TextFieldElement,
  TextFieldElementProps,
} from '@graphcommerce/ecommerce-ui'
import {
  globalFilterContextRef,
  ProductFilterParams,
  useProductFiltersPro,
} from '@graphcommerce/magento-product'
import { ChangeEvent, useEffect, useRef } from 'react'
import { SearchFormAdornment } from './SearchFormAdornment'
import { Box, TextField } from '@mui/material'
import { useDebouncedCallback } from '@graphcommerce/react-hook-form/src/utils/useDebounceCallback'
import { useRouter } from 'next/router'

type ProductFiltersProSearchFieldProps = Omit<
  TextFieldElementProps<ProductFilterParams>,
  'control' | 'name'
>

export function ProductFiltersProSearchField(props: ProductFiltersProSearchFieldProps) {
  const { InputProps, ...rest } = props

  const context = useProductFiltersPro(true)
  const searchInputElement = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    const timeout = setTimeout(() => searchInputElement.current?.focus(), 100)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <TextField
      fullWidth
      variant='outlined'
      type='text'
      name='search'
      color='primary'
      defaultValue={context?.params.search ?? ''}
      onChange={useDebouncedCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
          const ctx = context ?? globalFilterContextRef.current
          if (!ctx) {
            return router.push(`/search/${e.target.value}`)
          } else {
            const { form, submit } = ctx
            form.setValue('search', e.target.value)
            return submit()
          }
        },
        { wait: 200, maxWait: 400 },
      )}
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
