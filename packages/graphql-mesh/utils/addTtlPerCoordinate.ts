import type { YamlConfig } from '@graphql-mesh/types'

export function withTtlPerCoordinate(
  plugins: YamlConfig.Config['plugins'] | undefined,
  coordinate: string,
  ttl: number,
): YamlConfig.Config['plugins'] {
  const existingResponseCache = plugins?.find((p) => p.responseCache)
  const existingTtlPerCoordinate = existingResponseCache?.responseCache?.ttlPerCoordinate
  const pluginsWithoutResponseCache = plugins?.filter((p) => p !== existingResponseCache) ?? []

  return [
    ...pluginsWithoutResponseCache.filter((p) => p !== existingResponseCache),
    {
      responseCache: {
        ...(existingResponseCache?.responseCache ?? {}),
        ttlPerCoordinate: [...(existingTtlPerCoordinate ?? []), { coordinate, ttl }],
      },
    },
  ]
}
