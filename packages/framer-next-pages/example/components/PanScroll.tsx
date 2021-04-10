import styles from '@reachdigital/next-ui/FramerModalSheet/styles'
import {
  Inertia,
  motion,
  PanInfo,
  Point2D,
  useAnimation,
  useDomEvent,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

function velocityClampAxis(velocity: number, offset: number, clamp: number) {
  return velocity < 0 ? Math.max(velocity, offset * clamp) : Math.min(velocity, offset * clamp)
}
function velocityClamp({ velocity, offset }: PanInfo, clamp = 2): Point2D {
  return {
    x: velocityClampAxis(velocity.x, offset.x, clamp),
    y: velocityClampAxis(velocity.y, offset.y, clamp),
  }
}

function nearest(x: number, possible: number[]) {
  return possible.reduce<number>(
    (prev, curr) => (Math.abs(curr - x) < Math.abs(prev - x) ? curr : prev),
    possible[0],
  )
}

function useWindowSize() {
  const winRef = useRef(global.window)
  const windowBox = () => ({
    y: global.window?.innerHeight ?? 0,
    x: global.window?.innerWidth ?? 0,
  })

  const [size, setSize] = useState<Point2D>(windowBox())
  useDomEvent(winRef, 'resize', () => {
    setSize(windowBox())
  })

  return size
}

const inertia: Inertia = {
  type: 'inertia',
  velocity: 100,
  bounceStiffness: 200,
  bounceDamping: 40,
  timeConstant: 750,
  restDelta: 1,
}
const spring = {
  type: 'spring',
  stiffness: 200,
  damping: 40,
  restDelta: 1,
  restSpeed: 10,
}

export default function PanScroll(props: { children?: React.ReactNode; open: boolean }) {
  const { children, open } = props
  const windowSize = useWindowSize()
  const top = 100
  const height = windowSize.y - top
  const snapPoints = [top, windowSize.y - 200]
  const y = useMotionValue<number>(snapPoints[0])
  const controls = useAnimation()

  const inititalY = snapPoints[0]

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    controls.start(open ? 'open' : 'closed')
  }, [open, controls])

  const onDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const target = velocityClamp(info).y + y.get()
    const near = nearest(target, snapPoints)

    await controls.start({
      y: y.get(),
      transition: {
        ...inertia,
        velocity: info.velocity.y,
        min: near,
        max: near,
      },
    })
  }

  const rotateLeft = useSpring(
    useTransform(useVelocity(y), (v) => {
      let deg = 0
      if (v > 10) deg = 10
      if (v < -10) deg = -10
      return deg
    }),
    spring,
  )
  const rotateRight = useTransform(rotateLeft, (v) => v * -1)

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <motion.div
        variants={{
          open: { y: inititalY },
          closed: { y: windowSize.y + 200 },
        }}
        initial='closed'
        exit='closed'
        transition={spring}
        animate={controls}
        drag='y'
        dragMomentum={false}
        onDragEnd={onDragEnd}
        style={{
          backgroundColor: '#fff',
          borderTopRightRadius: '8px',
          borderTopLeftRadius: '8px',
          boxShadow: '0px -2px 16px rgba(0, 0, 0, 0.3)',
          flexDirection: 'row',
          willChange: `transform`,
          height: 40,
          width: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          y,
        }}
      >
        <motion.span style={{ ...styles.indicator, translateX: 2, rotate: rotateLeft }} />
        <motion.span style={{ ...styles.indicator, translateX: -2, rotate: rotateRight }} />
      </motion.div>
      <motion.div
        style={{
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          willChange: `transform`,
          overflow: 'auto',
          height: height - 50,
          y,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
