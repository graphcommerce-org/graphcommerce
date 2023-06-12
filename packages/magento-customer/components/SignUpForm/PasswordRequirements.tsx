import { useQuery } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { i18n } from '@lingui/core'

export function PasswordRequirements() {
  const requiredCharacterClassesNumber =
    useQuery(StoreConfigDocument).data?.storeConfig?.required_character_classes_number

  // The pattern used in this code is based on the validate-customer-password function in Magento 2. You can find the implementation of this function in the following link: https://github.com/magento/magento2/blob/2.4-develop/lib/web/mage/validation.js#L689-L729
  let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$/

  switch (requiredCharacterClassesNumber) {
    case '1':
      // Matches one or more digits
      pattern = /^(?=.*\d).+$/
      break
    case '2':
      // Matches a string that contains at least one digit and one lowercase letter
      pattern = /^(?=.*\d)(?=.*[a-z]).+$/

      break
    case '3':
      // Matches one or more digits, lowercase letters, or uppercase letters (matches any of the three character classes separately)
      pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+$/

      break
    default:
      break
  }

  const message = i18n._(
    /* i18n */ `Minimum of different classes of characters in password is {requiredCharacterClassesNumber}. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.`,
    { requiredCharacterClassesNumber },
  )

  return {
    value: pattern,
    message,
  }
}
