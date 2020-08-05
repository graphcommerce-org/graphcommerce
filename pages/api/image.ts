import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'
import sharp from 'sharp'

/**
 * Parameters required for the endpoint to work
 */
function parseQuery(query: NextApiRequest['query']) {
  const { width, type, url, ...inputOptions } = query
  if (!width || !type || !url) throw Error('Please provide width, type and url')

  const options: OutputOptions = {}
  return {
    width: Number(query.width),
    type: query.type as 'jpeg' | 'png' | 'webp' | 'gif' | 'svg',
    url: query.url as string,
    options,
  }
}

/**
 * PNG to WebP http://localhost:3000/api/image?width=200&height=117&type=webp&url=https://www.sightful.nl/media/catalog/product/8/8/88877d091e5623b76d7fbd7b600e8d8287cc3c4d_air_optix_aqua_6pcs_1200.png
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  let status = 500
  try {
    const { url, width, type, options } = parseQuery(req.query)

    const image = await fetch(url)
    status = image.status

    res.setHeader('Cache-Control', image.headers.get('Cache-Control') || '')
    res.setHeader('Etag', image.headers.get('Etag') || '')

    const imageBuffer = await image.buffer()
    res.end(await sharp(imageBuffer).resize(width).toFormat(type, options).toBuffer())
    res.status(status)
    res.end()
  } catch (e) {
    console.error(e.toString())
    res.status(status).end(e.toString())
  }

  return Promise.resolve()
}
