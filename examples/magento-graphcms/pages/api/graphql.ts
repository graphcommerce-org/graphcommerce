import { createBuiltMeshHTTPHandler } from '@graphcommerce/graphql-mesh'
import { NextRequest } from 'next/server'

const handler = createBuiltMeshHTTPHandler()

export default async function handle(request: NextRequest) {
  return handler.fetch(request.url, request)
}

export const config = { runtime: 'edge' }
