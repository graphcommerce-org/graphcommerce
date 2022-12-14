import {
  FormRow,
  iconClose,
  iconSearch,
  IconSvg,
  extendableComponent,
} from '@graphcommerce/next-ui'
import { useForm, useFormAutoSubmit, useFormMuiRegister } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, IconButton, SxProps, TextField, TextFieldProps, Theme } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

export type SearchFormProps = {
  totalResults?: number
  search?: string
  urlHandle?: string
  autoFocus?: boolean
  textFieldProps?: TextFieldProps
  sx?: SxProps<Theme>
}

const name = 'SearchForm' as const
const parts = ['root', 'totalProducts'] as const
const { classes } = extendableComponent(name, parts)

export function SearchForm(props: SearchFormProps) {
  const searchInputElement = useRef<HTMLInputElement>(null)

  useEffect(() => {
    searchInputElement.current?.focus()
  }, [])

  const { totalResults = 0, search = '', urlHandle = 'search', textFieldProps, sx = [] } = props
  const router = useRouter()

  const form = useForm({ mode: 'onChange', defaultValues: { search } })
  const { handleSubmit, formState, reset, watch, getValues } = form

  const muiRegister = useFormMuiRegister(form)

  const submit = handleSubmit((formData) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.replace(`/${urlHandle}/${formData.search}`)
    reset(getValues())
  })
  useFormAutoSubmit({ form, submit })

  const handleReset = () => {
    reset({ search: '' })
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.replace(`/${urlHandle}`)
  }

  const endAdornment = !watch('search') ? (
    <IconButton size='small' aria-label={i18n._(/* i18n */ 'Search')}>
      <IconSvg src={iconSearch} />
    </IconButton>
  ) : (
    <>
      {totalResults > 0 && (
        <Box
          className={classes.totalProducts}
          sx={(theme) => ({
            minWidth: 'max-content',
            color: theme.palette.text.disabled,
            paddingRight: '7px',
          })}
        >
          {totalResults === 1 && <Trans id='{totalResults} result' values={{ totalResults }} />}
          {totalResults > 1 && <Trans id='{totalResults} results' values={{ totalResults }} />}
        </Box>
      )}
      <IconButton onClick={handleReset} size='small'>
        <IconSvg src={iconClose} />
      </IconButton>
    </>
  )

  return (
    <Box
      className={classes.root}
      component='form'
      noValidate
      onSubmit={submit}
      onChange={() => {
        if (watch('search') === '') {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          router.replace(`/search`)
        }
      }}
      sx={sx}
    >
      <FormRow>
        <TextField
          variant='outlined'
          type='text'
          placeholder={i18n._(/* i18n */ 'Search')}
          defaultValue={search}
          error={formState.isSubmitted && !!formState.errors.search}
          helperText={formState.isSubmitted && formState.errors.search?.message}
          {...muiRegister('search', { required: true, minLength: 2 })}
          InputProps={{ endAdornment }}
          {...textFieldProps}
          inputRef={searchInputElement}
        />
      </FormRow>
    </Box>
  )
}
