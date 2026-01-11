import { createBuiltMeshHTTPHandler } from '@graphcommerce/graphql-mesh'
import { NextRequest, NextResponse } from 'next/server'

const handler = createBuiltMeshHTTPHandler()

/**
 * Wrapper for the mesh handler that works around the read-only cookies issue in App Router. The
 * mesh handler tries to set cookies on the request, but NextRequest has read-only cookies. Also
 * handles the PonyfillResponse returned by the mesh handler.
 */
async function handleRequest(request: NextRequest): Promise<Response> {
  // Create a standard Request from NextRequest to avoid read-only property issues
  const url = new URL(request.url)
  const headers = new Headers()

  // Copy all headers
  request.headers.forEach((value, key) => {
    headers.set(key, value)
  })

  // Create a new Request that the mesh handler can work with
  const standardRequest = new Request(url, {
    method: request.method,
    headers,
    body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
    // @ts-expect-error duplex is needed for streaming bodies
    duplex: 'half',
  })

  try {
    const result = await handler(standardRequest)

    if (!result) {
      console.error('GraphQL mesh handler returned no result')
      return NextResponse.json(
        { errors: [{ message: 'GraphQL handler returned no response' }] },
        { status: 500 },
      )
    }

    // The mesh handler returns a PonyfillResponse from @whatwg-node/server
    // which is not a standard Response. We need to convert it to a proper Response.
    // Check if it's a Response-like object with the necessary properties
    if (
      typeof result === 'object' &&
      'status' in result &&
      'headers' in result &&
      ('text' in result || 'json' in result || 'bodyInit' in result)
    ) {
      // @ts-expect-error PonyfillResponse has bodyInit property with the body content
      const body = result.bodyInit ?? (await result.text())
      return new Response(body, {
        status: result.status,
        statusText: result.statusText || 'OK',
        headers: result.headers,
      })
    }

    // If result is a Response, return it directly
    if (result instanceof Response) {
      return result
    }

    console.error('GraphQL mesh handler returned unexpected type:', typeof result)
    return NextResponse.json(
      { errors: [{ message: 'GraphQL handler returned unexpected type' }] },
      { status: 500 },
    )
  } catch (error) {
    console.error('GraphQL mesh handler error:', error)
    return NextResponse.json(
      { errors: [{ message: error instanceof Error ? error.message : 'Internal server error' }] },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest) {
  return handleRequest(request)
}

export async function POST(request: NextRequest) {
  return handleRequest(request)
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin') || '*'
  const requestedHeaders = request.headers.get('access-control-request-headers')

  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': requestedHeaders || 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  })
}
