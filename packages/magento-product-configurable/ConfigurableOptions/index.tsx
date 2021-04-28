import { BaseTextFieldProps, FormHelperText, makeStyles, Theme } from '@material-ui/core'
import RenderType from '@reachdigital/next-ui/RenderType'
import SectionContainer from '@reachdigital/next-ui/SectionContainer'
import ToggleButton from '@reachdigital/next-ui/ToggleButton'
import ToggleButtonGroup from '@reachdigital/next-ui/ToggleButtonGroup'
import { Controller, FieldErrors, UseControllerProps } from '@reachdigital/react-hook-form'
import React from 'react'
import { Selected, useConfigurableContext } from '../ConfigurableContext'
import { SwatchTypeRenderer, SwatchSize } from '../Swatches'
import ColorSwatchData from '../Swatches/ColorSwatchData'
import ImageSwatchData from '../Swatches/ImageSwatchData'
import TextSwatchData from '../Swatches/TextSwatchData'

type ConfigurableOptionsProps = {
  sku: string
  errors?: FieldErrors
} & UseControllerProps<any> &
  Pick<BaseTextFieldProps, 'FormHelperTextProps' | 'helperText'> & {
    optionSectionEndLabels?: Record<string, React.ReactNode>
  }

const useStyles = makeStyles(
  (theme: Theme) => ({
    borderBottom: {
      borderBottom: 'none',
      padding: `${theme.spacings.xxs} 0`,
    },
    toggleButtonGroup: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: theme.spacings.xxs,
      marginBottom: theme.spacings.xxs,
    },
    button: {
      minHeight: theme.spacings.lg,
      border: '2px solid transparent',
      backgroundColor: theme.palette.background.default,
      borderRadius: 4,
      boxShadow: `0px 0px 2px ${theme.palette.grey[400]}`,
      '&$selected': {
        border: `2px solid ${theme.palette.primary.main}`,
        boxShadow: `unset`,
      },
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
    optionSectionEndLabels,
    ...controlProps
  } = props

  const { options, selection, select, cheapest, getVariants } = useConfigurableContext(sku)
  const classes = useStyles()

  return (
    <>
      {options?.map((option) => {
        if (!option?.id || !option.attribute_code) return null

        const { attribute_code } = option
        const error = errors?.[attribute_code]

        return (
          <Controller
            key={option.id}
            defaultValue={selection[attribute_code] ?? ''}
            name={`${name}[${attribute_code}]`}
            {...controlProps}
            render={({ field: { onChange, value, name: inputName, ref, onBlur } }) => (
              <SectionContainer
                label={`choose your ${option?.label}`}
                endLabel={
                  optionSectionEndLabels && option?.label
                    ? optionSectionEndLabels[option.label.toLowerCase()]
                    : undefined
                }
                classes={{
                  labelInnerContainer: classes.borderBottom,
                }}
                borderBottom={false}
              >
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
                    if (!val?.swatch_data || !val.value_index || !option.attribute_code) return null
                    const itemVariant = getVariants(selection).find((variant) =>
                      variant?.attributes?.find(
                        (attribute) => attribute?.value_index === val.value_index,
                      ),
                    )

                    return (
                      <ToggleButton
                        key={val.value_index}
                        value={val.value_index ?? ''}
                        name={inputName}
                        classes={{ root: classes.button }}
                      >
                        <RenderType
                          renderer={renderer}
                          {...val}
                          {...val.swatch_data}
                          price={itemVariant?.product?.price_range.minimum_price.final_price}
                          size={'large' as SwatchSize}
                        />
                      </ToggleButton>
                    )
                  })}
                </ToggleButtonGroup>
                {error && (
                  <FormHelperText error {...FormHelperTextProps}>
                    {helperText}
                  </FormHelperText>
                )}
              </SectionContainer>
            )}
          />
        )
      })}
    </>
  )
}
