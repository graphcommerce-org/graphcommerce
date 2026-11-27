import {
  extractAttributes,
  type AttributeFormAutoLayoutFieldset,
  type CustomAttributeMetadata,
} from '@graphcommerce/magento-store'
import { Trans } from '@lingui/react/macro'

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

  // Skip empty rows — an empty `""` row produces invalid `grid-template-areas`
  // and silently makes the whole declaration fall back to the default
  // single-column layout. Hit when a store doesn't register `dob`/`gender` on
  // the registration form, leaving `additional` empty.
  const rows = [nameFields, additional]
    .filter((row) => row.length > 0)
    .map((row) => `"${row.join(' ')}"`)

  return {
    label: withLabel ? <Trans>Name</Trans> : undefined,
    gridAreas: [...nameFields, ...additional],
    // xs is shown in one column by default
    sx: {
      gridTemplateAreas: {
        md: rows.join(' '),
      },
    },
  }
}
