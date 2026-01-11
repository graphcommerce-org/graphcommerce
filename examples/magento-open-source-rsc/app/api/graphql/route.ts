import { createBuiltMeshHTTPHandler } from '@graphcommerce/graphql-mesh'
import type { NextRequest } from 'next/server'

const handler = createBuiltMeshHTTPHandler()

export async function GET(request: NextRequest) {
  return handler(request)
}

export async function POST(request: NextRequest) {
  return handler(request)
}
