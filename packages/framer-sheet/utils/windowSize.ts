import { motionValue, MotionValue } from 'framer-motion'

export type UseWindowSizeReturn = {
  x: MotionValue<number>
  y: MotionValue<number>
}

const windowSize: UseWindowSizeReturn = {
  x: motionValue(global.window?.innerHeight ?? 0),
  y: motionValue(global.window?.innerHeight ?? 0),
}

if (typeof window !== 'undefined') {
  window.addEventListener('resize', () => {
    windowSize.x.set(window?.innerHeight ?? 0)
    windowSize.y.set(window?.innerWidth ?? 0)
  })
}

export default windowSize
