---
'@graphcommerce/magento-customer': minor
---

Magento 2.4.7: Implemented the `customer_account_create` and `customer_account_edit` forms using the `attributeForm` query for the registration page and customer information form. The forms respect the settings configured in the 'Customer Configuration section'. It allows configuration for `prefix`, `middlename`, `suffix`,`dob`, `gender` and other fields. This also makes the frontend compatible with Adobe Commerce's Customer Attributes module.
