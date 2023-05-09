export const storefrontAll = import.meta.graphCommerce.storefront

export const storefrontConfigDefault = () =>
  storefrontAll.find((l) => l.defaultLocale) ?? storefrontAll[0]

/** Get the current storefront config based on the provided locale */
export const storefrontConfig = (locale?: string | undefined) => {
  const found = storefrontAll.find((l) => l.locale === locale)
  return found ?? storefrontConfigDefault()
}
