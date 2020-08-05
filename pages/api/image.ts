import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'
import sharp from 'sharp'

/**
 * Parameters required for the endpoint to work
 */
function parseQuery(query: NextApiRequest['query']) {
  return {
    width: Number(query.width),
    type: String(query.type),
    url: new URL(String(query.url)),
  }
}

/**
 * PNG to WebP http://localhost:3000/api/image?width=200&height=117&type=webp&url=https://www.sightful.nl/media/catalog/product/8/8/88877d091e5623b76d7fbd7b600e8d8287cc3c4d_air_optix_aqua_6pcs_1200.png
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { url, width, type } = parseQuery(req.query)

    const image = await fetch(url.toString())

    res.setHeader('Cache-Control', image.headers.get('Cache-Control') || '')
    res.setHeader('Etag', image.headers.get('Etag') || '')

    res.end(
      await sharp(await image.buffer())
        .resize(width)
        .toFormat(type)
        .toBuffer(),
    )
    res.status(200)

    res.end()
  } catch (e) {
    console.error(e)
    res.status(500).end()
  }

  return Promise.resolve()
}
