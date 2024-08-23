import { globalFormContextRef } from '@graphcommerce/magento-product'
import { IconSvg, iconClose } from '@graphcommerce/next-ui'
import { t } from '@lingui/macro'
import {
  ButtonBaseProps,
  FormControl,
  FormControlProps,
  IconButton,
  IconButtonProps,
  InputBaseProps,
  OutlinedInput,
  OutlinedInputProps,
  useForkRef,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { useSearchPageAndParam } from './useSearchPageAndParam'

export function useProductFiltersProSearchInput<
  P extends InputBaseProps & { buttonProps?: ButtonBaseProps },
>(props: P): P {
  const { buttonProps = {}, inputRef } = props

  const router = useRouter()
  const [searchPage, searchParam] = useSearchPageAndParam()

  const internalRef = useRef<HTMLInputElement>(null)
  const ref = useForkRef(inputRef, internalRef)
  const initial = useRef(true)

  useEffect(() => {
    // When page initially loads, fill in the search field with the search param.
    if (internalRef.current && initial.current && searchParam) {
      initial.current = false
      internalRef.current.selectionStart = searchParam.length
      internalRef.current.selectionEnd = searchParam.length
      return
    }

    // When the user is not focussed on the search field and the value gets updated, update the form.
    if (internalRef.current && internalRef.current !== document.activeElement && searchParam)
      internalRef.current.value = searchParam
  }, [searchParam])

  const result: P = {
    ...props,
    inputRef: ref,
    placeholder: t`Search all products...`,
    name: 'search',
    type: 'text',
    defaultValue: searchParam,
    onKeyDown: (e) => {
      if (e.key === 'Enter') {
        const context = globalFormContextRef.current
        if (!context || !searchPage) {
          return router.push(`/search/${e.currentTarget.value}`)
        }
        context.form.setValue('currentPage', 1)
        context.form.setValue('search', e.currentTarget.value)
        return context.submit()
      }
      return props?.onKeyDown?.(e)
    },
    onChange: async (e) => {
      const context = globalFormContextRef.current

      // When we're not on the search page, we want to navigate as soon as possible.
      // TODO: We only want to navigate once, and let the rest be handled by the search page.
      if (!context || !searchPage) {
        return router.push(`/search/${e.target.value}`)
      }

      context.form.setValue('currentPage', 1)
      context.form.setValue('search', e.currentTarget.value)
      await context.submit()

      return props.onChange?.(e)
    },
    buttonProps: {
      ...buttonProps,
      onClick: async (e) => {
        const context = globalFormContextRef.current

        if (context?.form.getValues('search')) {
          context.form.setValue('currentPage', 1)
          context.form.setValue('search', '')
          if (internalRef.current) internalRef.current.value = ''
          await context.submit()
        } else if (searchPage) {
          router.back()
          if (internalRef.current) internalRef.current.value = ''
        } else {
          buttonProps.onClick?.(e)
        }
      },
    },
  }
  return result
}

export type ProductFiltersProSearchInputProps = OutlinedInputProps & {
  formControl?: FormControlProps
  buttonProps?: IconButtonProps
}

export function ProductFiltersProSearchOutlinedInput(props: ProductFiltersProSearchInputProps) {
  const { buttonProps, formControl, size, ...rest } = useProductFiltersProSearchInput(props)

  return (
    <FormControl variant='outlined' size={size} {...formControl}>
      <OutlinedInput
        color='primary'
        size={size}
        endAdornment={
          <IconButton color='inherit' size='small' {...buttonProps}>
            <IconSvg src={iconClose} size='large' />
          </IconButton>
        }
        {...rest}
      />
    </FormControl>
  )
}
