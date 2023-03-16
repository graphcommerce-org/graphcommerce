/* eslint-disable no-console */
import { ApolloLink } from '@apollo/client'

const running = new Map<
  string,
  { start: Date; end?: Date; internalStart?: Date; operationName: string }
>()

interface TracingFormat {
  version: 1
  startTime: string
  endTime: string
  duration: number
  execution: {
    resolvers: {
      path: (string | number)[]
      parentType: string
      fieldName: string
      returnType: string
      startOffset: number
      duration: number
    }[]
  }
}

const renderLine = (line: {
  serverStart: number
  requestStart: number
  requestEnd: number
  colDivider: number
  additional: string[]
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
      ],
      colDivider,
    })
  })

  const items = [
    ['Operation', 'Mesh', 'Timeline'],
    ...lines,
    renderLine({
      serverStart: 0,
      requestStart: 0,
      requestEnd: end,
      additional: [`Total time`, `${end}ms`],
      colDivider,
    }),
  ]

  // Rewrite the above so it can handle abritraty columns
  const colWidths: number[] = Array(items[0].length).fill(0)
  items.forEach((item) => {
    item.forEach((t, index) => {
      colWidths[index] = Math.max(colWidths[index], t.length)
    })
  })

  // padd the items to the max length
  items.forEach((item) => {
    item.forEach((_, index) => {
      item[index] = `${item[index].padEnd(colWidths[index], ' ')}${
        index !== item.length - 1 ? `` : ''
      }`
    })
  })

  // render the items to a string
  const output = [[''], ...items].map((item) => item.join(' ')).join('\n')
  console.log(output)

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

    running.set(operationString, { start: new Date(), operationName: operation.operationName })
    markTimeout()

    // console.info(`GraphQL start ${operationString}`)
    return forward(operation).map((data) => {
      const tracing = data.extensions?.tracing as TracingFormat | undefined

      // Called after server responds
      running.set(operationString, {
        internalStart: tracing ? new Date(tracing.startTime) : undefined,
        start: operation.getContext().measurePerformanceLinkStart as Date,
        end: new Date(),
        operationName: operation.operationName,
      })

      markTimeout()

      return data
    })
  }
  return forward(operation)
})
