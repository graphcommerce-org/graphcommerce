import type { Control, FieldValues } from '@graphcommerce/react-hook-form'
import type { SxProps, Theme } from '@mui/material'
import type { CustomAttributeMetadata, CustomAttributeMetadataTypename } from './useAttributesForm'

export type AttributeFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  Typename extends CustomAttributeMetadataTypename = CustomAttributeMetadataTypename,
> = {
  control: Control<TFieldValues>
  sx?: SxProps<Theme>
  metadata: CustomAttributeMetadata<Typename>
}

export function AttributeFormField<
  TFieldValues extends FieldValues = FieldValues,
  Typename extends CustomAttributeMetadataTypename = CustomAttributeMetadataTypename,
>(props: AttributeFormFieldProps<TFieldValues, Typename>) {
  const { metadata, control, sx } = props

  if (process.env.NODE_ENV === 'production') return null

  return (
    <div>
      Please specify a renderer for {metadata.__typename}:{metadata.code}
    </div>
  )
}
