import {
  extractAttributes,
  type AttributeFormAutoLayoutFieldset,
  type CustomAttributeMetadata,
} from '@graphcommerce/magento-store'
import { Trans } from '@lingui/macro'

export function nameFieldset(
  attributes: CustomAttributeMetadata[],
  withLabel = true,
): AttributeFormAutoLayoutFieldset {
  const nameFields = extractAttributes(attributes, [
    'prefix',
    'firstname',
    'middlename',
    'lastname',
    'suffix',
  ])[0].map((f) => f.code)

  const additional = extractAttributes(attributes, ['dob', 'gender'])[0].map((f) => f.code)

  return {
    label: withLabel ? <Trans id='Name'>Name</Trans> : undefined,
    gridAreas: [...nameFields, ...additional],
    // xs is shown in one column by default
    sx: {
      gridTemplateAreas: {
        md: [`"${nameFields.join(' ')}"`, `"${additional.join(' ')}"`].join(' '),
      },
    },
  }
}
