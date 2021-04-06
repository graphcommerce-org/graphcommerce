import { usePageDepth } from '@reachdigital/framer-next-pages'
import { motion } from 'framer-motion'
import { PropsWithChildren } from 'react'

export default function StackedDrawer({ children }: PropsWithChildren<unknown>) {
  const depth = usePageDepth()

  return (
    <motion.div
      style={{
        boxSizing: 'border-box',
        position: 'absolute',
        top: 0,
        background: '#fff',
        marginBlockEnd: -200,
        overflow: 'hidden',
        right: 0,
        width: 600,
        boxShadow: `rgba(100, 100, 111, 0.2) 0px 7px 29px 0px`,
        originY: 0,
        height: 3000,
      }}
      animate='enter'
      exit='exit'
      initial='exit'
      variants={{
        enter: { y: 0, opacity: 1, x: depth * 40 },
        exit: { y: 0, x: 100 + depth * 4, opacity: 0 },
      }}
      transition={{ ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}
