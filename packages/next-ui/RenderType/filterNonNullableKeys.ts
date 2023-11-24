import type { OptionalKeysOf } from 'type-fest'

export type RequiredKeys<T extends Record<string, unknown>, Keys extends OptionalKeysOf<T>> = Omit<
  T,
  Keys
> & { [K in Keys]: NonNullable<T[K]> }

export function filterNonNullableKeys<
  T extends Record<string, unknown>,
  Keys extends OptionalKeysOf<T>,
>(
  items: (T | null | undefined)[] | null | undefined,
  values: Keys[] = [],
): RequiredKeys<T, Keys>[] {
  if (!items) return []

  return items.filter(
    (item) =>
      item !== null &&
      typeof item !== 'undefined' &&
      values.every((v) => item?.[v] !== null && typeof item?.[v] !== 'undefined'),
  ) as RequiredKeys<T, Keys>[]
}
