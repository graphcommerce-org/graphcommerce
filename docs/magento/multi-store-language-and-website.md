# Multi store, language and website setup

GraphCommerce builds on top of the
[Next.js internationalization feature](https://nextjs.org/docs/pages/building-your-application/routing/internationalization#getting-started).

## Sub-path routing

Locales are UTS Locale Identifiers, a standardized format for defining locales.

Generally a Locale Identifier is made up of a language, region, and script
separated by a dash: `language-region-script`. The region and script are
optional. An example how to configure it in GraphCommerce:

```js
const config = {
  storefront: [
    { locale: 'en-US', defaultLocale: true },
    { locale: 'nl-NL' },
    { locale: 'de' },
  ],
}
```

This will result in the following URLs:

- `https://www.graphcommerce.org/some-path/here`
- `https://www.graphcommerce.org/nl-NL/some-path/here`
- `https://www.graphcommerce.org/de/some-path/here`

## Domain routing

The domains can be subdomains or top-level domains. The configuration is the
same for both.

```js
const config = {
  storefront: [
    { domain: 'www.graphcommerce.org', locale: 'en-US', defaultLocale: true },
    { domain: 'www.graphcommerce.org', locale: 'fr' },
    { domain: 'www.graphcommerce.nl', locale: 'nl-NL' },
    { domain: 'de.graphcommerce.org', locale: 'de-DE' },
  ],
}
```

This will result in the following URLs:

- `https://www.graphcommerce.org/some-path/here`
- `https://www.graphcommerce.org/fr/some-path/here`
- `https://www.graphcommerce.nl/some-path/here`
- `https://de.graphcommerce.org/some-path/here`

## Domain routing + same locale

Next.js does not allow reusing locales (even if it is on different domains), to
work around this, we're using the fact that a locale is allowed to have a
'script' value in the format: `language-region-script`. We use this part to
differentiate between the same locales on different domains.

Configuring the `linguiLocale` makes sure the correct translation file is loaded
here.

```js
const config = {
  storefront: [
    { domain: 'domain1.com', locale: 'en-us-domain1', linguiLocale: 'en' },
    { domain: 'domain2.com', locale: 'en-us-domain2', linguiLocale: 'en' },
    { domain: 'domain3.com', locale: 'en-us-domain3', linguiLocale: 'en' },
  ],
}
```

### Separating Sub-paths from locales

Note: Available from GraphCommerce 8.1.0

Warning: Separating paths form locales will break Next.js' automatic redirect
functionality.

```js
const config = {
  storefront: [
    { locale: 'default', linguiLocale: 'en', defaultLocale: true },
    { locale: 'fr_fr', linguiLocale: 'fr' },
    { locale: 'nl_nl', linguiLocale: 'nl' },
  ],
}
```

This will result in the following URLs:

- `https://www.graphcommerce.org/some-path/here`
- `https://www.graphcommerce.org/fr_fr/some-path/here`
- `https://www.graphcommerce.org/nl_nl/some-path/here`

## Further reading

- [Next.js docs: Prefixing the default locale](https://nextjs.org/docs/pages/building-your-application/routing/internationalization#prefixing-the-default-locale)
- [Next.js docs: Sub-path routing](https://nextjs.org/docs/pages/building-your-application/routing/internationalization#sub-path-routing).
- [Next.js docs: Domain routing](https://nextjs.org/docs/pages/building-your-application/routing/internationalization#domain-routing)
