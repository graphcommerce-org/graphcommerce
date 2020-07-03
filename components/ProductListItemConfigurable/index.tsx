import React, { useState } from 'react'
import { Chip } from '@material-ui/core'
import { FilterTypeMap } from 'components/ProductList'
import { useProductListParamsContext } from 'components/CategoryPage/CategoryPageContext'
import ProductListItemSimple from '../ProductListItemSimple'

type ProdustListItemConfigurableProps = GQLProductListItemConfigurableFragment & {
  filterTypeMap: FilterTypeMap
}

export default function ProductListItemConfigurable(props: ProdustListItemConfigurableProps) {
  const { variants, configurable_options, filterTypeMap, ...configurableProduct } = props
  const { params } = useProductListParamsContext()

  // configurable_options.map((option) => {
  //   const filter = params.filters[option.attribute_code]
  // })

  const [selected, setSelected] = useState<{ [index: string]: number }>({})

  const selectedEntries = Object.entries(selected)
  const variant = variants.find(({ attributes }) => {
    if (!selectedEntries.length) return false
    return selectedEntries.find(
      ([code, idx]) => attributes.find((attribute) => attribute.code === code)?.value_index === idx,
    )
  })
  const productProps = variant ? variant.product : configurableProduct

  const onClick = (attribute_code: string, value_index: number) => () => {
    setSelected({ ...selected, [attribute_code]: value_index })
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
                        selected[option.attribute_code] === value.value_index
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
                        selected[option.attribute_code] === value.value_index
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
                        selected[option.attribute_code] === value.value_index
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
