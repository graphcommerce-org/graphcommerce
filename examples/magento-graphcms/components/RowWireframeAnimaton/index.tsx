import { makeStyles, Container, Theme, useTheme, Popper, Fab } from '@material-ui/core'
import { m, useMotionValue, useTransform } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import Asset from '../Asset'
import Hint from './hint'

const useStyles = makeStyles(
  (theme: Theme) => ({
    rowWrapper: {
      background: '#001727',
      paddingTop: '30vh',
      '& > div': {
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        perspective: 100,
        width: '100%',
        paddingTop: '200px',
      },
      '& > div > div': {
        // is interactive
      },
      '& img': {
        marginBottom: '-5%',
        width: '70vw !important',
      },
    },
    svg: {
      border: '1px solid yellow',
      background: 'none',
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 3,
      pointerEvents: 'none',
    },
    secondRow: {
      background: '#fff',
      height: '40vw',
    },
  }),
  { name: 'WireframeAnimation' },
)

export default function RowWireframeAnimation() {
  const classes = useStyles()
  const theme = useTheme()
  const asset = {
    url: '/wireframe.svg',
    width: 300,
    height: 400,
    mimeType: 'image/jpeg',
  }

  const [lines, setLines] = useState([])
  const [maxX, setMaxX] = useState(0)
  const [maxY, setMaxY] = useState(0)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [0, maxY], [1, -1])
  const rotateY = useTransform(x, [0, maxX], [-1, 1])
  const parent = useRef<HTMLDivElement>(null)

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect()

    setMaxX(event.view.innerWidth)
    setMaxY(event.view.innerHeight)

    x.set(event.clientX - rect.left)
    y.set(event.clientY)

    if (parent) {
      console.log(parent.current?.getBoundingClientRect().y)
    }
  }

  return (
    <Container maxWidth={false}>
      <div className={classes.rowWrapper} onMouseMove={handleMouse}>
        <div ref={parent}>
          {lines.map((line) => (
            <svg key={line.id} className={classes.svg}>
              <m.line
                x1='0'
                y1='0'
                x2={line.hintPosX}
                y2={line.hintPosY}
                stroke='white'
                strokeWidth='2.4'
                fill='none'
              />
            </svg>
          ))}

          <m.div
            style={{
              rotateX,
              rotateY,
            }}
          >
            <Hint
              content='Adding components to any page can be done directly from the GraphCMS admin interface.'
              hintLeft='80%'
              hintTop='20%'
              offsetLeft='100'
              offsetTop='50'
              lines={lines}
              setLines={setLines}
            />
            <Hint
              content='Navigaton is generated automatically, based on Magento categories'
              hintLeft='10%'
              hintTop='5%'
              offsetLeft='-100'
              offsetTop='50'
              lines={lines}
              setLines={setLines}
            />
            <Asset asset={asset} sizes={{ 0: '50vw', [theme.breakpoints.values.md]: '72vw' }} />
          </m.div>
        </div>
      </div>
      <div className={classes.secondRow} />
    </Container>
  )
}
