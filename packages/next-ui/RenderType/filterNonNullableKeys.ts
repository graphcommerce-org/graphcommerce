import type { OptionalKeysOf, Simplify } from 'type-fest'

export function filterNonNullableKeys<
  T extends Record<string, unknown>,
  Keys extends OptionalKeysOf<T>,
>(items: (T | null | undefined)[] | null | undefined, values: Keys[] = []) {
  if (!items) return []

  type ResultWithRequired = Simplify<
    Omit<T, Keys> & {
      [K in Keys]: NonNullable<T[K]>
    }
  >

  const result = items.filter(
    (item) => item !== null && typeof item !== 'undefined' && values.every((v) => item?.[v]),
  )

  return result as ResultWithRequired[]
}
