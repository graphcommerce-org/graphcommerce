import { Container, makeStyles, Typography } from '@material-ui/core'
import React, { useState, useRef, useEffect } from 'react'
import SimplexNoise from 'simplex-noise'
import { responsiveVal } from '../../../../packages/next-ui'

const useStyles = makeStyles(
  () => ({
    hero: {
      position: 'relative',
      '& > *': {
        position: 'relative',
      },
    },
    copy: {
      padding: `${responsiveVal(60, 300)} 0`,
      left: 0,
      zIndex: 1,
      color: '#fff',
      display: 'grid',
      gridTemplateRows: 'auto auto',
      justifyItems: 'stretch',
      '& > * > *': {
        padding: `${responsiveVal(10, 20)} 0`,
      },
    },
    title: {
      fontSize: responsiveVal(60, 110),
      lineHeight: responsiveVal(40, 120),
    },
    body: {
      width: '50%',
      marginLeft: '50%',
    },
    parent: {
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
    },
    visibleCanvas: {
      // filter: 'blur(30px)',
      // position: 'absolute',
    },
    hiddenCanvas: {
      display: 'none',
    },
  }),
  { name: 'RowHeroAnimation' },
)

export default function RowHeroAnimation() {
  const classes = useStyles()
  const parent = useRef<HTMLDivElement>(null)
  const canvasRefA = useRef<HTMLCanvasElement>(null)
  const canvasRefB = useRef<HTMLCanvasElement>(null)
  const simplex = useRef(new SimplexNoise())
  const [dimensions, setDimensions] = useState([2000, 2000])

  const rayCount = 300
  const rayPropCount = 8
  const rayPropsLength = rayCount * rayPropCount
  const baseLength = 200
  const rangeLength = 300
  const baseSpeed = 0.05
  const rangeSpeed = 0.1
  const baseWidth = 10
  const rangeWidth = 20
  const baseHue = 120
  const rangeHue = 60
  const baseTTL = 150
  const rangeTTL = 200
  const noiseStrength = 150
  const xOff = 0.0015
  const yOff = 0.0015
  const zOff = 0.0015
  const backgroundColor = 'rgb(0,23,39)'

  let center = new Array()
  let tick = 0
  const rayProps = new Float32Array(rayPropsLength)

  const { abs, round, random } = Math
  const rand = (n) => n * random()
  const fadeInOut = (t, m) => {
    const hm = 0.5 * m
    return abs(((t + hm) % m) - hm) / hm
  }

  const initRays = () => {
    for (let i = 0; i < rayPropsLength; i += rayPropCount) {
      initRay(i)
    }
  }

  const initRay = (i) => {
    let length
    let x
    let y1
    let y2
    let n
    let life
    let ttl
    let width
    let speed
    let hue

    length = baseLength + rand(rangeLength)
    x = rand(canvasRefA?.current?.width ?? 0)
    y1 = center[1] + noiseStrength
    y2 = center[1] + noiseStrength - length
    n = simplex.current.noise3D(x * xOff, y1 * yOff, tick * zOff) * noiseStrength
    y1 += n
    y2 += n
    life = 0
    ttl = baseTTL + rand(rangeTTL)
    width = baseWidth + rand(rangeWidth)
    speed = baseSpeed + rand(rangeSpeed) * (round(rand(1)) ? 1 : -1)
    hue = baseHue + rand(rangeHue)

    rayProps.set([x, y1, y2, life, ttl, width, speed, hue], i)
  }

  const updateRay = (i, ctxA) => {
    const i2 = 1 + i
    const i3 = 2 + i
    const i4 = 3 + i
    const i5 = 4 + i
    const i6 = 5 + i
    const i7 = 6 + i
    const i8 = 7 + i
    let x
    let y1
    let y2
    let life
    let ttl
    let width
    let speed
    let hue

    x = rayProps[i]
    y1 = rayProps[i2]
    y2 = rayProps[i3]
    life = rayProps[i4]
    ttl = rayProps[i5]
    width = rayProps[i6]
    speed = rayProps[i7]
    hue = rayProps[i8]

    drawRay(x, y1, y2, life, ttl, width, hue, ctxA)

    x += speed
    life++

    rayProps[i] = x
    rayProps[i4] = life

    if (checkBounds(x) || life > ttl) {
      initRay(i)
    }
  }

  const drawRays = (ctxA) => {
    for (let i = 0; i < rayPropsLength; i += rayPropCount) {
      updateRay(i, ctxA)
    }
  }

  const drawRay = (x, y1, y2, life, ttl, width, hue, ctxA) => {
    const gradient = ctxA.createLinearGradient(x, y1, x, y2)
    gradient.addColorStop(0, `hsla(${hue},100%,65%,0)`)
    gradient.addColorStop(0.5, `hsla(${hue},100%,65%,${fadeInOut(life, ttl)})`)
    gradient.addColorStop(1, `hsla(${hue},100%,65%,0)`)

    ctxA.save()
    ctxA.beginPath()
    ctxA.strokeStyle = gradient
    ctxA.lineWidth = width
    ctxA.moveTo(x, y1)
    ctxA.lineTo(x, y2)
    ctxA.stroke()
    ctxA.closePath()
    ctxA.restore()
  }

  const checkBounds = (x) => {
    if (canvasRefA.current) {
      return x < 0 || x > canvasRefA.current.width
    }
  }

  const handleResize = () => {
    setDimensions([parent.current?.clientWidth ?? 0, parent.current?.clientHeight ?? 0])

    if (parent.current) {
      center[0] = 0.5 * parent.current?.clientWidth
      center[1] = 0.5 * parent.current?.clientHeight
    }
  }

  function draw(ctxA, ctxB) {
    tick++
    ctxA.clearRect(0, 0, canvasRefA.current?.width, canvasRefA.current?.height)
    drawRays(ctxA)
    ctxA.globalCompositeOperation = 'lighter'

    ctxB.fillStyle = backgroundColor
    ctxB.fillRect(0, 0, canvasRefB.current?.width, canvasRefB.current?.height)
    ctxB.save()
    ctxB.filter = 'blur(12px)'
    ctxB.drawImage(canvasRefA.current, 0, 0)
    ctxB.restore()

    requestAnimationFrame(() => draw(ctxA, ctxB))
  }

  useEffect(() => {
    const ctxA = canvasRefA?.current?.getContext('2d')
    const ctxB = canvasRefB?.current?.getContext('2d')

    handleResize()
    initRays()
    requestAnimationFrame(() => draw(ctxA, ctxB))

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Container maxWidth={false}>
      <div className={classes.hero}>
        <div className={classes.copy}>
          <Container>
            <Typography variant='h3'>Graphcommerce®</Typography>
            <Typography variant='h2' className={classes.title}>
              Where the future of e-commerce is headless.
            </Typography>
            <Typography variant='h3' className={classes.body}>
              GraphCommerce® is an open source, headless e-commerce storefront build with GraphQL,
              React, Typescript and Next.js.
            </Typography>
          </Container>
        </div>

        <div ref={parent} className={classes.parent}>
          <canvas
            ref={canvasRefA}
            width={dimensions[0]}
            height={dimensions[1]}
            className={classes.hiddenCanvas}
          />
          <canvas
            ref={canvasRefB}
            width={dimensions[0]}
            height={dimensions[1]}
            className={classes.visibleCanvas}
          />
        </div>
      </div>
    </Container>
  )
}
