import { useSendEvent } from '@graphcommerce/google-datalayer/api/sendEvent'
import { ProductFilterParams } from '@graphcommerce/magento-product'
import type { FilterFormProviderProps } from '@graphcommerce/magento-product/components/ProductFiltersPro'
import type { PluginProps, PluginConfig } from '@graphcommerce/next-config'
import React from 'react'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-product',
}

export function ProductFiltersPro(props: PluginProps<FilterFormProviderProps>) {
  const { Prev, handleSubmit: handleSubmitBase, ...rest } = props
  console.log('check dat ik hier kom')
  const sendEvent = useSendEvent()
  const handleSubmit = async (
    formValues: ProductFilterParams,
    next: (shallow?: boolean, replace?: boolean) => Promise<void>,
  ) => {
    await handleSubmitBase?.(formValues, next)
    console.log('AAAAA^Åæ', formValues)
    sendEvent('select_content', {
      content_id: 'filters',
      data: formValues,
      content_type: 'filters',
    })
  }

  return <Prev handleSubmit={handleSubmit} {...rest} />
}
