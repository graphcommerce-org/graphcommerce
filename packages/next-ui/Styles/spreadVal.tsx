import type { Breakpoints } from '@mui/material'

type Interpolation = (from: number, to: number, t: number) => number

export const linear: Interpolation = (from, to, t) => (1 - t) * from + t * to
export const easeIn: Interpolation = (from, to, t) => linear(from, to, t * t)

export type SpreadValReturn = [xs: number, sm: number, md?: number, lg?: number, xl?: number]

type Until = 'sm' | 'md' | 'lg' | 'xl'

export type SpreadVal = (
  bpValues: Breakpoints['values'],
  interpolation: Interpolation,
  from: number,
  to: number,
  until: Until,
) => SpreadValReturn

const spread: SpreadVal = (bpValues, interpolation, from, to, until) => {
  const xs = 320
  const { sm, md, lg, xl } = bpValues

  const bps = [xs, sm, md, lg, xl]
  const untilIdx = bps.indexOf(bpValues[until])

  const values = bps.map((bp, itemidx) => {
    if (itemidx > untilIdx) return to
    const val = interpolation(from, to, (bp - xs) / (bps[untilIdx] - xs))
    return Math.round(val * 100) / 100
  })
  return values as SpreadValReturn
}

export type FromTo = [number, number]

export type Expression = ResponsiveValue | FromTo | number | string
export type ResponsiveValue = [xs: string, sm: string, md?: string, lg?: string, xl?: string]

export type ResponsiveTemplate = (
  template: TemplateStringsArray,
  ...expressions: Expression[]
) => ResponsiveValue

export function createResponsiveTemplate(bpValues: Breakpoints['values']): ResponsiveTemplate {
  return (template: TemplateStringsArray, ...expressions: Expression[]): ResponsiveValue => {
    const breakpoints = Object.keys(bpValues)

    const expressionsExpanded = expressions.map((value: Expression) => {
      if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        value.length === breakpoints.length
      )
        return value

      const [from, to] = value
      return spread(bpValues, easeIn, from, to, 'xl')
    })

    return breakpoints.map((_, breakpoint) =>
      template.reduce((prev, curr, i) => {
        const value = expressionsExpanded[i]?.[breakpoint] ?? expressions[i]
        return `${prev}${curr}${value}`
      }, ''),
    ) as ResponsiveValue
  }
}

export function createResponsiveBreakpoints(bpValues: Breakpoints['values']): Breakpoints {
  const templater = createResponsiveTemplate(bpValues)
  return (template: TemplateStringsArray, ...expressions: Expression[]): Record<Breakpoints, string> => {
    const result = templater(template, ...expressions)

    return result.reduce((prev, curr, i) => {
      const key = Object.keys(bpValues)[i]
      return { ...prev, [key]: curr }
    }
  }
}
