import { PreviewData } from '@graphcommerce/graphql'
import {
  IconSvg,
  MessageSnackbar,
  iconClose,
  iconContrast,
  iconInfo,
  iconRefresh,
} from '@graphcommerce/next-ui'
import { FormPersist, FormProvider, useForm, useFormContext } from '@graphcommerce/react-hook-form'
import { Box, IconButton, Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material'
import { useRouter } from 'next/router'
import { SelectElement } from '../FormComponents'

function HygraphConfig() {
  const form = useFormContext<PreviewData>()
  const { control } = form

  return (
    <>
      <SelectElement
        control={control}
        name='hygraphStage'
        color='secondary'
        select
        label='Hygraph Stage'
        size='small'
        sx={{ width: '140px' }}
        SelectProps={{
          MenuProps: { style: { zIndex: 20000 } },
        }}
        onChange={() => {}}
        options={[
          { id: 'DRAFT', label: 'DRAFT' },
          { id: 'PUBLISHED', label: 'PUBLISHED' },
        ]}
      />
      <FormPersist form={form} name='PreviewData' />
    </>
  )
}

const LightTooltip = styled<typeof Tooltip>(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
  },
}))

export function DraftMode() {
  const router = useRouter()

  const form = useForm<PreviewData>({ defaultValues: { hygraphStage: 'DRAFT' } })

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
        action={
          <>
            <LightTooltip title='Revalidate / Regenerate Page' placement='top'>
              <IconButton
                color='secondary'
                type='submit'
                value='revalidate'
                onClick={() => {
                  window.location.href = '/api/preview?revalidate=1'
                }}
              >
                <IconSvg src={iconRefresh} />
              </IconButton>
            </LightTooltip>
            <LightTooltip title='Stop preview mode' placement='top'>
              <IconButton
                color='secondary'
                type='submit'
                value='exit'
                onClick={() => {
                  window.location.href = '/api/preview'
                }}
              >
                <IconSvg src={iconClose} />
              </IconButton>
            </LightTooltip>
          </>
        }
      >
        <Box sx={{ display: 'grid', gridAutoFlow: 'column', placeItems: 'center', gap: 4 }}>
          <Box sx={{ display: 'flex', placeItems: 'center' }}>
            Preview Mode
            <LightTooltip title='You are currently viewing the website in Preview Mode (caches are disabled).'>
              <IconButton size='small'>
                <IconSvg src={iconInfo} />
              </IconButton>
            </LightTooltip>
          </Box>
          <HygraphConfig />
        </Box>
      </MessageSnackbar>
    </FormProvider>
  )
}
