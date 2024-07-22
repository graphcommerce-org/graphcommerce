# Preview mode

GraphCommerce implements Next.js' preview mode which allows you to view the
realtime data from Magento and Hygraph.

You can select whether to view Hygraph content in the DRAFT of PUBLISHED stage
(or other if configured).

You can Revalidate / Regenerate a page to make sure it is always up to date when
viewing.

It bypasses all caches from Next.js, Magento and Hygraph (this means that
Preview Mode is expdcted to be slower but does show your changes directly).

## Accessing preview mode

To enter preview mode press `ALT + Backtick` (\`) on your keyboard. This will
open the preview mode toolbar on the bottom of the screen.

![Toolbar requesting secret](https://github.com/graphcommerce-org/graphcommerce/assets/1244416/5064dbf0-e491-4d14-9c44-17754941d193)

Fill in the secret and press the chevron button to enter preview mode.

You are now greeted with the preview mode toolbar:

![Scherm­afbeelding 2024-07-04 om 21 09 58](https://github.com/graphcommerce-org/graphcommerce/assets/1244416/f6a2224b-ad0a-429d-bd1b-ad924a3f81e5)

## Enabling preview mode

Configure the `previewSecret` in your `graphcommerce.config.js` file to enable
preview mode.
