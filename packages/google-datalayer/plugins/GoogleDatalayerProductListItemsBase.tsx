import type { ProductItemsGridProps } from '@graphcommerce/magento-product'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { useForkRef } from '@mui/material'
import { useRef } from 'react'
import { DatalayerViewItemList } from '../components/DatalayerViewItemList'

export const config: PluginConfig = {
  module: '@graphcommerce/magento-product',
  type: 'component',
}

export function ProductListItemsBase(props: PluginProps<ProductItemsGridProps>) {
  const { Prev, containerRef, ...rest } = props

  const internalRef = useRef<HTMLDivElement>(null)
  const ref = useForkRef(containerRef, internalRef)

  return (
    <DatalayerViewItemList {...rest} containerRef={internalRef}>
      <Prev {...rest} containerRef={ref} />
    </DatalayerViewItemList>
  )
}
