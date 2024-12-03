/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApolloLink } from '@apollo/client'
import { print } from '@apollo/client/utilities'
import type { MeshFetchHTTPInformation } from '@graphql-mesh/plugin-http-details-extensions'
import { responsePathAsArray, stripIgnoredCharacters } from 'graphql'
import { cliHyperlink } from '../../lib/hyperlinker'

const running = new Map<
  string,
  {
    start: Date
    end?: Date
    internalStart?: Date
    operationName: [string, string]
    additional?: [string, string]
    idx?: number
  }
>()

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
  const entries = Array.from(running.entries())
  if (entries.length === 0 || !entries.every(([, v]) => v.end)) return

  /**
   * Print to the console a timeline that gives a visual reprentation of the starting time and
   * duration of each operation like so;
   *
   * ╞═════════ QueryOne (250ms) ═════════╡ ╞══════════════════ Query Two (450ms)
   * ══════════════════╡ ╞═════════ QueryThree ═════════╡
   */

  let start = Number.MAX_VALUE
  let end = 0
  entries.forEach(([, value]) => {
    if (value.start.getTime() < start) start = value.start.getTime()
    if (value.end && value.end.getTime() > end) end = value.end.getTime()
  })
  end -= start

  const colDivider = end > 1000 ? end / 50 : 1000 / 50

  const lines = entries.map(([, value]) => {
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
    ['Operation', 'Mesh', '', 'Timeline'],
    ...lines,
    renderLine({
      serverStart: 0,
      requestStart: 0,
      requestEnd: end,
      additional: ['Total time', `${end}ms`, ''],
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
      const [str] = Array.isArray(item[index]) ? item[index] : [item[index], item[index]]

      const val = Array.isArray(item[index]) ? item[index][1] : item[index]

      const padLength = colWidths[index] + (val.length - str.length)

      item[index] = `${val.padEnd(padLength, ' ')}${index !== item.length - 1 ? '' : ''}`
    })
  })
  ;[[''], ...items]
    .map((item) => item.join(' '))
    .forEach((item) => {
      console.log(item)
    })

  running.clear()
}

let timeout: NodeJS.Timeout | undefined
const markTimeout = () => {
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(flushMeasurePerf, 1000)
}

/**
 * This doesn't work with the current implementation of the Apollo client. We're using SchemaLink
 * which doesn't support additional links.
 */
export const measurePerformanceLink = new ApolloLink((operation, forward) => {
  if (typeof window === 'undefined') {
    // Called before operation is sent to server
    operation.setContext({ measurePerformanceLinkStart: new Date() })
    const vars =
      Object.keys(operation.variables).length > 0 ? `(${JSON.stringify(operation.variables)})` : ''
    const operationString = `${operation.operationName}${vars}`

    running.set(operationString, {
      start: new Date(),
      operationName: [operation.operationName, operation.operationName],
    })
    markTimeout()

    return forward(operation).map((data) => {
      const httpDetails: MeshFetchHTTPInformation[] | undefined = data.extensions?.httpDetails

      const additional = ['', ''] as [string, string]

      // Called after server responds
      const query = [
        `# Variables: ${JSON.stringify(operation.variables)}`,
        `# Headers: ${JSON.stringify(operation.getContext().headers)}`,
        stripIgnoredCharacters(print(operation.query)),
      ].join('\n')

      const meshUrl = new URL(
        process.env.NODE_ENV === 'production'
          ? `${import.meta.graphCommerce.canonicalBaseUrl}/api/graphql`
          : 'http://localhost:3000/api/graphql',
      )

      meshUrl.searchParams.set('query', query)

      running.delete(operationString)
      running.set(operationString, {
        start: operation.getContext().measurePerformanceLinkStart as Date,
        end: new Date(),
        operationName: [
          operation.operationName,
          operation.operationName,
          // cliHyperlink(operation.operationName, meshUrl.toString()),
        ],
        additional,
        idx: 0,
      })

      if (httpDetails) {
        running.forEach((_, key) => {
          if (key.startsWith(operationString)) running.delete(key)
        })

        httpDetails.forEach((d) => {
          const requestUrl = new URL(d.request.url)
          requestUrl.searchParams.delete('extensions')

          const sourceName =
            !d.sourceName && URL.canParse(d.request.url)
              ? new URL(d.request.url).hostname
              : d.sourceName

          const key = `${operationString}.${responsePathAsArray(d.path).join('.')}`
          const name = `${operation.operationName}.${responsePathAsArray(d.path).join('.')} (${sourceName})`

          let start = new Date(d.request.timestamp)
          let end = new Date(d.response.timestamp)
          let operationName: [string, string] = [name, name]
          let idx = 0

          if (running.has(key)) {
            // Get the earliest start time and latest end time.
            const existing = running.get(key)
            if (existing) {
              idx = (existing.idx ?? 0) + 1
              start = existing.start < start ? existing.start : start
              end = existing?.end ? (existing.end > end ? existing.end : end) : end
              operationName = [`${name} ⨉ ${idx}`, `${name} ⨉ ${idx}`]
            }
          }

          running.set(key, { start, end, operationName, idx })
        })
      }

      markTimeout()

      return data
    })
  }
  return forward(operation)
})
