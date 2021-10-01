import { makeStyles, Container, Theme, useTheme, Popper, Fab } from '@material-ui/core'
import { m, useMotionValue, useTransform } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import Asset from '../Asset'

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
    indicator: {
      position: 'absolute',
      top: '10%',
      left: '1%',
      padding: 0,
      background: 'transparent',
    },
    disc: {
      height: 14,
      width: 14,
      background: '#ffffff',
      borderRadius: '99em',
    },
    popper: {
      zIndex: 1,
    },
    svg: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 3,
    },
    popperContent: {
      maxWidth: 300,
      color: '#888DA8',
      borderRadius: 8,
      padding: theme.spacings.xs,
      backgroundColor: theme.palette.background.paper,
      // boxShadow: '0 6px 60px -3px #00080D',
      fontSize: '15px',
      lineHeight: '24px',
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

  const [maxX, setMaxX] = useState(0)
  const [maxY, setMaxY] = useState(0)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const indicatorX = useMotionValue(0)
  const indicatorY = useMotionValue(0)
  const hintX = useMotionValue(0)
  const hintY = useMotionValue(0)

  const rotateX = useTransform(y, [0, maxY], [1, -1])
  const rotateY = useTransform(x, [0, maxX], [-1, 1])

  const indicator = useRef()
  const hint = useRef()
  const parent = useRef()

  function drawLine() {
    const parentRect = parent.current.getBoundingClientRect()
    const indicatorRect = indicator.current.getBoundingClientRect()
    const hintRect = hint.current.getBoundingClientRect()

    indicatorX.set(indicatorRect.x - parentRect.x + indicatorRect.width / 2)
    indicatorY.set(indicatorRect.y - parentRect.y + indicatorRect.height / 2)
    hintX.set(hintRect.x + hintRect.width / 2 - parentRect.x)
    hintY.set(hintRect.y + hintRect.height - parentRect.y - 2)
  }

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect()

    setMaxX(event.view.innerWidth)
    setMaxY(event.view.innerHeight)

    x.set(event.clientX - rect.left)
    y.set(event.clientY)

    drawLine()
  }

  return (
    <Container maxWidth={false} onMouseMove={handleMouse} onMouseLeave={handleMouse}>
      <div className={classes.rowWrapper}>
        <div ref={parent}>
          <svg className={classes.svg}>
            <m.line
              x1={hintX}
              y1={hintY}
              x2={indicatorX}
              y2={indicatorY}
              stroke='white'
              strokeWidth='2.4'
              fill='none'
            />
          </svg>

          <m.div
            style={{
              rotateX,
              rotateY,
            }}
          >
            <Fab size='small' aria-label='add' ref={indicator} className={classes.indicator}>
              <div className={classes.disc} />
            </Fab>

            <Popper
              open
              anchorEl={indicator.current}
              className={classes.popper}
              placement='top'
              keepMounted
              ref={hint}
              modifiers={{
                flip: {
                  enabled: false,
                },
                offset: {
                  enabled: true,
                  offset: '-60,60',
                },
              }}
              popperOptions={{
                eventsEnabled: false,
              }}
            >
              <div className={classes.popperContent}>
                Adding components to any page can be done directly from the GraphCMS admin
                interface.
              </div>
            </Popper>

            <Asset asset={asset} sizes={{ 0: '50vw', [theme.breakpoints.values.md]: '72vw' }} />
          </m.div>
        </div>
      </div>
      <div className={classes.secondRow} />
    </Container>
  )
}
