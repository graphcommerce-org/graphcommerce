import { TextFieldElement, TextFieldElementProps } from '@graphcommerce/ecommerce-ui'
import { extendableComponent } from '@graphcommerce/next-ui'
import { FormAutoSubmit, FormProvider, useForm } from '@graphcommerce/react-hook-form'
import { Box, SxProps, Theme } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { SearchFormAdornment } from './SearchFormAdornment'

export type SearchFormProps = {
  totalResults?: number
  search?: string
  urlHandle?: string
  autoFocus?: boolean
  textFieldProps?: Omit<TextFieldElementProps<{ search: string }>, 'control' | 'name'>
  sx?: SxProps<Theme>
}

const { classes } = extendableComponent('SearchForm' as const, ['root'] as const)

export function SearchForm(props: SearchFormProps) {
  const searchInputElement = useRef<HTMLInputElement>(null)

  useEffect(() => {
    searchInputElement.current?.focus()
  }, [])
  const { search = '', urlHandle = 'search', textFieldProps, sx = [] } = props
  const router = useRouter()

  const form = useForm({ defaultValues: { search } })
  const { handleSubmit, setValue, control } = form

  const submit = handleSubmit((formData) => router.replace(`/${urlHandle}/${formData.search}`))

  const endAdornment = (
    <SearchFormAdornment
      control={form.control}
      name='search'
      onReset={() => {
        setValue('search', '')
        return submit()
      }}
    />
  )

  return (
    <FormProvider {...form}>
      <Box className={classes.root} component='form' noValidate onSubmit={submit} sx={sx}>
        <FormAutoSubmit wait={200} maxWait={400} initialWait={0} />
        <TextFieldElement
          variant='outlined'
          type='text'
          name='search'
          color='primary'
          control={control}
          InputProps={{ ...textFieldProps?.InputProps, endAdornment }}
          validation={{ minLength: 3 }}
          inputRef={searchInputElement}
          {...textFieldProps}
        />
      </Box>
    </FormProvider>
  )
}
