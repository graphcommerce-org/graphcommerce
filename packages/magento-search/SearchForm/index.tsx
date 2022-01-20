import { FormRow, UseStyles, iconClose, iconSearch, SvgImageSimple } from '@graphcommerce/next-ui'
import { useForm, useFormAutoSubmit, useFormMuiRegister } from '@graphcommerce/react-hook-form'
import { t, Plural, Trans } from '@lingui/macro'
import { IconButton, makeStyles, TextField, TextFieldProps, Theme } from '@material-ui/core'
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
  textFieldProps?: TextFieldProps
} & UseStyles<typeof useStyles>

export default function SearchForm(props: SearchFormProps) {
  const { totalResults = 0, search = '', urlHandle = 'search', textFieldProps } = props
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
      <SvgImageSimple src={iconSearch} />
    </IconButton>
  ) : (
    <>
      {totalResults > 0 && (
        <div className={classes.totalProducts}>
          {totalResults > 0 && (
            <div className={classes.totalProducts}>
              {totalResults} {totalResults === 1 && <Trans>result</Trans>}
              {totalResults > 1 && <Trans>results</Trans>}
            </div>
          )}
        </div>
      )}
      <IconButton onClick={handleReset} size='small'>
        <SvgImageSimple src={iconClose} />
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
          placeholder={t`Search`}
          defaultValue={search}
          error={formState.isSubmitted && !!formState.errors.search}
          helperText={formState.isSubmitted && formState.errors.search?.message}
          {...muiRegister('search', { required: true, minLength: 2 })}
          InputProps={{ endAdornment }}
          {...textFieldProps}
        />
      </FormRow>
    </form>
  )
}
