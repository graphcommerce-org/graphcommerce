import { createBuiltMeshHTTPHandler } from '@graphcommerce/graphql-mesh'
import { NextRequest, NextResponse } from 'next/server'

const builtMesh = createBuiltMeshHTTPHandler()

const handler = async (request: NextRequest) => {
  const response = await builtMesh.handle(new Request(request.url, request))
  return new NextResponse(response.body, response)
}

export const GET = handler
export const OPTIONS = handler
export const POST = handler
