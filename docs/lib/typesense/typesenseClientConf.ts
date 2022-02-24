import { ConfigurationOptions } from 'typesense/lib/Typesense/Configuration'

export function typesenseClientConf() {
  // Be sure to use an API key that only allows searches, in production
  const apiKey = process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY
  const host = process.env.NEXT_PUBLIC_TYPESENSE_HOST
  const port = Number(process.env.NEXT_PUBLIC_TYPESENSE_PORT)
  const protocol = process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL

  if (!apiKey) throw Error('Please provide NEXT_PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY')
  if (!host) throw Error('Please provide NEXT_PUBLIC_TYPESENSE_HOST')
  if (!port) throw Error('Please provide NEXT_PUBLIC_TYPESENSE_PORT')
  if (!protocol) throw Error('Please provide NEXT_PUBLIC_TYPESENSE_PROTOCOL')

  const conf: ConfigurationOptions = {
    apiKey,
    nodes: [{ host, port, protocol }],
    numRetries: 8,
    connectionTimeoutSeconds: 1,
  }

  return conf
}
