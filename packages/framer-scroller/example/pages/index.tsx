import { Dots, Scrollable, ScrollableProvider } from '@reachdigital/framer-scroller'
import { motion, MotionStyle, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { GetStaticProps } from 'next'
import React, { useRef } from 'react'

type IndexProps = { title: string }

function Index(props: IndexProps) {
  const { title } = props

  const size = useMotionValue(400)
  const width = useSpring(size)
  const style: MotionStyle = {
    width,
    height: 400,
    border: '1px solid #ddd',
    textAlign: 'center',
    padding: 10,
  }

  const containerSize = useMotionValue(100)
  const containerWidth = useMotionTemplate`${useSpring(containerSize)}%`

  const ref = useRef<HTMLDivElement>(null)

  const items = [
    <motion.div key={1} style={style}>
      item 1
    </motion.div>,
    <motion.div key={2} style={style}>
      item 2
    </motion.div>,
    <motion.div key={3} style={style}>
      item 3
    </motion.div>,
    <motion.div key={4} style={style}>
      item 4
    </motion.div>,
    <motion.div key={5} style={style}>
      item 5
    </motion.div>,
    <motion.div key={6} style={style}>
      item 6
    </motion.div>,
    <motion.div key={7} style={style}>
      item 7
    </motion.div>,
    <motion.div key={8} style={style}>
      item 8
    </motion.div>,
    <motion.div key={9} style={style}>
      item 9
    </motion.div>,
    <motion.div key={10} style={style}>
      item 10
    </motion.div>,
    <motion.div key={11} style={style}>
      item 11
    </motion.div>,
    <motion.div key={12} style={style}>
      item 12
    </motion.div>,
    <motion.div key={13} style={style}>
      item 13
    </motion.div>,
    <motion.div key={14} style={style}>
      item 14
    </motion.div>,
    <motion.div key={15} style={style}>
      item 15
    </motion.div>,
    <motion.div key={16} style={style}>
      item 16
    </motion.div>,
    <motion.div key={17} style={style}>
      item 17
    </motion.div>,
    <motion.div key={18} style={style}>
      item 18
    </motion.div>,
    <motion.div key={19} style={style}>
      item 19
    </motion.div>,
    <motion.div key={20} style={style}>
      item 20
    </motion.div>,
  ]

  return (
    <ScrollableProvider>
      <button
        type='button'
        onClick={() => {
          size.set(Math.random() * 200 + 200)
        }}
      >
        resize items
      </button>
      <button
        type='button'
        onClick={() => {
          containerSize.set(Math.random() * 50 + 50)
        }}
      >
        resize container
      </button>
      <Scrollable ref={ref} style={{ width: containerWidth }}>
        {items}
      </Scrollable>
      <Dots scrollerRef={ref} count={items.length} />
    </ScrollableProvider>
  )
}

export default Index

export const getStaticProps: GetStaticProps<IndexProps> = async () => ({
  props: {
    title: 'Index Page',
  },
})
