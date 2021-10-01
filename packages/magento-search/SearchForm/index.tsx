import { FormRow, UseStyles, SvgImage, iconClose, iconSearch } from '@graphcommerce/next-ui'
import { useForm, useFormAutoSubmit, useFormMuiRegister } from '@graphcommerce/react-hook-form'
import { IconButton, TextField, Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useRouter } from 'next/router'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    totalProducts: {
      minWidth: 'max-content',
      color: theme.palette.grey[500],
      paddingRight: 7,
    },
  }),
  {
    name: 'SearchIndexPage',
  },
)

export type SearchFormProps = {
  totalResults?: number
  search?: string
  urlHandle?: string
  autoFocus?: boolean
} & UseStyles<typeof useStyles>

export default function SearchForm(props: SearchFormProps) {
  const { totalResults = 0, search = '', urlHandle = 'search', autoFocus = true } = props
  const classes = useStyles(props)
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
    <IconButton size='small'>
      <SvgImage src={iconSearch} alt='search' size='small' />
    </IconButton>
  ) : (
    <>
      {totalResults > 0 && (
        <div className={classes.totalProducts}>
          {totalResults} {totalResults > 1 ? 'results' : 'result'}
        </div>
      )}
      <IconButton onClick={handleReset} size='small'>
        <SvgImage src={iconClose} alt='close' size='small' />
      </IconButton>
    </>
  )

  return (
    <form
      noValidate
      onSubmit={submit}
      onChange={() => {
        if (watch('search') === '') {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          router.replace(`/search`)
        }
      }}
    >
      <FormRow>
        <TextField
          variant='outlined'
          type='text'
          autoFocus={autoFocus}
          placeholder='Search'
          defaultValue={search}
          error={formState.isSubmitted && !!formState.errors.search}
          helperText={formState.isSubmitted && formState.errors.search?.message}
          {...muiRegister('search', { required: true, minLength: 2 })}
          InputProps={{ endAdornment }}
        />
      </FormRow>
    </form>
  )
}
