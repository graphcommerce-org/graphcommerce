import {
  usePreviewModeForm,
  type PreviewModeToolbarProps,
  SelectElement,
} from '@graphcommerce/ecommerce-ui'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/ecommerce-ui',
}

function HygraphConfig() {
  const form = usePreviewModeForm()
  const { control } = form

  return (
    <SelectElement
      control={control}
      name='previewData.hygraphStage'
      defaultValue='PUBLISHED'
      color='secondary'
      select
      label='Hygraph Stage'
      size='small'
      sx={{ width: '150px' }}
      SelectProps={{
        MenuProps: { style: { zIndex: 20000 } },
      }}
      onChange={() => {}}
      options={[
        { id: 'DRAFT', label: 'DRAFT' },
        { id: 'PUBLISHED', label: 'PUBLISHED' },
      ]}
    />
  )
}

export const PreviewModeToolbar = (props: PluginProps<PreviewModeToolbarProps>) => {
  const { Prev, ...rest } = props
  return (
    <>
      <Prev {...rest} />
      <HygraphConfig />
    </>
  )
}
