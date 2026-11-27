import { expect, test } from '@playwright/test'

/**
 * Validates that a product whose `media_gallery` contains a YouTube video
 * renders the lazy-loading `YoutubeEmbed` component in the product gallery,
 * shows the Magento preview image as the poster, and swaps in the YouTube
 * iframe on click.
 *
 * Backend prerequisite: the configured Magento backend must have a product
 * at the URL below with at least one `ProductVideo` entry pointing at a
 * YouTube URL. Override with `PRODUCT_URL` and `EXPECTED_YOUTUBE_ID` env
 * vars when running against a different backend.
 */
const PRODUCT_URL = process.env.PRODUCT_URL ?? '/p/spooky-girl-gc-1-sock'
const EXPECTED_YOUTUBE_ID = process.env.EXPECTED_YOUTUBE_ID ?? 'u_pe6qAhz5U'

test.describe('YoutubeEmbed in product media gallery', () => {
  test('renders the YouTube poster, lazy-loads the iframe on click', async ({ page }) => {
    await page.goto(PRODUCT_URL, { waitUntil: 'domcontentloaded' })

    // Wait for the gallery to mount. We don't depend on a specific slide order
    // — the YouTube slide may be 2nd, 3rd, etc. depending on the product.
    await page.waitForSelector('[class*="SidebarGallery-root"]', { timeout: 30_000 })

    const youtubeEmbed = page.locator('[class*="YoutubeEmbed-root"]').first()
    await expect(youtubeEmbed).toBeAttached({ timeout: 15_000 })

    // Magento preview image is forwarded as the YoutubeEmbed `thumbnail` prop,
    // so the background should be the configured Magento media URL — not the
    // YouTube auto-generated thumbnail at i.ytimg.com.
    const initial = await youtubeEmbed.evaluate((el) => {
      const styles = getComputedStyle(el)
      return {
        dataTitle: el.getAttribute('data-title'),
        backgroundImage: styles.backgroundImage,
        hasIframe: !!el.querySelector('iframe'),
        playButtonLabel: el.querySelector('button[type="button"]')?.getAttribute('aria-label'),
      }
    })
    expect(initial.hasIframe).toBe(false)
    expect(initial.dataTitle).toBeTruthy()
    expect(initial.playButtonLabel).toContain('Watch')
    expect(initial.backgroundImage).not.toContain('i.ytimg.com')
    expect(initial.backgroundImage).toContain('http')

    // Hovering preconnects to youtube-nocookie.com so the iframe load is fast.
    await youtubeEmbed.hover()
    await expect(
      page.locator('link[rel="preconnect"][href*="youtube"]'),
    ).toHaveCount(1, { timeout: 5_000 })

    // Click swaps the poster for the actual YouTube iframe with autoplay=1.
    await youtubeEmbed.click()
    const iframe = youtubeEmbed.locator('iframe')
    await expect(iframe).toBeAttached({ timeout: 5_000 })

    const src = await iframe.getAttribute('src')
    expect(src).toContain(EXPECTED_YOUTUBE_ID)
    expect(src).toContain('autoplay=1')
    expect(src).toMatch(/youtube(-nocookie)?\.com/)
  })
})
