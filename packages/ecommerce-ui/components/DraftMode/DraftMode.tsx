import { PreviewData } from '@graphcommerce/graphql'
import {
  IconSvg,
  MessageSnackbar,
  iconClose,
  iconContrast,
  iconRefresh,
} from '@graphcommerce/next-ui'
import { FormAutoSubmit, FormPersist, FormProvider, useForm } from '@graphcommerce/react-hook-form'
import { Box, IconButton } from '@mui/material'
import { useRouter } from 'next/router'
import { DraftModeActions } from './DraftModeActions'
import { DraftModeToolbar } from './DraftModeToolbar'
import { LightTooltip } from './LightTooltip'
import { draftModeDefaults } from './draftModeDefaults'

export function getPreviewUrl() {
  const url = new URL(window.location.href)
  url.pathname = '/api/preview'
  ;[...url.searchParams.entries()].forEach(([key]) => url.searchParams.delete(key))
  return url
}

function DraftModeToolbar() {
  const router = useRouter()

  const form = useForm<{ previewData: PreviewData }>({
    defaultValues: { previewData: draftModeDefaults() },
  })

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
      url.searchParams.append(key, `${value}`)
    })
    url.searchParams.append('action', 'revalidate')
    window.location.href = url.toString()
  })

  return (
    <FormProvider {...form}>
      <MessageSnackbar
        variant='pill'
        severity='warning'
        open={router.isPreview}
        disableBackdropClick
        disableClose
        icon={iconContrast}
        onClose={() => {}}
        action={<DraftModeActions />}
      >
        <Box sx={{ display: 'grid', gridAutoFlow: 'column', placeItems: 'center', gap: 4 }}>
          <DraftModeToolbar />
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
        </Box>
      </MessageSnackbar>
      <FormPersist form={form} name='DraftModePreviewData' />
      <FormAutoSubmit control={form.control} submit={submit} />
    </FormProvider>
  )
}

export function DraftMode() {
  return <DraftModeToolbar />
}
