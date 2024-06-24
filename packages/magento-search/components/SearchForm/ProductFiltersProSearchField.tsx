import {
  FormAutoSubmit,
  TextFieldElement,
  TextFieldElementProps,
} from '@graphcommerce/ecommerce-ui'
import { ProductFilterParams, useProductFiltersPro } from '@graphcommerce/magento-product'
import { useEffect, useRef } from 'react'
import { SearchFormAdornment } from './SearchFormAdornment'

type ProductFiltersProSearchFieldProps = Omit<
  TextFieldElementProps<ProductFilterParams>,
  'control' | 'name'
>

export function ProductFiltersProSearchField(props: ProductFiltersProSearchFieldProps) {
  const { InputProps, ...rest } = props

  const { form, submit } = useProductFiltersPro()
  const searchInputElement = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const timeout = setTimeout(() => searchInputElement.current?.focus(), 100)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <form onSubmit={submit}>
      <FormAutoSubmit
        control={form.control}
        submit={submit}
        wait={200}
        maxWait={400}
        initialWait={0}
        name='search'
      />
      <TextFieldElement
        control={form.control}
        variant='outlined'
        type='text'
        name='search'
        color='primary'
        InputProps={{
          ...InputProps,
          endAdornment: (
            <SearchFormAdornment
              control={form.control}
              name='search'
              onReset={() => {
                form.setValue('search', null)
                return submit()
              }}
            />
          ),
        }}
        inputRef={searchInputElement}
        {...rest}
      />
    </form>
  )
}
