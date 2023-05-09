export type DeepAwait<T> = T extends (...args: unknown[]) => unknown
  ? T
  : T extends Promise<infer U>
  ? DeepAwait<U>
  : T extends object
  ? { [K in keyof T]: DeepAwait<Awaited<T[K]>> }
  : Awaited<T>

export async function deepAwait<T>(value: T): Promise<DeepAwait<T>> {
  if (value instanceof Promise) return deepAwait(await value)

  if (Array.isArray(value)) return Promise.all(value.map(deepAwait)) as Promise<DeepAwait<T>>

  if (typeof value === 'object' && value !== null) {
    const entries = Object.entries(value)

    const promises = entries.map(async ([key, entryValue]) =>
      deepAwait(entryValue).then((v) => [key, v] as const),
    )
    return Object.fromEntries(await Promise.all(promises)) as DeepAwait<T>
  }

  return value as DeepAwait<T>
}
