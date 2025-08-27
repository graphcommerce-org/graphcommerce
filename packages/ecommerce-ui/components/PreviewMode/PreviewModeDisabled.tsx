import { previewSecret } from '@graphcommerce/next-config/config'
import { iconChevronRight, iconContrast, IconSvg, MessageSnackbar } from '@graphcommerce/next-ui'
import { FormPersist, FormProvider, useForm } from '@graphcommerce/react-hook-form'
import { Box, IconButton } from '@mui/material'
import { TextFieldElement } from '../FormComponents'

function getPreviewUrl() {
  const url = new URL(window.location.href)
  url.pathname = '/api/preview'
  ;[...url.searchParams.entries()].forEach(([key]) => url.searchParams.delete(key))
  return url
}

const secret = process.env.NODE_ENV === 'development' ? (previewSecret ?? '') : ''

type FormValues = { secret: string }

export function PreviewModeDisabled() {
  const form = useForm<FormValues>({ defaultValues: { secret } })

  const submit = form.handleSubmit((formValues) => {
    const url = getPreviewUrl()
    url.searchParams.append('action', 'enable')

    Object.entries(formValues).forEach(([key, value]) => {
      url.searchParams.append(key, typeof value === 'string' ? value : JSON.stringify(value))
    })

    window.location.href = url.toString()
  })

  return (
    <FormProvider<FormValues> {...form}>
      <MessageSnackbar
        variant='pill'
        severity='warning'
        disableBackdropClick
        disableClose
        open
        icon={iconContrast}
        onClose={() => {}}
        action={
          <IconButton color='secondary' type='submit' onClick={submit}>
            <IconSvg src={iconChevronRight} />
          </IconButton>
        }
      >
        <Box sx={{ display: 'grid', gridAutoFlow: 'column', placeItems: 'center', gap: 4 }}>
          <Box sx={{ display: 'flex', placeItems: 'center' }}>Preview Mode</Box>
          <TextFieldElement control={form.control} name='secret' label='Secret' />
        </Box>
      </MessageSnackbar>
      <FormPersist form={form} name='PreviewModePreviewData' />
    </FormProvider>
  )
}
