import { makeStyles, Theme } from '@material-ui/core'
import { useMotionValueValue } from '@reachdigital/framer-utils'
import clsx from 'clsx'
import { m, MotionProps } from 'framer-motion'
import React, { useState } from 'react'
import { useScrollerContext } from '../hooks/useScrollerContext'
import { useWatchItems } from '../hooks/useWatchItems'

const useStyles = makeStyles(
  (theme: Theme) => ({
    pageCounter: {
      ...theme.typography.h4,
    },
  }),
  { name: 'SliderPageCounter' },
)

export type SliderPageCounterProps = MotionProps &
  React.PropsWithoutRef<React.HTMLProps<HTMLDivElement>>

const ScrollerPageCounter = React.forwardRef<HTMLDivElement, SliderPageCounterProps>(
  (props, ref) => {
    const { className, ...divProps } = props
    const classes = useStyles(props)
    const { items } = useScrollerContext()

    const [current, setCurrent] = useState(1)

    const count = useMotionValueValue(items, (itemsArr) => itemsArr.length)
    useWatchItems((_, itemArr) => {
      const visibleItems = itemArr
        .map((i, idx) => [idx + 1, i.visibility.get()])
        .filter((i) => i[1] > 0)
        .sort((a, b) => b[1] - a[1])

      setCurrent(visibleItems[0]?.[0] ?? '?')
    })

    return (
      <m.div ref={ref} {...divProps} className={clsx(classes.pageCounter, className)}>
        <span>{String(current).padStart(2, '0')}</span> — {String(count).padStart(2, '0')}
      </m.div>
    )
  },
)

export default ScrollerPageCounter
