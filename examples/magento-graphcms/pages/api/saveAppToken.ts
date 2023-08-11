import { NextApiRequest, NextApiResponse } from 'next'

const managementApiBaseUrl = 'https://management.hygraph.com'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body as { code: string; environmentId: string }
  const response = await fetch(`${managementApiBaseUrl}/app-exchange-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      clientId: process.env.HYGRAPH_APP_CLIENT_ID,
      clientSecret: process.env.HYGRAPH_APP_CLIENT_SECRET,
      exchangeCode: req.body.code,
    }),
  })
  const { appToken } = (await response.json()) as { appToken: string }
  // Return App token to the browser so it can save it in localstorage
  res.status(200).json({ appToken })
}
