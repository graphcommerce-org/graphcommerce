import type { MotionValue } from 'framer-motion'
import { frame, motionValue } from 'framer-motion'

export type ClientSize = {
  x: MotionValue<number>
  y: MotionValue<number>
}

const x = () => global.window?.innerWidth ?? 0
const y = () => global.window?.innerHeight ?? 0

export const clientSize: ClientSize = {
  x: motionValue(x()),
  y: motionValue(y()),
}

if (typeof window !== 'undefined') {
  window.addEventListener('resize', () => {
    frame.read(() => {
      clientSize.x.set(x())
      clientSize.y.set(y())
    })
  })
}
