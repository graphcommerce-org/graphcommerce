import { motionValue, MotionValue } from 'framer-motion'

export type UseWindowSizeReturn = {
  width: MotionValue<number>
  height: MotionValue<number>
}

const windowSize = {
  width: motionValue(global.window?.innerHeight ?? 0),
  height: motionValue(global.window?.innerHeight ?? 0),
}

if (typeof window !== 'undefined') {
  window.addEventListener('resize', () => {
    windowSize.height.set(window?.innerHeight ?? 0)
    windowSize.width.set(window?.innerWidth ?? 0)
  })
}

export default windowSize
