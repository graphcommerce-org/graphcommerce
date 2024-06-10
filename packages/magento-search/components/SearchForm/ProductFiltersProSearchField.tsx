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
    searchInputElement.current?.focus()
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
        rules={{ minLength: 3 }}
        inputRef={searchInputElement}
        {...rest}
      />
    </form>
  )
}
