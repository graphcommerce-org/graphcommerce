import { Image } from '@graphcommerce/image'
import { useFormProductAddToCart } from '@graphcommerce/magento-product'
import { SectionHeader, ActionCard } from '@graphcommerce/next-ui'
import {
  ActionCardItemRenderProps,
  ActionCardListForm,
} from '@graphcommerce/next-ui/ActionCard/ActionCardListForm'
import { Trans } from '@lingui/react'
import { BaseTextFieldProps, Box } from '@mui/material'
import React, { useEffect } from 'react'
import { ConfigurableProductConfigurationsFragment } from '../graphql'
import { useConfigurableTypeProduct } from '../hooks'

export type ConfigurableOptionsInputProps = Pick<
  BaseTextFieldProps,
  'FormHelperTextProps' | 'helperText'
> & {
  optionEndLabels?: Record<string, React.ReactNode>
}

type ConfigurableOptionsActionCardProps = ActionCardItemRenderProps<
  | NonNullable<
      NonNullable<
        NonNullable<ConfigurableProductConfigurationsFragment['configurable_options']>[0]
      >['values']
    >[0]
  | null
  | undefined
>

function ConfigurableOptionsActionCard(cardProps: ConfigurableOptionsActionCardProps) {
  const { value, swatch_data, store_label } = cardProps

  const color = swatch_data?.__typename === 'ColorSwatchData' && (
    <Box
      sx={{
        width: '50px',
        height: '50px',
        backgroundColor: swatch_data.value,
        borderRadius: '50%',
      }}
    />
  )

  const image = swatch_data?.__typename === 'ImageSwatchData' && (
    <Image
      src={swatch_data.value ?? ''}
      sx={{
        width: '50px',
        height: '50px',
        aspectRatio: '1/1',
        borderRadius: '50%',
      }}
    />
  )

  const imageComp = color ?? image ?? undefined

  return (
    <ActionCard
      key={value}
      {...cardProps}
      image={imageComp}
      title={swatch_data?.value ?? store_label}
      details={swatch_data?.value ? store_label : undefined}
      hidden={false}
      variant='outlined'
      // sx={(theme) => ({
      //   // border: `1px solid ${theme.palette.divider}`,
      //   // borderRadius: theme.shape.borderRadius,
      //   // '&:first-of-type': {
      //   //   borderRadius: theme.shape.borderRadius,
      //   // },
      //   // '&:last-of-type': {
      //   //   borderRadius: theme.shape.borderRadius,
      //   // },
      // })}
    />
  )
}

export function ConfigurableOptionsInput(props: ConfigurableOptionsInputProps) {
  const { optionEndLabels } = props
  const form = useFormProductAddToCart()
  const { control } = form

  const typeProduct = useConfigurableTypeProduct()

  return (
    <>
      {typeProduct?.configurable_options?.map((option, index) => {
        if (!option?.uid || !option.attribute_code) return null

        const fieldName = `selectedOptions.${index}` as const
        const { values, label } = option
        return (
          <React.Fragment key={fieldName}>
            <SectionHeader
              labelLeft={label}
              labelRight={optionEndLabels?.[option?.attribute_code ?? '']}
            />
            <ActionCardListForm
              key={fieldName}
              name={fieldName}
              control={control}
              required
              items={(values ?? []).map((ov) => ({
                value: ov?.uid ?? '',
                ...ov,
              }))}
              error={false}
              render={ConfigurableOptionsActionCard}
              errorMessage={
                <Trans
                  id='Please select a value for {0}'
                  values={{ 0: label?.toLocaleLowerCase() }}
                />
              }
              sx={(theme) => ({
                // display: 'grid',
                // gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                // gap: theme.spacings.xxs,
              })}
            />
          </React.Fragment>
        )
      })}
    </>
  )
}
