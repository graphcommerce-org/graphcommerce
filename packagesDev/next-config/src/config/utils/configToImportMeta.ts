function flattenKeys(
  value: unknown,
  initialPathPrefix: string,
  stringify: boolean,
): Record<string, unknown> {
  // Is a scalar:
  if (value === null || value === undefined || typeof value === 'number' || !stringify) {
    return { [initialPathPrefix]: value }
  }

  if (typeof value === 'string') {
    return { [initialPathPrefix]: JSON.stringify(value) }
  }

  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return { [initialPathPrefix]: JSON.stringify(value) }
  }

  if (typeof value === 'object') {
    return {
      [initialPathPrefix]:
        process.env.NODE_ENV === 'development'
          ? `{ __debug: "'${initialPathPrefix}' can not be destructured, please access deeper properties directly" }`
          : '{}',
      ...Object.keys(value)
        .map((key) => {
          const deep = (value as Record<string, unknown>)[key]
          return flattenKeys(deep, `${initialPathPrefix}.${key}`, false)
        })
        .reduce((acc, path) => ({ ...acc, ...path })),
    }
  }

  throw Error(`Unexpected value: ${value}`)
}

/** The result of this function is passed to the webpack DefinePlugin as import.meta.graphCommerce.* */
export function configToImportMeta(config: unknown) {
  return flattenKeys(config, 'import.meta.graphCommerce', true) as Record<string, string>
}
