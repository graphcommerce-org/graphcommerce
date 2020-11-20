import { cloneDeep } from '@apollo/client/utilities'
import { useProductListParamsContext } from '@reachdigital/magento-category/CategoryPageContext'
import ProductListItem, {
  SwatchLocationKeys,
  ProductListItemProps,
} from '@reachdigital/magento-product/ProductListItem'
import {
  FilterTypes,
  isFilterTypeEqual,
} from '@reachdigital/magento-product/ProductListItems/filterTypes'
import React, { useState } from 'react'
import { ProductListItemConfigurableFragment } from './ProductListITemConfigurable.gql'
import SwatchList from './SwatchList'

export type ActionsComponentProps = ProductListItemConfigurableFragment & {
  variant?: NonNullable<ProductListItemConfigurableFragment['variants']>[0]
}

export type ProdustListItemConfigurableProps = ProductListItemConfigurableFragment &
  ProductListItemProps & {
    filterTypes: FilterTypes
    Actions?: React.VFC<ActionsComponentProps>
    swatchLocations: Record<SwatchLocationKeys, string[]>
  }

export default function ProductListItemConfigurable(props: ProdustListItemConfigurableProps) {
  const {
    Actions,
    variants,
    configurable_options,
    filterTypes,
    children,
    swatchLocations,
    ...configurableProduct
  } = props
  const { params } = useProductListParamsContext()
  const [selectedState, setSelected] = useState<{ [index: string]: string[] }>({})

  const options: [string, string[]][] =
    configurable_options
      ?.filter(
        (option) =>
          params.filters[option?.attribute_code ?? ''] &&
          isFilterTypeEqual(params.filters[option?.attribute_code ?? '']),
      )
      .map((option) => {
        const filter = params.filters[option?.attribute_code ?? '']
        return [option?.attribute_code ?? '', (filter?.in as string[]) ?? []]
      }) ?? []

  const selected = cloneDeep(selectedState)

  options.forEach(([attr, values]) => {
    if (!selected[attr]) selected[attr] = values
  })

  const matchingVariants = variants?.filter(
    (variant) =>
      variant?.attributes?.filter(
        (attribute) =>
          selected[attribute?.code ?? ''] !== undefined &&
          selected[attribute?.code ?? ''].includes(String(attribute?.value_index)),
      ).length,
  )

  const productProps = matchingVariants?.[0]?.product
    ? { ...configurableProduct, ...matchingVariants?.[0]?.product }
    : configurableProduct

  // const onSelectProductVariant = (
  //   attribute_code?: string | null,
  //   value_index?: number | null,
  // ) => () => {
  //   if (!attribute_code || !value_index) return

  //   const newSelected = cloneDeep(selected)

  //   if (newSelected[attribute_code] && newSelected[attribute_code].length) {
  //     newSelected[attribute_code] = newSelected[attribute_code].filter(
  //       (val) => val !== String(value_index),
  //     )
  //   } else {
  //     newSelected[attribute_code] = [String(value_index)]
  //   }

  //   setSelected(newSelected)
  // }

  // merge unused swatches with the swatches assigned to the bottom right corner
  const usedSwatchAttrCodes = Object.values(swatchLocations).flat()
  const unusedSwatchAttrCodes =
    configurable_options
      ?.filter((option) => !usedSwatchAttrCodes.includes(option?.attribute_code ?? ''))
      .map((option) => option?.attribute_code ?? '') ?? []

  swatchLocations.bottomRight = [...swatchLocations.bottomRight, ...unusedSwatchAttrCodes]

  return (
    <ProductListItem
      {...productProps}
      topLeft={
        <SwatchList
          attributes={swatchLocations.topLeft}
          configurable_options={configurable_options}
        />
      }
      topRight={
        <SwatchList
          attributes={swatchLocations.topRight}
          configurable_options={configurable_options}
        />
      }
      bottomLeft={
        <SwatchList
          attributes={swatchLocations.bottomLeft}
          configurable_options={configurable_options}
        />
      }
      bottomRight={
        <SwatchList
          attributes={swatchLocations.bottomRight}
          configurable_options={configurable_options}
        />
      }
    >
      {Actions && <Actions {...configurableProduct} variant={matchingVariants?.[0]} />}
      {children}
    </ProductListItem>
  )
}
