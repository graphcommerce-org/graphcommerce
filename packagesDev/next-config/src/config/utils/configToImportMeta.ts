function flattenKeys(
  value: unknown,
  initialPathPrefix: string,
  stringify: boolean,
): Record<string, unknown> {
  // Is a scalar:
  if (value === null || value === undefined || typeof value === 'number') {
    return { [initialPathPrefix]: value }
  }

  if (typeof value === 'string') {
    return { [initialPathPrefix]: stringify ? JSON.stringify(value) : value }
  }

  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {
      [initialPathPrefix]: stringify || Array.isArray(value) ? JSON.stringify(value) : value,
    }
  }

  if (typeof value === 'object') {
    let outputValue: object | string = value
    if (stringify)
      outputValue =
        process.env.NODE_ENV !== 'production'
          ? `{ __debug: "'${initialPathPrefix}' can not be destructured, please access deeper properties directly" }`
          : '{}'

    return {
      [initialPathPrefix]: outputValue,

      ...Object.keys(value)
        .map((key) => {
          const deep = (value as Record<string, unknown>)[key]
          return flattenKeys(deep, `${initialPathPrefix}.${key}`, stringify)
        })
        .reduce((acc, path) => ({ ...acc, ...path })),
    }
  }

  throw Error(`Unexpected value: ${value}`)
}

/** The result of this function is passed to the webpack DefinePlugin as import.meta.graphCommerce.* */
export function configToImportMeta(
  config: unknown,
  path = 'import.meta.graphCommerce',
  stringify = true,
) {
  return flattenKeys(config, path, stringify) as Record<string, string>
}
