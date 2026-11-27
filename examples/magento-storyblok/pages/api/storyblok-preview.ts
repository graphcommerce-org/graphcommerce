import { previewSecret } from '@graphcommerce/next-config/config'
import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * Storyblok calls this endpoint when the Visual Editor opens a page. It enables Next.js preview
 * mode (so `getStaticProps` receives `context.preview = true` → draft content) and redirects to
 * the requested slug, preserving the `_storyblok*` query params so the Bridge script activates
 * on the destination page (it reads them from `window.location.search`).
 *
 * Configure in Storyblok: Settings → Visual Editor → Preview URLs → add
 * `https://<domain>/api/storyblok-preview?secret=<token>&slug=<slug>`
 *
 * The secret is GraphCommerce's `previewSecret` config (or `GC_PREVIEW_SECRET` env var) — the
 * same mechanism used elsewhere in the platform to gate preview mode.
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { secret, slug = '' } = req.query

  if (!previewSecret || secret !== previewSecret) {
    return res.status(401).json({ message: 'Invalid preview secret' })
  }

  res.setPreviewData({})

  // Drop `secret` and `slug` (this route's own inputs) and forward everything
  // else — the Bridge script needs `_storyblok` etc. on the destination page.
  const forwarded = new URLSearchParams()
  for (const [key, value] of Object.entries(req.query)) {
    if (key === 'secret' || key === 'slug') continue
    if (typeof value === 'string') forwarded.append(key, value)
    else if (Array.isArray(value)) value.forEach((v) => forwarded.append(key, v))
  }

  const resolvedSlug = slug === 'home' ? '/' : `/${slug}`
  const queryString = forwarded.toString()
  res.redirect(queryString ? `${resolvedSlug}?${queryString}` : resolvedSlug)
}
