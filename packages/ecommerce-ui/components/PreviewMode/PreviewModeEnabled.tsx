import type { PreviewData } from '@graphcommerce/graphql'
import {
  iconClose,
  iconContrast,
  iconInfo,
  iconRefresh,
  IconSvg,
  MessageSnackbar,
} from '@graphcommerce/next-ui'
import { FormAutoSubmit, FormPersist, FormProvider, useForm } from '@graphcommerce/react-hook-form'
import { Box, IconButton } from '@mui/material'
import { LightTooltip } from './LightTooltip'
import { PreviewModeActions } from './PreviewModeActions'
import { PreviewModeToolbar } from './PreviewModeToolbar'

function getPreviewUrl() {
  const url = new URL(window.location.href)
  url.pathname = '/api/preview'
  ;[...url.searchParams.entries()].forEach(([key]) => url.searchParams.delete(key))
  return url
}

type FormValues = { secret: string; previewData: PreviewData }

export function PreviewModeEnabled() {
  const form = useForm<FormValues>({})

  const submit = form.handleSubmit((formValues) => {
    const url = getPreviewUrl()
    url.searchParams.append('action', 'update')

    Object.entries(formValues).forEach(([key, value]) => {
      url.searchParams.append(key, JSON.stringify(value))
    })

    window.location.href = url.toString()
  })

  const exitHandler = form.handleSubmit(() => {
    const url = getPreviewUrl()
    url.searchParams.append('action', 'exit')

    window.location.href = url.toString()
  })

  const revalidateHandler = form.handleSubmit((formValues) => {
    const url = getPreviewUrl()
    Object.entries(formValues).forEach(([key, value]) => {
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      url.searchParams.append(key, `${value}`)
    })
    url.searchParams.append('action', 'revalidate')
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
          <>
            <PreviewModeActions />
            <LightTooltip title='Revalidate / Regenerate Page' placement='top'>
              <IconButton color='secondary' type='submit' onClick={revalidateHandler}>
                <IconSvg src={iconRefresh} />
              </IconButton>
            </LightTooltip>
            <LightTooltip title='Stop preview mode' placement='top'>
              <IconButton color='secondary' type='submit' onClick={exitHandler}>
                <IconSvg src={iconClose} />
              </IconButton>
            </LightTooltip>
          </>
        }
      >
        <Box sx={{ display: 'grid', gridAutoFlow: 'column', placeItems: 'center', gap: 4 }}>
          <Box sx={{ display: 'flex', placeItems: 'center' }}>
            Preview Mode{' '}
            <LightTooltip title='You are currently viewing the website in Preview Mode (caches are disabled).'>
              <IconButton size='small'>
                <IconSvg src={iconInfo} />
              </IconButton>
            </LightTooltip>
          </Box>
          <PreviewModeToolbar />
        </Box>
      </MessageSnackbar>
      <FormPersist form={form} name='PreviewModePreviewData' />
      <FormAutoSubmit control={form.control} submit={submit} />
    </FormProvider>
  )
}
