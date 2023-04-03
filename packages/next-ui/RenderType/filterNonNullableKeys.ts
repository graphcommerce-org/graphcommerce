import type { OptionalKeysOf, Simplify } from 'type-fest'

export type RequiredKeys<
  T extends Record<string, unknown>,
  Keys extends OptionalKeysOf<T>,
> = Simplify<
  Omit<T, Keys> & {
    [K in Keys]: NonNullable<T[K]>
  }
>

export function filterNonNullableKeys<
  T extends Record<string, unknown>,
  Keys extends OptionalKeysOf<T>,
>(items: (T | null | undefined)[] | null | undefined, values: Keys[] = []) {
  if (!items) return []

  const result = items.filter(
    (item) =>
      item !== null &&
      typeof item !== 'undefined' &&
      values.every((v) => item?.[v] !== null && typeof item?.[v] !== 'undefined'),
  )

  return result as RequiredKeys<T, Keys>[]
}
