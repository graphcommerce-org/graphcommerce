import type { Breakpoints } from '@mui/material'

type Interpolation = (from: number, to: number, t: number) => number

export const linear: Interpolation = (from, to, t) => (1 - t) * from + t * to
export const easeIn: Interpolation = (from, to, t) => linear(from, to, t * t)

const spread = (
  bpValues: Breakpoints['values'],
  interpolation: Interpolation,
  from: number,
  to: number,
  until: 'sm' | 'md' | 'lg' | 'xl',
) => {
  const xs = 320
  const { sm, md, lg, xl } = bpValues

  const bps = [xs, sm, md, lg, xl]
  const untilIdx = bps.indexOf(bpValues[until])

  const values = bps.map((bp, itemidx) => {
    if (itemidx > untilIdx) return to
    const val = interpolation(from, to, (bp - xs) / (bps[untilIdx] - xs))
    return Math.round(val * 100) / 100
  })
  return values as [xs: number, sm: number, md?: number, lg?: number, xl?: number]
}

export type FromTo = [number, number]

export type Expression = ResponsiveValue | FromTo | number | string
export type ResponsiveValue = [xs: string, sm: string, md?: string, lg?: string, xl?: string]

export type ResponsiveTemplate = (
  template: TemplateStringsArray,
  ...expressions: Expression[]
) => ResponsiveValue

function isFromToValue(val: unknown): val is FromTo {
  return Array.isArray(val) && val.length === 2
}

export function createResponsiveTemplate(bpValues: Breakpoints['values']): ResponsiveTemplate {
  return (template: TemplateStringsArray, ...expressions: Expression[]): ResponsiveValue => {
    const breakpoints = Object.keys(bpValues)

    const values = expressions.map((value: Expression) =>
      isFromToValue(value) ? spread(bpValues, easeIn, ...value, 'xl') : value,
    )

    return breakpoints.map((_, breakpoint) =>
      template.reduce((prev, curr, i) => {
        let val = values[i] ?? ''
        if (Array.isArray(val)) val = Array.isArray(val) ? val[breakpoint] ?? '' : values[i]
        return `${prev}${curr}${val}`
      }, ''),
    ) as ResponsiveValue
  }
}
