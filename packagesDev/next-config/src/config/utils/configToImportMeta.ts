function flattenKeys(value: unknown, initialPathPrefix: string): Record<string, unknown> {
  // Is a scalar:
  if (
    value === null ||
    value === undefined ||
    typeof value === 'string' ||
    typeof value === 'number'
  ) {
    return { [initialPathPrefix]: value }
  }

  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return { [initialPathPrefix]: JSON.stringify(value) }
  }

  if (typeof value === 'object') {
    return Object.keys(value)
      .map((key) => {
        const deep = (value as Record<string, unknown>)[key]
        return flattenKeys(deep, `${initialPathPrefix}.${key}`)
      })
      .reduce((acc, path) => ({ ...acc, ...path }))
  }

  throw Error(`Unexpected value: ${value}`)
}

/** The result of this function is passed to the webpack DefinePlugin as import.meta.graphCommerce.* */
export function configToImportMeta(config: unknown) {
  const result = flattenKeys(config, 'import.meta.graphCommerce')
  return {
    ...(result as Record<string, string>),
    'import.meta.graphCommerce':
      process.env.NODE_ENV === 'development'
        ? '"import.meta.graphCommerce can not be accessed directly, please a deeper nested value instead."'
        : 'undefined',
  }
}
