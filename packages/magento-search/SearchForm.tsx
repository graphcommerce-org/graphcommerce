import { Button, makeStyles, TextField, Theme } from '@material-ui/core'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import PictureResponsiveNext from '@reachdigital/next-ui/PictureResponsiveNext'
import { useForm, useFormAutoSubmit, useFormMuiRegister } from '@reachdigital/react-hook-form'
import { useRouter } from 'next/router'
import React from 'react'

type SearchFormProps = {
  totalResults: number
  search: string
}

const useStyles = makeStyles(
  (theme: Theme) => ({
    resetBtn: {
      borderRadius: '50%',
      minWidth: 'unset',
      width: 40,
      height: 40,
    },
    totalProducts: {
      minWidth: 'max-content',
      ...theme.typography.caption,
      paddingRight: 7,
    },
  }),
  {
    name: 'SearchIndexPage',
  },
)

export default function SearchForm(props: SearchFormProps) {
  const { totalResults, search } = props
  const formClasses = useFormStyles()
  const pageClasses = useStyles()
  const router = useRouter()

  const form = useForm({
    mode: 'onChange',
    defaultValues: { search },
  })

  const { handleSubmit, formState, reset, watch } = form

  const muiRegister = useFormMuiRegister(form)

  const submit = handleSubmit((formData) => router.push(`/search/${formData.search}`))
  useFormAutoSubmit({ form, submit })

  const endAdornment = (
    <>
      {totalResults > 0 && (
        <div className={pageClasses.totalProducts}>
          {totalResults} {totalResults > 1 ? 'results' : 'result'}
        </div>
      )}
      <Button
        onClick={() => {
          router.replace(`/search`)
        }}
        variant='text'
        className={pageClasses.resetBtn}
      >
        <PictureResponsiveNext
          alt='desktop_close'
          width={32}
          height={32}
          src='/icons/desktop_close.svg'
          type='image/svg+xml'
        />
      </Button>
    </>
  )

  return (
    <form noValidate onSubmit={submit}>
      <div className={formClasses.formRow}>
        <TextField
          variant='outlined'
          type='text'
          autoFocus
          error={formState.isSubmitted && !!formState.errors.search}
          helperText={formState.isSubmitted && formState.errors.search?.message}
          {...muiRegister('search', { minLength: 2 })}
          InputProps={{ endAdornment: watch('search') && endAdornment }}
        />
      </div>
    </form>
  )
}
