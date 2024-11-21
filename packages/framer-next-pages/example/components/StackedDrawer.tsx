import { usePageContext } from '@graphcommerce/framer-next-pages'
import { m } from 'framer-motion'

export function StackedDrawer(props: { variant: 'left' | 'right'; children: React.ReactNode }) {
  const { children, variant } = props
  const { depth } = usePageContext()

  const offset = variant === 'right' ? depth * 40 : depth * -40

  return (
    <m.div
      style={{
        boxSizing: 'border-box',
        position: 'absolute',
        top: 0,
        background: '#fff',
        marginBlockEnd: -200,
        overflow: 'hidden',
        width: 600,
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        originY: 0,
        height: 3000,
        [variant]: 0,
        willChange: 'opacity, transform',
      }}
      animate='enter'
      exit='exit'
      initial='exit'
      variants={{
        enter: {
          y: 0,
          opacity: 1,
          x: offset,
        },
        exit: {
          y: 0,
          x: (variant === 'right' ? 100 : -100) + offset,
          opacity: 0,
        },
      }}
      transition={{ ease: 'easeInOut' }}
    >
      {children}
    </m.div>
  )
}
