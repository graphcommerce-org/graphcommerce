# @graphcommerce/address-autocomplete

Adds Google Places address autocomplete to GraphCommerce customer and checkout
address forms.

When a customer selects an address, the package fills the street, house number,
addition, postcode, city, country, and Magento region fields. If Google Maps is
not configured or cannot be loaded, the standard manual street field remains
available.

## Installation

Install the package using the same version as the other GraphCommerce packages
in your project:

```bash
yarn add @graphcommerce/address-autocomplete
```

Run code generation after installing the package:

```bash
yarn codegen
```

The package uses the GraphCommerce plugin system, so no component overrides are
required.

## Google Maps setup

Create a Google Maps API key with the Places API (New) enabled. Restrict the key
to the domains where the storefront is hosted.

Add the key to `graphcommerce.config.ts`:

```ts
import type { GraphCommerceConfig } from '@graphcommerce/next-config'

const config: Partial<GraphCommerceConfig> = {
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
}

export default config
```

Restart code generation and the development server after changing the
configuration.

See [Config.graphqls](./Config.graphqls) for the available configuration fields.

## Behavior

The plugin replaces the standard `AddressStreet` field only when
`googleMapsApiKey` is configured. It:

- loads the Google Maps Places library;
- requests predictions through the Places API (New) `AutocompleteSuggestion`
  interface;
- limits suggestions to addresses;
- uses the browser's preferred language for suggestions;
- renders an accessible suggestions list with the required Google Maps
  attribution;
- groups prediction and place-detail requests into autocomplete sessions;
- maps Google address components to GraphCommerce address fields;
- resolves the Google region to the corresponding Magento region ID;
- preserves the standard field styling and validation behavior;
- suppresses browser address autofill from competing with Google suggestions;
  and
- falls back to the original manual field if the API is unavailable.

## Public API

The main package export provides:

- `AddressAutocomplete` — Google-assisted street field with a required fallback;
- `useCountries` — loads Magento countries and regions;
- `formatAddress` — converts Google address components to a normalized address;
- `addressValues` — converts a normalized address to form values; and
- `findRegionId` — matches a Google region to a Magento region ID.

The GraphCommerce plugin is available from:

```ts
@graphcommerce/address-autocomplete/plugins/AddAddressAutocompleteAddressFields
```

It is discovered automatically during code generation and normally does not need
to be imported directly.

## Troubleshooting

### Suggestions are not displayed

Check that:

- the global `googleMapsApiKey` is configured;
- the Places API (New) is enabled for the Google Cloud project;
- the API key allows the storefront domain; and
- billing is enabled for the Google Cloud project.

The manual street field is displayed when the key is missing or the Google Maps
script cannot be loaded.

### A selected region is not filled

The package matches regions by country, region code, and normalized region name.
Verify that the region exists in Magento and that its code or name corresponds
to the value returned by Google.
