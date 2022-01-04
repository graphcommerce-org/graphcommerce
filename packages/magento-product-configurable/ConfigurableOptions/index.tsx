import { RenderType, SectionHeader, ToggleButton, ToggleButtonGroup } from '@graphcommerce/next-ui'
import { Controller, FieldErrors, UseControllerProps } from '@graphcommerce/react-hook-form'
import { BaseTextFieldProps, FormHelperText, Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react'
import { Selected, useConfigurableContext } from '../ConfigurableContext'
import { SwatchTypeRenderer, SwatchSize } from '../Swatches'
import ColorSwatchData from '../Swatches/ColorSwatchData'
import ImageSwatchData from '../Swatches/ImageSwatchData'
import TextSwatchData from '../Swatches/TextSwatchData'

export type ConfigurableOptionsProps = {
  sku: string
  errors?: FieldErrors
} & UseControllerProps<any> &
  Pick<BaseTextFieldProps, 'FormHelperTextProps' | 'helperText'> & {
    optionEndLabels?: Record<string, React.ReactNode>
  }

export const useStyles = makeStyles(
  (theme: Theme) => ({
    toggleButtonGroup: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: theme.spacings.xs,
    },
    button: {
      minHeight: theme.spacings.lg,
    },
    helperText: {
      position: 'absolute',
    },
  }),
  { name: 'ConfigurableOptions' },
)

const renderer: SwatchTypeRenderer = { TextSwatchData, ImageSwatchData, ColorSwatchData }

export default function ConfigurableOptionsInput(props: ConfigurableOptionsProps) {
  const {
    sku,
    FormHelperTextProps,
    name,
    defaultValue,
    errors,
    helperText,
    optionEndLabels,
    ...controlProps
  } = props

  const { options, selection, select, getVariants } = useConfigurableContext(sku)
  const classes = useStyles()

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
                  minWidth={100}
                  onChange={(_, val: string | number) => {
                    onChange(val)
                    select((prev) => ({ ...prev, [attribute_code]: val } as Selected))
                  }}
                  ref={ref}
                  onBlur={onBlur}
                  value={value}
                  classes={{ root: classes.toggleButtonGroup }}
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
                      >
                        <RenderType
                          renderer={renderer}
                          {...val}
                          {...swatch_data}
                          price={itemVariant?.product?.price_range.minimum_price.final_price}
                          size={'large' as SwatchSize}
                        />
                      </ToggleButton>
                    )
                  })}
                </ToggleButtonGroup>
                {error && (
                  <FormHelperText error {...FormHelperTextProps} className={classes.helperText}>
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
