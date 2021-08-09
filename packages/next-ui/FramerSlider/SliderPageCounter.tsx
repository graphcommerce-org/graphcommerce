import { makeStyles, Theme } from '@material-ui/core'
import { m } from 'framer-motion'
import React from 'react'
import { UseStyles } from '../Styles'
import { useSliderContext } from './SliderContext'

const useStyles = makeStyles(
  (theme: Theme) => ({
    pageCounter: {
      ...theme.typography.h4,
    },
  }),
  { name: 'SliderPageCounter' },
)

export type SliderPageCounterProps = { count: number; layout?: boolean } & UseStyles<
  typeof useStyles
>

export default function SliderPageCounter(props: SliderPageCounterProps) {
  const { count, layout } = props
  const classes = useStyles(props)
  const [state] = useSliderContext()

  const items = state.items
    .map((item, idx) => [idx + 1, item] as const)
    .filter(([, item]) => item.visible)

  let current = items[Math.ceil((items.length - 1) / 2)]?.[0] ?? 0
  current = items[0]?.[0] === 1 ? 1 : current
  current = items[items.length - 1]?.[0] === count ? count : current

  return (
    <m.div layout={layout} className={classes.pageCounter}>
      <span>{String(current).padStart(2, '0')}</span> — {String(count).padStart(2, '0')}
    </m.div>
  )
}
