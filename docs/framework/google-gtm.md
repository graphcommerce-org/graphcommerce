---
menu: Google TagManager / Analytics
---

# Google Libraries

GraphCommerce integrates with Google Analytics and Google Tagmanager and offers
a generic Datalayer solution that can be used for other analytics tools.

---

- [Google Analytics](#google-analytics)
- [Google Tag Manager](#google-tag-manager)
- [Google Datalayer](#datalayer)
- [Google Recapatcha](#core)

---

## Google TagManager

The `@graphcommerce/googletagmanager` package makes it easy to add **Google Tag
Manager (GTM)** to your GraphCommerce webshop.

1. **Install the Package:** Ensure you have installed the
   `@graphcommerce/googleanalytics` package.
2. **Configuration:** Add the following configuration values in your
   `graphcommerce.config.js`:

   ```js
   // graphcommerce.config.js
   const config = {
     googleTagmanagerId: 'GTM-X1X1X1X',

     storefront: [
       { locale: 'en', magentoStoreCode: 'en_US', defaultLocale: true },
       {
         locale: 'nl',
         magentoStoreCode: 'nl_NL',
         googleTagmanagerId: 'GTM-X2X2X2X', // Optionally override per storeview
       },
     ],
   }
   ```

3. **GTM Setup:** Ensure you have set up your GTM account and container:

![gtm-1](https://github.com/user-attachments/assets/84242ef2-f4e6-4d86-a396-8f48a075f0f9)
![gtm-2](https://github.com/user-attachments/assets/9615db7c-b3db-428a-ada6-42ae4d7196f2)
![gtm-3](https://github.com/user-attachments/assets/a23b1d13-90a4-4bb2-8c16-1f42e887babc)
![gtm-4](https://github.com/user-attachments/assets/a56d9893-839c-45a2-8121-a61759fa7baf)
![gtm-5](https://github.com/user-attachments/assets/d4c2c003-8868-470e-9223-ce960ca22510)

## Google Analytics

The `@graphcommerce/googleanalytics` package makes it easy to add Google
Analytics GA4 to your GraphCommerce webshop.

❗️ You probably want to use GTM instead of Google Analytics directly through the
datalayer. You should probably never use Google Analytics AND GTM at the same
time.

### Installation

To use this package, follow these steps:

1. **Install the Package:** Ensure you have installed the
   `@graphcommerce/googleanalytics` package.
2. **Configuration:** Add the following configuration values in your
   `graphcommerce.config.js`:

   ```js
   // graphcommerce.config.js
   const config = {
     googleAnalyticsId: 'GTM-X1X1X1X',

     storefront: [
       { locale: 'en', magentoStoreCode: 'en_US', defaultLocale: true },
       {
         locale: 'nl',
         magentoStoreCode: 'nl_NL',
         googleAnalyticsId: 'GTM-X2X2X2X', // Optionally override per storeview
       },
     ],
   }
   ```

### Configure Google analytics

Configure the `Page changes based on browser history events.` in Google
Analytics. Refer to the
[official documentation](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications?implementation=browser-history#implement_single-page_application_measurement)
for more details.

## Datalayer

### Supported Events

The following events are supported by default in GraphCommerce:

- `add_to_cart`
- `add_to_cart_error` (custom)
- `view_cart`
- `begin_checkout`
- `add_payment_info`
- `purchase`
- `view_item_list`
- `select_item`
- `remove_from_cart`
- `add_shipping_info`
- `remove_from_cart`
- `view_item`
- `cwv_* metrics`

### Core web vitals

Enable core web vitals tracking.

```js
const config = {
  dataLayer: { coreWebVitals: true },
}
```

## Google Recaptcha

1. **Install the Package:** Ensure you have installed the
   `@graphcommerce/googleanalytics` package.
2. **Configuration:** Add the following configuration values in your
   `graphcommerce.config.js`:

   ```js
   // graphcommerce.config.js
   const config = {
     googleRecaptchaKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

     storefront: [
       { locale: 'en', magentoStoreCode: 'en_US', defaultLocale: true },
       {
         locale: 'nl',
         magentoStoreCode: 'nl_NL',
         googleRecaptchaKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // Optionally override per storeview
       },
     ],
   }
   ```

## Next Steps

- Learn about [Translations](../framework/translations.md) in GraphCommerce
