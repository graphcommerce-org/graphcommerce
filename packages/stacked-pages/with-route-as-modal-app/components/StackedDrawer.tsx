import { motion } from 'framer-motion'
import { PropsWithChildren } from 'react'
import { useStackLevel } from '../pages/_app'

export default function StackedDrawer({ children }: PropsWithChildren<unknown>) {
  const stackLevel = useStackLevel()

  return (
    <motion.div
      style={{
        boxSizing: 'border-box',
        position: 'absolute',
        top: 0,
        background: '#fff',
        padding: `40px 240px 40px 40px`,
        right: -200,
        width: 600 + 200,
        boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`,
        originY: 0,
        height: 3000,
      }}
      animate='enter'
      exit='exit'
      initial='exit'
      variants={{
        enter: { y: 0, opacity: 1, x: stackLevel * 40 },
        exit: { y: 0, x: 100 + stackLevel * 4, opacity: 0 },
      }}
      transition={{ ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}
