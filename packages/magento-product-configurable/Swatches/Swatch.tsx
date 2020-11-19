import { Chip } from '@material-ui/core'
import {
  ColorSwatchData,
  ConfigurableProductOptions,
  ConfigurableProductOptionsValues,
  ImageSwatchData,
  Maybe,
  SwatchDataInterface,
  TextSwatchData,
} from '@reachdigital/magento-graphql'
import React from 'react'

export type SwatchAvatarProps =
  | (ConfigurableProductOptionsValues & {
      swatch_data?: Maybe<SwatchDataInterface> &
        Maybe<ImageSwatchData> &
        Maybe<ColorSwatchData> &
        Maybe<TextSwatchData>
    })
  | null

export type SwatchProps = {
  option?: Maybe<ConfigurableProductOptions>
  avatar?: (props: SwatchAvatarProps) => JSX.Element
  onChange: any // (attribute_code?: string | null, value_index?: number | null) => void
  selected: { [index: string]: string[] }
}

export default function Swatch(props: SwatchProps) {
  const { option, avatar, onChange, selected } = props

  return (
    <div>
      {option?.values?.map((value) => {
        return (
          <Chip
            key={value?.value_index ?? ''}
            label={value?.store_label}
            clickable
            onClick={onChange(option?.attribute_code, value?.value_index)}
            variant='outlined'
            color={
              selected[option?.attribute_code ?? '']?.includes(String(value?.value_index))
                ? 'primary'
                : 'default'
            }
            avatar={avatar && avatar(value)}
          />
        )
      })}
    </div>
  )
}
