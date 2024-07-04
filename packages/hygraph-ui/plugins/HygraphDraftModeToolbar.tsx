import {
  useDraftModeForm,
  type DraftModeToolbarProps,
  SelectElement,
} from '@graphcommerce/ecommerce-ui'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/ecommerce-ui',
}

function HygraphConfig() {
  const form = useDraftModeForm()
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
  )
}

export const DraftModeToolbar = (props: PluginProps<DraftModeToolbarProps>) => {
  const { Prev, ...rest } = props
  return (
    <>
      <Prev {...rest} />
      <HygraphConfig />
    </>
  )
}
