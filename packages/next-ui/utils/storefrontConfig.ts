export const storefrontAll = import.meta.graphCommerce.storefront

/** Get the current storefront config based on the provided locale */
export const storefrontConfig = (locale?: string | undefined) =>
  storefrontAll.find((l) => l.locale === locale)

export const storefrontConfigDefault = () =>
  storefrontAll.find((l) => l.defaultLocale) ?? storefrontAll[0]
