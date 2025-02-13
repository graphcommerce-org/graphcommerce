import {
  nonNullable,
  SectionContainer,
  sxx,
  type SectionContainerProps,
} from '@graphcommerce/next-ui'
import type { Control, FieldValues } from '@graphcommerce/react-hook-form'
import { Box, type SxProps, type Theme } from '@mui/material'
import { AttributeFormField, type AttributeFormFieldProps } from './AttributeFormField'
import type {
  CustomAttributeMetadata,
  CustomAttributeMetadataTypename,
  GridArea,
} from './useAttributesForm'

export type AttributeFormAutoLayoutFieldset = {
  label?: React.ReactNode
  gridAreas: GridArea[]
  sx?: SxProps<Theme>
}

export type AttributeFormAutoLayoutProps<
  TFieldValues extends FieldValues = FieldValues,
  Typename extends CustomAttributeMetadataTypename = CustomAttributeMetadataTypename,
> = {
  control: Control<TFieldValues>
  fieldsets?: AttributeFormAutoLayoutFieldset[]
  attributes: CustomAttributeMetadata<Typename, NoInfer<TFieldValues>>[]
  render?: React.FC<AttributeFormFieldProps<NoInfer<TFieldValues>, Typename>>
  sectionContainer?: Omit<SectionContainerProps, 'labelLeft'>
}

export function AttributesFormAutoLayout<
  TFieldValues extends FieldValues = FieldValues,
  Typename extends CustomAttributeMetadataTypename = CustomAttributeMetadataTypename,
>(props: AttributeFormAutoLayoutProps<TFieldValues, Typename>) {
  const {
    control,
    fieldsets,
    attributes: incomingAttributes,
    render: Component = AttributeFormField,
    sectionContainer,
  } = props

  let itemsRemaining = incomingAttributes
  const byFieldSet = (fieldsets ?? []).map(({ gridAreas, ...rest }) => ({
    ...rest,
    attributes: gridAreas
      .map((gridArea) => {
        const item = itemsRemaining.find((i) => i.gridArea === gridArea)
        if (item) itemsRemaining = itemsRemaining.filter((i) => i.gridArea !== item.gridArea)
        return item
      })
      .filter(nonNullable),
  }))

  if (itemsRemaining.length > 0) byFieldSet.push({ label: 'Other', attributes: itemsRemaining })

  return byFieldSet.map((fieldSet) => {
    const key = fieldSet.attributes.map((fieldName) => fieldName.gridArea).join('-')

    const fields = (
      <Box
        sx={sxx(
          (theme) => ({
            display: 'grid',
            gridTemplateAreas: fieldSet.attributes
              .map((metadata) => `"${metadata.gridArea}"`)
              .join('\n'),
            py: theme.spacings.xs,
            columnGap: theme.spacings.xs,
            rowGap: theme.spacings.xxs,
          }),
          fieldSet.sx,
        )}
      >
        {fieldSet.attributes.map((metadata) => (
          <Component key={metadata.gridArea} control={control} metadata={metadata} />
        ))}
      </Box>
    )

    return fieldSet.label ? (
      <SectionContainer labelLeft={fieldSet.label} key={key} {...sectionContainer}>
        {fields}
      </SectionContainer>
    ) : (
      fields
    )
  })
}
