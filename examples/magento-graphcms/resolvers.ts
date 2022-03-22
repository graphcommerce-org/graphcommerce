/* eslint-disable @typescript-eslint/no-unsafe-argument */
import probe from 'probe-image-size'
import type { MeshContext, Resolvers } from './.mesh'

type PropeResult = {
  width: number | null
  height: number | null
  mime: string | null
}

const runningProbes = new Map<string, Promise<PropeResult>>()

async function probeCached(url: unknown, cache: MeshContext['cache']): Promise<PropeResult> {
  if (typeof url !== 'string') return { width: null, height: null, mime: null }

  const sizes = await cache.get(url)
  if (sizes) return sizes

  if (!runningProbes.has(url)) {
    runningProbes.set(url, probe(url))
  }

  const probed = (await runningProbes.get(url)) ?? { width: null, height: null, mime: null }
  await cache.set(url, probed)
  runningProbes.delete(url)

  return probed
}

export const resolvers: Resolvers = {
  ProductImage: {
    width: async ({ url }, _, { cache }) => (await probeCached(url, cache))?.width,
    height: async ({ url }, _, { cache }) => (await probeCached(url, cache))?.height,
    mimeType: async ({ url }, _, { cache }) => (await probeCached(url, cache))?.mime,
  },
}

export default { resolvers }
