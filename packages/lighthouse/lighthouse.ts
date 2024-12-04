import { promises as fs } from 'fs'
import type { PrerenderManifest } from 'next/dist/build'
import lighthouse from './lighthouserc.json'

async function main() {
  const file: PrerenderManifest = JSON.parse(
    await fs.readFile('.next/prerender-manifest.json', 'utf-8'),
  )

  const urls = {}
  Object.entries(file.routes).forEach(([path, ssgRoute]) => {
    if (!urls[ssgRoute.srcRoute || path]) urls[ssgRoute.srcRoute || path] = path
  })

  const newUrls = Object.values(urls).map((url) => `__LHCI_BASE_URL__${url}`)
  lighthouse.ci.collect.url = newUrls.sort()

  await fs.writeFile('./lighthouserc.json', `${JSON.stringify(lighthouse, null, '  ')}\n`)
}

main().catch(console.error)
