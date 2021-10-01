import makeStyles from '@mui/styles/makeStyles';
import { CSSProperties } from '@mui/styles'
import { AnimatePresence, HTMLMotionProps, m } from 'framer-motion'

export type DebugSpacerProps = {
  height?: number
  color?: CSSProperties['color']
} & HTMLMotionProps<'div'>

const useStyles = makeStyles(() => ({
  root: {
    background: `repeating-linear-gradient(-45deg, transparent, transparent 20px, #f6f6f6 20px, #f6f6f6 40px) top left`,
    boxShadow: `#eee 0px 0px 0px 3px inset`,
    overflow: 'hidden',
  },
  div: {
    color: `rgba(0,0,0,0.1)`,
    overflow: 'hidden',
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
    display: 'grid',
    alignItems: 'center',
  },
}))
export default function DebugSpacer({ height = 250, ...divProps }: DebugSpacerProps) {
  const classes = useStyles()
  let increment = 0
  // eslint-disable-next-line no-return-assign
  const rows = new Array(Math.ceil(height / 100)).fill(0).map(() => {
    increment += 100
    return Math.min(increment, height)
  })

  return (
    <m.div className={classes.root} {...divProps} animate={{ height }}>
      <AnimatePresence>
        {rows.map((nr) => (
          <div
            data-key={`debug-row-${nr}`}
            className={classes.div}
            style={{ height: nr % 100 || 100, borderTop: `3px solid #efefef` }}
            key={`debug-row-${nr}`}
          >
            {nr}
          </div>
        ))}
      </AnimatePresence>
    </m.div>
  )
}
