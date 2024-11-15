import {
  usePreviewModeForm,
  type PreviewModeToolbarProps,
  SelectElement,
  previewModeDefaults,
  useWatch,
} from '@graphcommerce/ecommerce-ui'
import { TypedDocumentNode, gql, useQuery } from '@graphcommerce/graphql'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import React, { useMemo } from 'react'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/ecommerce-ui',
}

const ContentStages = gql`
  query {
    __type(name: "Stage") {
      name
      enumValues {
        name
        description
      }
    }
  }
` as TypedDocumentNode<{
  __type: {
    name: 'Stage'
    enumValues: {
      name: string
      description: string
    }[]
  }
}>

const HygraphConfig = React.memo(() => {
  const form = usePreviewModeForm()
  const { control } = form

  const contentStages = useQuery(ContentStages)

  const defaultValue =
    useWatch({ control, name: 'previewData.hygraphStage' }) ??
    previewModeDefaults().hygraphStage ??
    'PUBLISHED'

  return useMemo(
    () => (
      <SelectElement
        control={control}
        name='previewData.hygraphStage'
        color='secondary'
        defaultValue={defaultValue}
        label='Hygraph Stage'
        size='small'
        sx={{ width: '150px' }}
        SelectProps={{ MenuProps: { style: { zIndex: 20000 } } }}
        onChange={() => {}}
        options={
          contentStages.loading
            ? [{ id: defaultValue, label: defaultValue }]
            : filterNonNullableKeys(contentStages.data?.__type.enumValues).map(({ name }) => ({
                id: name,
                label: name,
              }))
        }
      />
    ),
    [contentStages.data?.__type.enumValues, contentStages.loading, control, defaultValue],
  )
})

export const PreviewModeToolbar = (props: PluginProps<PreviewModeToolbarProps>) => {
  const { Prev, ...rest } = props
  return (
    <>
      <Prev {...rest} />
      <HygraphConfig />
    </>
  )
}
