import { IconButton, makeStyles, TextField, Theme } from '@material-ui/core'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import PictureResponsiveNext from '@reachdigital/next-ui/PictureResponsiveNext'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import { useForm, useFormAutoSubmit, useFormMuiRegister } from '@reachdigital/react-hook-form'
import { useRouter } from 'next/router'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    totalProducts: {
      minWidth: 'max-content',
      color: theme.palette.grey[500],
      ...theme.typography.caption,
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
} & UseStyles<typeof useStyles>

export default function SearchForm(props: SearchFormProps) {
  const { totalResults = 0, search = '' } = props
  const formClasses = useFormStyles()
  const pageClasses = useStyles(props)
  const router = useRouter()

  const form = useForm({ mode: 'onChange', defaultValues: { search } })
  const { handleSubmit, formState, reset, watch, getValues } = form

  const muiRegister = useFormMuiRegister(form)

  const submit = handleSubmit((formData) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.replace(`/search/${formData.search}`)
    reset(getValues())
  })
  useFormAutoSubmit({ form, submit })

  const handleReset = () => {
    reset({ search: '' })
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.replace(`/search`)
  }

  const endAdornment = (
    <>
      {totalResults > 0 && (
        <div className={pageClasses.totalProducts}>
          {totalResults} {totalResults > 1 ? 'results' : 'result'}
        </div>
      )}
      <IconButton onClick={handleReset} size='small'>
        <PictureResponsiveNext
          alt='desktop_close'
          width={24}
          height={24}
          src='/icons/desktop_close.svg'
          type='image/svg+xml'
        />
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
      <div className={formClasses.formRow}>
        <TextField
          variant='outlined'
          type='text'
          autoFocus
          defaultValue={search}
          error={formState.isSubmitted && !!formState.errors.search}
          helperText={formState.isSubmitted && formState.errors.search?.message}
          {...muiRegister('search', { required: true, minLength: 2 })}
          InputProps={{ endAdornment: watch('search') && endAdornment }}
        />
      </div>
    </form>
  )
}
