import { extractAttributes, type CustomAttributeMetadata } from '@graphcommerce/magento-store'

export function nameFieldset(attributes: CustomAttributeMetadata[]) {
  const [nameFields] = extractAttributes(attributes, ['firstname', 'middlename', 'lastname'])
}
