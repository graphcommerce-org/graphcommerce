import { Breakpoints } from '@mui/material/styles'
import { breakpoints } from '../Theme/breakpoints'

type Interpolation = (from: number, to: number, t: number) => number

const linear: Interpolation = (from, to, t) => (1 - t) * from + t * to
const easeIn: Interpolation = (from, to, t) => linear(from, to, t * t)

export type SpreadValReturn = [xs: number, sm: number, md?: number, lg?: number, xl?: number]

export type SpreadVal = (
  from: number,
  to: number,
  until?: 'sm' | 'md' | 'lg' | 'xl',
) => SpreadValReturn

function spread(
  from: number,
  to: number,
  until: 'sm' | 'md' | 'lg' | 'xl',
  lerp: Interpolation,
  bpValues: Breakpoints['values'] = breakpoints.values,
): SpreadValReturn {
  const xs = 320
  const { sm, md, lg, xl } = bpValues

  const bps = [xs, sm, md, lg, xl]
  const untilIdx = bps.indexOf(bpValues[until])

  const values = bps.map((bp, itemidx) => {
    if (itemidx > untilIdx) return to
    const val = lerp(from, to, (bp - xs) / (bps[untilIdx] - xs))
    return Math.round(val * 100) / 100
  })

  return values as SpreadValReturn
}

export const spreadLinear: SpreadVal = (
  from: number,
  to: number,
  until: 'sm' | 'md' | 'lg' | 'xl' = 'md',
) => spread(from, to, until, linear)

export const spreadVal: SpreadVal = (
  from: number,
  to: number,
  until: 'sm' | 'md' | 'lg' | 'xl' = 'md',
) => spread(from, to, until, easeIn)
