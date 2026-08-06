---
'@graphcommerce/magento-cart-shipping-address': patch
'@graphcommerce/magento-customer': patch
'@graphcommerce/magento-cart': patch
---

Address forms now honor Magento's `customer/address/telephone_show` configuration instead of silently submitting a `000 - 000 0000` placeholder telephone.

`CartAddressInput.telephone` is a non-nullable `String!`, so the address forms always had to send a value; because the mutation variable is declared as an optional `String`, `required.telephone` resolved to `false` and the field rendered as optional, after which `onBeforeSubmit` substituted the placeholder. Every checkout that skipped the field therefore stored a fake phone number on the order.

Magento does expose whether a telephone is required — `attributesForm(formCode: "customer_address_edit")` returns `is_required` per address attribute and reflects `customer/address/telephone_show`. The new `useTelephoneRequired()` hook (`@graphcommerce/magento-customer`) reads that metadata, and `ShippingAddressForm`, `EditBillingAddressForm` and `EditAddressForm` use it to mark the field required. When Magento reports the telephone as optional an empty string is submitted instead of the placeholder; the placeholder is only used while the metadata hasn't loaded yet, so shops that require a telephone keep working.
