import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * Storyblok calls this endpoint when the Visual Editor opens a page. It enables Next.js preview
 * mode (so `getStaticProps` receives `context.preview = true` → draft content) and redirects to the
 * requested slug.
 *
 * Configure in Storyblok: Settings → Visual Editor → Preview URLs → add
 * `https://<domain>/api/storyblok-preview?secret=<token>&slug=<slug>`
 *
 * The `_storyblok` query param is preserved so the Bridge script activates on the destination page.
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { secret, slug = '' } = req.query

  if (secret !== process.env.STORYBLOK_PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid preview secret' })
  }

  res.setPreviewData({})

  const resolvedSlug = slug === 'home' ? '/' : `/${slug}`
  return res.redirect(resolvedSlug)
}
