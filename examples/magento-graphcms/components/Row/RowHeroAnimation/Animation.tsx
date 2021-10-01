import { makeStyles, Theme } from '@material-ui/core'
import React, { useState, useRef, useEffect } from 'react'
import SimplexNoise from 'simplex-noise'

const useStyles = makeStyles(
  (theme: Theme) => ({
    parent: {
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      // overflow: 'hidden',
    },
    canvas: {
      opacity: 0.8,
      filter: 'blur(7px)',
      [theme.breakpoints.up('md')]: {
        opacity: 1,
      },
    },
  }),
  { name: 'RowHeroAnimation' },
)

export default function Animation() {
  const classes = useStyles()
  const parent = useRef<HTMLDivElement>(null)
  const canvasRefA = useRef<HTMLCanvasElement>(null)
  const simplex = useRef(new SimplexNoise())
  const [dimensions, setDimensions] = useState([2000, 1000])

  const rayCount = 250
  const rayPropCount = 8
  const rayPropsLength = rayCount * rayPropCount
  const baseLength = 200
  const rangeLength = 300
  const baseSpeed = 0.05
  const rangeSpeed = 0.1
  const baseWidth = 15
  const rangeWidth = 20
  const baseHue = 120
  const rangeHue = 60
  const baseTTL = 150
  const rangeTTL = 200
  const noiseStrength = 150
  const xOff = 0.0015
  const yOff = 0.0015
  const zOff = 0.0015
  const center: number[] = []
  const rayProps = new Float32Array(rayPropsLength)
  let tick = 0

  const { abs, round, random } = Math
  const rand = (n) => n * random()
  const fadeInOut = (t, m) => {
    const hm = 0.5 * m
    return abs(((+t + +hm) % m) - hm) / hm
  }

  const initRay = (i) => {
    const length = baseLength + rand(rangeLength)
    const x = rand(canvasRefA?.current?.width ?? 0)
    let y1 = center[1] + noiseStrength
    let y2 = center[1] + noiseStrength - length
    const n = simplex.current.noise3D(x * xOff, y1 * yOff, tick * zOff) * noiseStrength
    y1 += n
    y2 += n
    const life = 0
    const ttl = baseTTL + rand(rangeTTL)
    const width = baseWidth + rand(rangeWidth)
    const speed = baseSpeed + rand(rangeSpeed) * (round(rand(1)) ? 1 : -1)
    const hue = baseHue + rand(rangeHue)

    rayProps.set([x, y1, y2, life, ttl, width, speed, hue], i)
  }

  const initRays = () => {
    for (let i = 0; i < rayPropsLength; i += rayPropCount) {
      initRay(i)
    }
  }

  const updateRay = (i, ctxA) => {
    const i2 = 1 + +i
    const i3 = 2 + +i
    const i4 = 3 + +i
    const i5 = 4 + +i
    const i6 = 5 + +i
    const i7 = 6 + +i
    const i8 = 7 + +i

    let x = rayProps[i]
    const y1 = rayProps[i2]
    const y2 = rayProps[i3]
    let life = rayProps[i4]
    const ttl = rayProps[i5]
    const width = rayProps[i6]
    const speed = rayProps[i7]
    const hue = rayProps[i8]

    drawRay(x, y1, y2, life, ttl, width, hue, ctxA)

    x += speed
    life++

    rayProps[i] = x
    rayProps[i4] = life

    const checkBounds = (x) => {
      if (canvasRefA.current) {
        return x < 0 || x > canvasRefA.current.width
      }
      return false
    }

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

  const handleResize = () => {
    setDimensions([parent.current?.clientWidth ?? 0, parent.current?.clientHeight ?? 0])

    if (parent.current) {
      center[0] = Math.round(0.5 * parent.current?.clientWidth)
      center[1] = Math.round(0.5 * parent.current?.clientHeight)
    }
  }

  function draw(ctxA) {
    tick++
    ctxA.clearRect(0, 0, canvasRefA.current?.width, canvasRefA.current?.height)
    drawRays(ctxA)
    ctxA.globalCompositeOperation = 'lighter'

    requestAnimationFrame(() => draw(ctxA))
  }

  useEffect(() => {
    const ctxA = canvasRefA?.current?.getContext('2d')

    handleResize()
    initRays()
    requestAnimationFrame(() => draw(ctxA))

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div ref={parent} className={classes.parent}>
      <canvas
        ref={canvasRefA}
        width={dimensions[0]}
        height={dimensions[1]}
        className={classes.canvas}
      />
    </div>
  )
}
