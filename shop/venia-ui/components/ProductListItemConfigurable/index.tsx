import React from 'react'
import { Chip } from '@material-ui/core'
import ProductListItemSimple from '../ProductListItemSimple'

export default function ProductListItemConfigurable(props: GQLProductListItemConfigurableFragment) {
  const { variants, configurable_options } = props
  // console.log(variants, configurable_options)

  return (
    <ProductListItemSimple {...props}>
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
                      variant='outlined'
                      avatar={
                        <div
                          style={{ backgroundColor: value.swatch_data.value, borderRadius: '50%' }}
                        />
                      }
                    />
                  )
                case 'ImageSwatchData':
                  return (
                    <img
                      src={value.swatch_data.thumbnail}
                      key={value.value_index}
                      alt={value.swatch_data.value}
                    />
                  )
                default:
                  return (
                    <Chip
                      variant='outlined'
                      key={value.value_index}
                      label={value.store_label}
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
