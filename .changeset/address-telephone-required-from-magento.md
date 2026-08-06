---
'@graphcommerce/magento-cart-shipping-address': patch
'@graphcommerce/magento-customer': patch
'@graphcommerce/magento-cart': patch
---

Address forms now honor Magento's `customer/address/telephone_show` configuration instead of silently submitting a `000 - 000 0000` placeholder telephone.

`CartAddressInput.telephone` is a non-nullable `String!`, so the address forms always had to send a value; because the mutation variable is declared as an optional `String`, `required.telephone` resolved to `false` and the field rendered as optional, after which `onBeforeSubmit` substituted the placeholder. Every checkout that skipped the field therefore stored a fake phone number on the order.

Magento does expose whether a telephone is required — `attributesForm(formCode: "customer_address_edit")` returns `is_required` per address attribute and reflects `customer/address/telephone_show`. `ShippingAddressForm`, `EditBillingAddressForm` and `EditAddressForm` now read that metadata through the existing `useAttributesForm` hook and mark the field required accordingly. When Magento reports the telephone as optional an empty string is submitted instead of the placeholder.

Pages that render these forms should preload the metadata in `getStaticProps` with `await preloadAttributesForm(client, 'customer_address_edit')`, the same way the account pages already preload `customer_account_create` / `customer_account_edit`. The examples do this for the checkout and address pages, which also closes the window where a customer could submit before the metadata resolved.
