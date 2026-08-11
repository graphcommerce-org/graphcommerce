/**
 * A deployment-wide "content was published" signal, carried through Next.js' incremental cache so
 * it reaches every server that shares a `cacheHandler`.
 *
 * Caches that are built per process — an SSR Apollo client's `InMemoryCache`, a CMS client's pinned
 * cache-version — are invalidated by a webhook that only ever reaches one server. This is how the
 * other servers find out, without any of them polling an upstream API to ask whether anything
 * changed.
 *
 * Two Next.js internals are involved. `globalThis.__incrementalCache` is set per incoming request
 * before route handling, so it is available inside an API route and inside ISR regeneration, but
 * *not* in middleware or the edge runtime, which construct their own instance. The entry is written
 * as `kind: 'FETCH'` with `fetchCache: true`, the one path that stores an arbitrary key verbatim
 * instead of running it through `normalizePagePath()`.
 *
 * Both are unstable API. If either changes shape, reads and writes fail closed: the signal stays at
 * its last known value and callers fall back to whatever time-based failsafe they have. The call
 * shape does drift — `revalidate` became `cacheControl` between Next 14 and 15 — so it needs
 * re-testing per major.
 *
 * Deployments on Next's default `FileSystemCache` must set `cacheMaxMemorySize: 0`; its in-memory
 * LRU sits in front of the shared layer and would answer every read from the writing process' own
 * memory. Custom cache handlers have no such layer.
 */
const RENEW_SIGNAL_KEY = 'gc:signal:content-renew'
const RENEW_SIGNAL_POLL_MS = 1000
const RENEW_SIGNAL_REVALIDATE = 60 * 60 * 24 * 30

type IncrementalCacheLike = {
  get: (key: string, ctx: unknown) => Promise<{ value?: { data?: { body?: string } } } | null>
  set: (key: string, data: unknown, ctx: unknown) => Promise<void>
}

/** Undefined outside a Next.js request, in the browser bundle, and on the edge runtime. */
function incrementalCache(): IncrementalCacheLike | undefined {
  return (globalThis as { __incrementalCache?: IncrementalCacheLike }).__incrementalCache
}

/** `undefined` until the first read completes — distinct from "read, and nothing was published". */
let signalValue: number | undefined
let signalReadAt = 0
let inFlight: Promise<number | undefined> | undefined

/**
 * Publish the signal. Call this from the webhook that learns content changed.
 *
 * The value is a millisecond timestamp: only its ordering matters, never its absolute value.
 */
export async function publishRenewSignal(): Promise<void> {
  const cache = incrementalCache()
  if (!cache) return
  try {
    await cache.set(
      RENEW_SIGNAL_KEY,
      {
        kind: 'FETCH',
        data: { headers: {}, body: String(Date.now()), url: '', status: 200 },
        tags: [],
        revalidate: RENEW_SIGNAL_REVALIDATE,
      },
      { fetchCache: true, tags: [] },
    )
  } catch {
    // Unsupported or unwritable cache handler.
  }
}

async function readRenewSignal(): Promise<number | undefined> {
  const cache = incrementalCache()
  if (!cache) return signalValue
  try {
    const entry = await cache.get(RENEW_SIGNAL_KEY, {
      kind: 'FETCH',
      tags: [],
      softTags: [],
      revalidate: RENEW_SIGNAL_REVALIDATE,
    })
    const value = Number(entry?.value?.data?.body)
    // An absent entry means nothing has been published yet, which is a known state, not an unknown
    // one — record it so cold-start callers stop treating the signal as unreadable.
    signalValue = Number.isFinite(value) && value > 0 ? value : (signalValue ?? 0)
  } catch {
    // A cache handler that cannot serve this entry. Leave the signal as it was.
  }
  return signalValue
}

/**
 * Read the signal, at most once per {@link RENEW_SIGNAL_POLL_MS}. Never an upstream API request.
 *
 * Concurrent callers share one read: on a fresh pod every in-flight `getStaticProps` hits this at
 * once, and they should not each open their own.
 */
export async function refreshRenewSignal(): Promise<number | undefined> {
  const now = Date.now()
  if (signalValue !== undefined && now - signalReadAt < RENEW_SIGNAL_POLL_MS) return signalValue
  if (!inFlight) {
    signalReadAt = now
    inFlight = readRenewSignal().finally(() => {
      inFlight = undefined
    })
  }
  return inFlight
}

/**
 * Last known signal value, or `undefined` when it has not been read yet.
 *
 * For callers that cannot await one: `graphqlSsrClient()` is synchronous and called as
 * `const client = graphqlSsrClient(context)` throughout `getStaticProps`, so making the read
 * awaited would mean making every consumer async. It gets the value from the previous refresh and
 * schedules the next one, bounding staleness at one poll interval plus one call.
 *
 * `undefined` must not be read as "nothing published" — on a fresh pod, which is every pod right
 * after a deploy, that would silently skip the first invalidation. Callers treat it as unknown and
 * fall back to their own failsafe.
 */
export function renewSignal(): number | undefined {
  void refreshRenewSignal()
  return signalValue
}
