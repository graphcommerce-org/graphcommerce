import { ResolvedMetadata } from 'next'
import { AlternateLinkDescriptor } from 'next/dist/lib/metadata/types/alternative-urls-types'
import type { Jsonify } from 'type-fest'

function alternateLinkDescriptorToJSON(
  link: AlternateLinkDescriptor | null | undefined,
): Jsonify<AlternateLinkDescriptor> | null {
  if (!link) return null
  return {
    ...link,
    url: link.url.toString(),
  }
}

export function resolvedMetadataToJSON(metadata: ResolvedMetadata): Jsonify<ResolvedMetadata> {
  return {
    ...metadata,
    metadataBase: metadata.metadataBase?.toString() ?? null,
    authors:
      metadata.authors?.map((author) => ({
        ...author,
        url: author.url?.toString(),
      })) ?? null,
    alternates: {
      ...metadata.alternates,
      canonical: alternateLinkDescriptorToJSON(metadata.alternates?.canonical),
      languages: Object.fromEntries(
        Object.entries(metadata.alternates?.languages ?? {}).map(([key, val]) => [
          key,
          val?.map(alternateLinkDescriptorToJSON),
        ]),
      ) as Jsonify<NonNullable<ResolvedMetadata['alternates']>['languages']>,

      media: Object.fromEntries(
        Object.entries(metadata.alternates?.media ?? {}).map(([key, val]) => [
          key,
          val?.map(alternateLinkDescriptorToJSON),
        ]),
      ) as Jsonify<NonNullable<ResolvedMetadata['alternates']>['media']>,

      types: Object.fromEntries(
        Object.entries(metadata.alternates?.types ?? {}).map(([key, val]) => [
          key,
          val?.map(alternateLinkDescriptorToJSON),
        ]),
      ) as Jsonify<NonNullable<ResolvedMetadata['alternates']>['types']>,
    },

    icons: {
      ...metadata.icons,
      apple: (metadata.icons?.apple ?? [])?.map((icon) => ({
        ...icon,
        url: icon.url?.toString(),
      })),
    },
  }
}
