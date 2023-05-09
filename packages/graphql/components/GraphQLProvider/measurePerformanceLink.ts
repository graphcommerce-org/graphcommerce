/* eslint-disable no-console */
import { ApolloLink } from '@apollo/client'
import type { MeshFetchHTTPInformation } from '@graphql-mesh/plugin-http-details-extensions'
import { print } from 'graphql'
import { cliHyperlink } from '../../lib/hyperlinker'

const running = new Map<
  string,
  {
    start: Date
    end?: Date
    internalStart?: Date
    operationName: [string, string]
    additional?: [string, string]
  }
>()

export const requestContext = new AsyncLocalStorage<string>()

const requestId = () => {
  const id = requestContext.getStore()
  if (!id) throw new Error('No request id found')
  return id
}

const requests: Map<string, typeof running> = new Map()

const renderLine = (line: {
  serverStart: number
  requestStart: number
  requestEnd: number
  colDivider: number
  additional: (string | [string, string])[]
}) => {
  const duration = line.requestEnd - line.requestStart
  const serverDuration = duration - line.serverStart
  const waitTime = duration - serverDuration

  const reqStart = Math.floor(line.requestStart / line.colDivider)
  const startSpacing = reqStart >= 1 ? ' '.repeat(reqStart) : ''

  const waitDotsRound = Math.floor(waitTime / line.colDivider - 1)
  const waitDots = waitDotsRound >= 1 ? `${'╌'.repeat(waitDotsRound)}` : ''

  const dashrepeat = Math.floor(serverDuration / line.colDivider)

  const dashes =
    dashrepeat >= 1 ? `${waitDotsRound > 1 ? '┼' : ''}${'─'.repeat(dashrepeat - 1)}` : ''
  const result = `${startSpacing}├${waitDots}${dashes}┤`

  return [...line.additional, result]
}

export const flushMeasurePerf = () => {
  const run = requests.get(requestId())
  if (!run) return
  const entries = Array.from(run.entries())
  if (entries.length === 0 || !entries.every(([k, v]) => v.end)) return

  /**
   * Print to the console a timeline that gives a visual reprentation of the starting time and
   * duration of each operation like so;
   *
   * ╞═════════ QueryOne (250ms) ═════════╡ ╞══════════════════ Query Two (450ms)
   * ══════════════════╡ ╞═════════ QueryThree ═════════╡
   */

  let start = Number.MAX_VALUE
  let end = 0
  entries.forEach(([_, value]) => {
    if (value.start.getTime() < start) start = value.start.getTime()
    if (value.end && value.end.getTime() > end) end = value.end.getTime()
  })
  end -= start

  const colDivider = end > 1000 ? end / 50 : 1000 / 50

  const lines = entries.map(([_, value]) => {
    const requestStart = value.start.getTime() - start
    const requestEnd = value.end ? value.end.getTime() - start : 0
    const duration = requestEnd - requestStart

    const serverStart = value.internalStart
      ? value.internalStart.getTime() - value.start.getTime()
      : 0

    return renderLine({
      serverStart,
      requestStart,
      requestEnd,
      additional: [
        value.operationName,
        // `${duration - (duration - serverStart)}ms`,
        `${duration - serverStart}ms`,
        value.additional ?? '',
      ],
      colDivider,
    })
  })

  const items = [
    ['Operation', 'Mesh', ' Source', 'Timeline'],
    ...lines,
    renderLine({
      serverStart: 0,
      requestStart: 0,
      requestEnd: end,
      additional: [`Total time`, `${end}ms`, ''],
      colDivider,
    }),
  ]

  // Rewrite the above so it can handle abritraty columns
  const colWidths: number[] = Array(items[0].length).fill(0)
  items.forEach((item) => {
    item.forEach((t, index) => {
      colWidths[index] = Math.max(colWidths[index], Array.isArray(t) ? t[0].length : t.length)
    })
  })

  // padd the items to the max length
  items.forEach((item) => {
    item.forEach((_, index) => {
      const [str, link] = (
        Array.isArray(item[index]) ? item[index] : [item[index], item[index]]
      ) as [string, string]

      const val = (Array.isArray(item[index]) ? item[index][1] : item[index]) as string

      const padLength = colWidths[index] + (val.length - str.length)

      item[index] = `${val.padEnd(padLength, ' ')}${index !== item.length - 1 ? `` : ''}`
    })
  })

  // render the items to a string
  const output = [[''], ...items].map((item) => item.join(' ')).join('\n')
  console.log(output)

  running.clear()
}

/**
 * This doesn't work with the current implementation of the Apollo client. We're using SchemaLink
 * which doesn't support additional links.
 */
export const measurePerformanceLink = new ApolloLink((operation, forward) => {
  // Called before operation is sent to server
  operation.setContext({ measurePerformanceLinkStart: new Date() })
  const vars =
    Object.keys(operation.variables).length > 0 ? `(${JSON.stringify(operation.variables)})` : ''
  const operationString = `${operation.operationName}${vars}`

  let request = requests.get(requestId())
  if (!request) {
    request = new Map()
    requests.set(requestId(), request)
  }

  running.set(operationString, {
    start: new Date(),
    operationName: [operation.operationName, operation.operationName],
  })

  return forward(operation).map((data) => {
    const httpDetails: MeshFetchHTTPInformation[] | undefined = data.extensions?.httpDetails

    let additional = [``, ``] as [string, string]
    if (httpDetails) {
      httpDetails.forEach((d) => {
        const requestUrl = new URL(d.request.url)
        requestUrl.searchParams.delete('extensions')
        const title = `${d.sourceName} ${d.responseTime}ms`
        additional = [
          `${additional[0]} ${title}`,
          `${additional[1]} ${cliHyperlink(title, requestUrl.toString().replace(/\+/g, '%20'))}`,
        ]
      })
    }

    // Called after server responds
    const query = [
      `# Variables: ${JSON.stringify(operation.variables)}`,
      `# Headers: ${JSON.stringify(operation.getContext().headers)}`,
      print(operation.query),
    ].join('\n')

    const meshUrl = new URL(`${import.meta.graphCommerce.canonicalBaseUrl}/api/graphql`)
    meshUrl.searchParams.set('query', query)

    request!.set(operationString, {
      start: operation.getContext().measurePerformanceLinkStart as Date,
      end: new Date(),
      operationName: [operation.operationName, operation.operationName],
      additional,
      // [
      //   operation.operationName,
      //   cliHyperlink(operation.operationName, meshUrl.toString()),
      // ],
      // additional: [
      //   `🔗 ${additional[0]}`,
      //   `${cliHyperlink('🔗', meshUrl.toString())} ${additional[1]}`,
      // ],
    })

    return data
  })
})
