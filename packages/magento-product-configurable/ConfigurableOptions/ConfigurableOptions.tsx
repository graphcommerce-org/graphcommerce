import { Controller, FieldErrors, UseControllerProps } from '@graphcommerce/ecommerce-ui'
import {
  RenderType,
  SectionHeader,
  ToggleButton,
  ToggleButtonGroup,
  extendableComponent,
} from '@graphcommerce/next-ui'
import { BaseTextFieldProps, FormHelperText, SxProps } from '@mui/material'
import React from 'react'
import { Selected, useConfigurableContext } from '../ConfigurableContext/ConfigurableContext'
import { ColorSwatchData } from '../Swatches/ColorSwatchData'
import { ImageSwatchData } from '../Swatches/ImageSwatchData'
import { TextSwatchData } from '../Swatches/TextSwatchData'
import { SwatchTypeRenderer, SwatchSize } from '../Swatches/types'

export type ConfigurableOptionsInputProps = {
  sku: string
  errors?: FieldErrors
  size?: SwatchSize
  sx?: SxProps
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & UseControllerProps<any> &
  Pick<BaseTextFieldProps, 'FormHelperTextProps' | 'helperText'> & {
    optionEndLabels?: Record<string, React.ReactNode>
  }

const renderer: SwatchTypeRenderer = { TextSwatchData, ImageSwatchData, ColorSwatchData }

const compName = 'ConfigurableOptionsInput' as const
const parts = ['buttonGroup', 'button', 'helperText'] as const
const { classes } = extendableComponent(compName, parts)

export function ConfigurableOptionsInput(props: ConfigurableOptionsInputProps) {
  const {
    sku,
    FormHelperTextProps,
    name,
    defaultValue,
    errors,
    helperText,
    optionEndLabels,
    size = 'large',
    sx,
    ...controlProps
  } = props

  const { options, selection, select, getVariants } = useConfigurableContext(sku)

  return (
    <>
      {options?.map((option) => {
        if (!option?.uid || !option.attribute_code) return null

        const { attribute_code } = option
        const error = errors?.[attribute_code]

        return (
          <Controller
            key={option.uid}
            defaultValue={selection[attribute_code] ?? ''}
            name={`${name}[${attribute_code}]`}
            {...controlProps}
            render={({
              field: { onChange, value, name: inputName, ref, onBlur },
              fieldState: { error: errorHelperText },
            }) => (
              <>
                <SectionHeader
                  labelLeft={option?.label}
                  labelRight={optionEndLabels?.[option?.attribute_code ?? '']}
                />
                <ToggleButtonGroup
                  defaultValue={selection[attribute_code] ?? ''}
                  required
                  exclusive
                  onChange={(_, val: string | number) => {
                    onChange(val)
                    select(
                      (prev) =>
                        ({
                          ...prev,
                          [attribute_code]: val,
                        }) as Selected,
                    )
                  }}
                  ref={ref}
                  onBlur={onBlur}
                  value={value}
                  className={classes.buttonGroup}
                  size={size}
                  sx={sx}
                >
                  {option?.values?.map((val) => {
                    if (!val?.uid || !option.attribute_code) return null

                    // Fall back to text swatch if no swatch is given
                    const swatch_data = val.swatch_data ?? {
                      __typename: 'TextSwatchData',
                      value: val.store_label,
                    }

                    const copySelection = { ...selection }
                    delete copySelection[attribute_code]

                    const itemVariant = getVariants(copySelection).find((variant) =>
                      variant?.attributes?.find((attribute) => attribute?.uid === val.uid),
                    )

                    return (
                      <ToggleButton
                        key={val.uid}
                        value={val.uid ?? ''}
                        name={inputName}
                        className={classes.button}
                        disabled={!itemVariant}
                        size={size}
                      >
                        <RenderType
                          renderer={renderer}
                          {...val}
                          {...swatch_data}
                          price={itemVariant?.product?.price_range.minimum_price.final_price}
                          size={size}
                        />
                      </ToggleButton>
                    )
                  })}
                </ToggleButtonGroup>
                {error && (
                  <FormHelperText
                    error
                    {...FormHelperTextProps}
                    className={classes.helperText}
                    sx={{
                      position: 'absolute',
                    }}
                  >
                    {`${option.label} is ${errorHelperText?.type}`}
                  </FormHelperText>
                )}
              </>
            )}
          />
        )
      })}
    </>
  )
}
