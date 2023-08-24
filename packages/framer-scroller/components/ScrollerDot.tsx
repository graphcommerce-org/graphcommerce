import { useMotionValueValue } from '@graphcommerce/framer-utils'
// eslint-disable-next-line import/no-extraneous-dependencies
import { extendableComponent } from '@graphcommerce/next-ui/Styles'
import { i18n } from '@lingui/core'
import { Fab, FabProps, styled } from '@mui/material'
import { m } from 'framer-motion'
import { useScrollTo } from '../hooks/useScrollTo'
import { useScrollerContext } from '../hooks/useScrollerContext'
import { ItemState } from '../types'

const name = 'ScrollerDot'
const parts = ['dot', 'circle'] as const
type OwnerProps = { active: boolean }

const { withState } = extendableComponent<OwnerProps, typeof name, typeof parts>(name, parts)

type ScrollerDotProps = Omit<FabProps, 'onClick' | 'className'> & ItemState & { idx: number }

const MotionBox = styled(m.div)({})

export function ScrollerDot(props: ScrollerDotProps) {
  const { el, visibility, opacity, idx, ...fabProps } = props
  const scrollTo = useScrollTo()
  const { getScrollSnapPositions } = useScrollerContext()

  const active = useMotionValueValue(visibility, (v) => v > 0.5)
  const classes = withState({ active })

  return (
    <Fab
      // eslint-disable-next-line react/no-array-index-key
      color='inherit'
      size='small'
      {...fabProps}
      onClick={() => {
        const positions = getScrollSnapPositions()
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        scrollTo({ x: positions.x[idx] ?? 0, y: positions.y[idx] ?? 0 })
      }}
      className={classes.dot}
      aria-label={i18n._(/* i18n */ 'Navigate to item {0}', { 0: idx + 1 })}
      sx={{
        boxShadow: 'none',
        background: 'transparent',
        aspectRatio: '1/1',
        height: 'auto',
        minHeight: 'auto',
      }}
    >
      <MotionBox
        className={classes.circle}
        sx={(theme) => ({
          borderRadius: '99em',
          width: { xs: 6, sm: 8, md: 10 },
          height: { xs: 6, sm: 8, md: 10 },
          background: theme.palette.text.primary,
        })}
        style={{ opacity }}
      />
    </Fab>
  )
}
