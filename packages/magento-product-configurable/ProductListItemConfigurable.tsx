import { cloneDeep } from '@apollo/client/utilities'
import { useProductListParamsContext } from '@reachdigital/magento-category/CategoryPageContext'
import ProductListItem, {
  Area,
  ProductListItemProps,
} from '@reachdigital/magento-product/ProductListItem'
import {
  FilterTypes,
  isFilterTypeEqual,
} from '@reachdigital/magento-product/ProductListItems/filterTypes'
import React, { useState } from 'react'
import { ProductListItemConfigurableFragment } from './ProductListITemConfigurable.gql'
import ColorSwatch from './Swatches/ColorSwatch'
import ImageSwatch from './Swatches/ImageSwatch'
import Swatch from './Swatches/Swatch'

export type ActionsComponentProps = ProductListItemConfigurableFragment & {
  variant?: NonNullable<ProductListItemConfigurableFragment['variants']>[0]
}

export type ProdustListItemConfigurableProps = ProductListItemConfigurableFragment &
  ProductListItemProps & {
    filterTypes: FilterTypes
    Actions?: React.VFC<ActionsComponentProps>
    swatchesRecord: Record<Area, string[]>
  }

export default function ProductListItemConfigurable(props: ProdustListItemConfigurableProps) {
  const {
    Actions,
    variants,
    configurable_options,
    filterTypes,
    children,
    swatchesRecord,
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

  const onSelectProductVariant = (
    attribute_code?: string | null,
    value_index?: number | null,
  ) => () => {
    if (!attribute_code || !value_index) return

    const newSelected = cloneDeep(selected)

    if (newSelected[attribute_code] && newSelected[attribute_code].length) {
      newSelected[attribute_code] = newSelected[attribute_code].filter(
        (val) => val !== String(value_index),
      )
    } else {
      newSelected[attribute_code] = [String(value_index)]
    }

    setSelected(newSelected)
  }

  const convertSwatchDataToComponents = (
    swRecord: Record<Area, string[]>,
  ): Record<Area, React.ReactNode[]> => {
    const locationSwatchPair: Record<Area, React.ReactNode[]> = {
      topLeft: [],
      topRight: [],
      bottomLeft: [],
      bottomRight: [],
    }

    for (const [cornerLocation, swatchesAttrCodes] of Object.entries(swRecord)) {
      swatchesAttrCodes.forEach((swatchAttrCode) => {
        const confOption = configurable_options?.find(
          (swData) => swData?.attribute_code === swatchAttrCode,
        )
        const swatchType = confOption?.values?.[0]?.swatch_data?.__typename

        switch (swatchType) {
          case 'ColorSwatchData':
            locationSwatchPair[cornerLocation].push(
              <ColorSwatch
                option={confOption}
                key={confOption?.id}
                onChange={onSelectProductVariant}
                selected={selectedState}
              />,
            )
            break
          case 'ImageSwatchData':
            locationSwatchPair[cornerLocation].push(
              <ImageSwatch
                option={confOption}
                key={confOption?.id}
                onChange={onSelectProductVariant}
                selected={selectedState}
              />,
            )
            break
          default:
            locationSwatchPair[cornerLocation].push(
              <Swatch
                option={confOption}
                key={confOption?.id}
                onChange={onSelectProductVariant}
                selected={selectedState}
              />,
            )
        }
      })
    }

    return locationSwatchPair
  }

  return (
    <ProductListItem {...productProps} {...convertSwatchDataToComponents(swatchesRecord)}>
      {Actions && <Actions {...configurableProduct} variant={matchingVariants?.[0]} />}
      {children}
    </ProductListItem>
  )
}
