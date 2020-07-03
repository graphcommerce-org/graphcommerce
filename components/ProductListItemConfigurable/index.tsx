import React, { useState } from 'react'
import { Chip } from '@material-ui/core'
import { FilterTypeMap, isFilterTypeEqual } from 'components/ProductList'
import { useProductListParamsContext } from 'components/CategoryPage/CategoryPageContext'
import cloneDeep from 'clone-deep'
import ProductListItemSimple from '../ProductListItemSimple'

type ProdustListItemConfigurableProps = GQLProductListItemConfigurableFragment & {
  filterTypeMap: FilterTypeMap
}

export default function ProductListItemConfigurable(props: ProdustListItemConfigurableProps) {
  const { variants, configurable_options, filterTypeMap, ...configurableProduct } = props
  const { params } = useProductListParamsContext()

  const options: [string, string[]][] = configurable_options
    .filter(
      (option) =>
        params.filters[option.attribute_code] &&
        isFilterTypeEqual(params.filters[option.attribute_code]),
    )
    .map((option) => {
      const filter = params.filters[option.attribute_code] as GQLFilterEqualTypeInput
      return [option.attribute_code, filter?.in || []]
    })

  const [selectedState, setSelected] = useState<{ [index: string]: string[] }>({})

  const selected = cloneDeep(selectedState)
  options.forEach(([attr, values]) => {
    if (!selected[attr]) selected[attr] = values
  })

  const matchingVariants = variants.filter(
    ({ attributes }) =>
      attributes.filter(
        (attribute) =>
          selected[attribute.code] !== undefined &&
          selected[attribute.code].includes(String(attribute.value_index)),
      ).length,
  )

  const productProps = matchingVariants.length ? matchingVariants[0].product : configurableProduct

  const onClick = (attribute_code: string, value_index: number) => () => {
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

  return (
    <ProductListItemSimple {...productProps}>
      {configurable_options.map((option) => {
        return (
          <div key={option.id}>
            {option.values.map((value) => {
              switch (value.swatch_data.__typename) {
                case 'ColorSwatchData':
                  return (
                    <Chip
                      key={value.value_index}
                      label={value.store_label}
                      clickable
                      onClick={onClick(option.attribute_code, value.value_index)}
                      variant='outlined'
                      color={
                        selected[option.attribute_code]?.includes(String(value.value_index))
                          ? 'primary'
                          : 'default'
                      }
                      avatar={
                        <div
                          style={{
                            backgroundColor: value.swatch_data.value,
                            borderRadius: '50%',
                          }}
                        />
                      }
                    />
                  )
                case 'ImageSwatchData':
                  return (
                    <Chip
                      key={value.value_index}
                      label={value.store_label}
                      clickable
                      onClick={onClick(option.attribute_code, value.value_index)}
                      variant='outlined'
                      color={
                        selected[option.attribute_code]?.includes(String(value.value_index))
                          ? 'primary'
                          : 'default'
                      }
                      avatar={
                        <img
                          src={value.swatch_data.thumbnail}
                          key={value.value_index}
                          alt={value.swatch_data.value}
                        />
                      }
                    />
                  )
                default:
                  return (
                    <Chip
                      variant='outlined'
                      onClick={onClick(option.attribute_code, value.value_index)}
                      key={value.value_index}
                      label={value.store_label}
                      color={
                        selected[option.attribute_code]?.includes(String(value.value_index))
                          ? 'primary'
                          : 'default'
                      }
                      clickable
                    />
                  )
              }
            })}
          </div>
        )
      })}
    </ProductListItemSimple>
  )
}
