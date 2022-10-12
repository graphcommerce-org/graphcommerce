import { PageOptions } from '@graphcommerce/framer-next-pages'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { LayoutHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { GetStaticProps } from '@graphcommerce/next-ui/Page/types'
import { Typography, Container, Box, Slider } from '@mui/material'
import { useState } from 'react'
import { LayoutMinimal, LayoutMinimalProps } from '../../components'
import { LayoutDocument } from '../../components/Layout/Layout.gql'
import { DefaultPageDocument } from '../../graphql/DefaultPage.gql'
import { graphqlSsrClient, graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutMinimalProps, Props>

/* eslint-disable */
const range = (start, end, step = 1) => {
  let output = []
  if (typeof end === 'undefined') {
    end = start
    start = 0
  }
  for (let i = start; i < end; i += step) {
    output.push(i)
  }
  return output
}
/* eslint-enable */

const topShadow = '0px -0.5px 1.5px hsl(0deg 0% 0% / 0.075),'

const addToMinimumShadows = 1 // adds to default of 2
const addToMaximumShadows = 6 // adds to default of 3
const minOffset = 0
const maxOffset = 150
const shadowCount = 24
const useShadows = [1, 2, 3, 4, 6, 8, 12, 16, 24]

const clamp = (val, min = 0, max = 1) => Math.max(min, Math.min(max, val))
const roundTo = (number, places = 0) => Math.round(number * 10 ** places) / 10 ** places
const normalize = (number, currentScaleMin, currentScaleMax, newScaleMin = 0, newScaleMax = 1) => {
  const standardNormalization = (number - currentScaleMin) / (currentScaleMax - currentScaleMin)
  return (newScaleMax - newScaleMin) * standardNormalization + newScaleMin
}

export const splitCommaSeparatedArray = (str) => {
  return str.replace(/,\s+/g, ',').split(',')
}

const getValuesForBezierCurve = ({ startPoint, endPoint, controlPoint1, controlPoint2 }, t) => {
  let x, y
  if (controlPoint2) {
    x =
      (1 - t) ** 3 * startPoint[0] +
      3 * (1 - t) ** 2 * t * controlPoint1[0] +
      3 * (1 - t) * t ** 2 * controlPoint2[0] +
      t ** 3 * endPoint[0]

    y =
      (1 - t) ** 3 * startPoint[1] +
      3 * (1 - t) ** 2 * t * controlPoint1[1] +
      3 * (1 - t) * t ** 2 * controlPoint2[1] +
      t ** 3 * endPoint[1]
  } else {
    x = (1 - t) * (1 - t) * startPoint[0] + 2 * (1 - t) * t * controlPoint1[0] + t * t * endPoint[0]
    y = (1 - t) * (1 - t) * startPoint[1] + 2 * (1 - t) * t * controlPoint1[1] + t * t * endPoint[1]
  }
  return [x, y]
}

function calculateShadowOffsets({ size, curve, spread, layerIndex, lightSource, numOfLayers }) {
  let maxOffsetBySize = new Object()

  for (var i = 1; i <= shadowCount; i++) {
    maxOffsetBySize[i] = normalize(
      curve,
      0,
      1,
      0 + Math.ceil(i * (minOffset / shadowCount)),
      0 + Math.ceil(i * (maxOffset / shadowCount)),
    )
  }

  const useCurve = {
    startPoint: [0, 1],
    endPoint: [1, 0],
    controlPoint1: [normalize(spread, 0, 1, 0.25, 0), normalize(spread, 0, 1, 0.25, 0)],
    controlPoint2: [normalize(spread, 0, 1, 0.25, 0), normalize(spread, 0, 1, 0.25, 0)],
  }
  const t = layerIndex / (numOfLayers - 1)
  const [ratio] = getValuesForBezierCurve(useCurve, t)
  const max = maxOffsetBySize[size]
  const xOffsetMin = normalize(lightSource.x, -1, 1, 1, -1)
  const xOffsetMax = normalize(lightSource.x, -1, 1, max, max * -1)
  const yOffsetMin = normalize(lightSource.y, -1, 1, 1, -1)
  const yOffsetMax = normalize(lightSource.y, -1, 1, max, max * -1)
  const x = roundTo(normalize(ratio, 0, 1, xOffsetMin, xOffsetMax), 1)
  const y = roundTo(normalize(ratio, 0, 1, yOffsetMin, yOffsetMax), 1)
  return { x, y }
}

function calculateBlurRadius({ x, y, size, curve, spread, layerIndex, numOfLayers }) {
  const hypothenuse = (x ** 2 + y ** 2) ** 0.5
  const radius = normalize(spread, 0, 1, hypothenuse * 1.5, hypothenuse * 0.75)
  return roundTo(radius, 1)
}

function calculateShadowOpacity({
  curve,
  spread,
  tintShadows,
  layerIndex,
  numOfLayers,
  minLayers,
  maxLayers,
  layerOpacityConfig,
}) {
  const baseOpacity = normalize(curve, 0, 1, 0.4, 1.25)
  const initialOpacityMultiplier = normalize(spread, 0, 1, 0, 1)
  const finalOpacityMultiplier = normalize(spread, 0, 1, 1, 0)
  const layerOpacityMultiplier = normalize(
    layerIndex,
    0,
    numOfLayers,
    initialOpacityMultiplier,
    finalOpacityMultiplier,
  )
  let opacity = baseOpacity * layerOpacityMultiplier
  const averageLayers = (minLayers + maxLayers) / 2
  const ratio = averageLayers / numOfLayers
  let layerOpacity = opacity * ratio
  if (!tintShadows) {
    layerOpacity *= layerOpacityConfig
  }

  return clamp(roundTo(layerOpacity, 2), 0, 1)
}

function calculateSpread({ curve, spread, layerIndex, numOfLayers }) {
  if (layerIndex === 0) {
    return 0
  }
  const maxReduction = normalize(spread, 0, 1, 0, -5)
  const actualReduction = normalize(layerIndex + 1, 1, numOfLayers, 0, maxReduction)
  return roundTo(actualReduction, 1)
}

function generateShadows({
  lightSource,
  resolution,
  curve,
  spread,
  tintShadows,
  layerOpacityConfig,
}) {
  let output = []
  let SHADOW_LAYER_LIMITS = new Object()
  for (var i = 1; i <= shadowCount; i++) {
    SHADOW_LAYER_LIMITS[i] = {
      min: 2 + Math.floor(i * (addToMinimumShadows / shadowCount)),
      max: 3 + Math.floor(i * (addToMaximumShadows / shadowCount)),
    }
  }
  for (const size of Object.keys(SHADOW_LAYER_LIMITS)) {
    const numOfLayers = Math.round(
      normalize(resolution, 0, 1, SHADOW_LAYER_LIMITS[size].min, SHADOW_LAYER_LIMITS[size].max),
    )
    let layersForSize = []

    range(numOfLayers).map((layerIndex) => {
      const opacity = calculateShadowOpacity({
        curve,
        spread,
        tintShadows,
        layerIndex,
        numOfLayers,
        minLayers: SHADOW_LAYER_LIMITS[size].min,
        maxLayers: SHADOW_LAYER_LIMITS[size].max,
        layerOpacityConfig,
      })

      const { x, y } = calculateShadowOffsets({
        size,
        curve,
        spread,
        lightSource,
        layerIndex,
        numOfLayers,
      })

      const blurRadius = calculateBlurRadius({
        x,
        y,
        size,
        curve,
        spread,
        layerIndex,
        numOfLayers,
      })

      const spreading = calculateSpread({
        curve,
        spread,
        layerIndex,
        numOfLayers,
      })
      const spreadingString = spreading !== 0 ? `${spreading}px ` : ''

      layersForSize.push([
        `${x}px ${y}px ${blurRadius}px ${spreadingString}hsl(0deg 0% 0% / ${opacity})`,
      ])
    })
    output.push(layersForSize)
  }

  return output
}

export function formatShadowsAsDropShadow(shadows) {
  return shadows.map((shadowsForSize) => {
    const reducedString = shadowsForSize.reduce(
      (acc, shadowString) => `${acc} drop-shadow(${shadowString})`,
      '',
    )

    return reducedString.trim()
  })
}

export function formatShadowsAsBoxShadow(shadows) {
  return shadows.map((shadowsForSize) => {
    const reducedString = shadowsForSize.reduce((acc, shadowString) => {
      if (!acc) {
        return shadowString
      }
      return `${acc},\n${shadowString}`
    }, '')

    return reducedString.trim()
  })
}

function Shadows() {
  const [curve, setCurve] = useState(0.4)
  const [spread, setSpread] = useState(0.3)
  const [distance, setDistance] = useState({ x: 0, y: -0.5 })
  const [resolution, setResolution] = useState(0.3)
  const [opacity, setOpacity] = useState(0.2)

  const shadows = generateShadows({
    lightSource: distance,
    resolution,
    curve: curve,
    spread,
    tintShadows: false,
    layerOpacityConfig: opacity,
  })
  const maxZindex = Object.keys(shadows).length
  const devMode = false

  return (
    <Container
      sx={(theme) => ({
        background: theme.palette.background.paper,
        paddingTop: theme.spacings.lg,
      })}
    >
      <Box sx={{ maxWidth: 400 }}>
        <Box>
          <Typography>Opacity</Typography>
          <Slider
            aria-label='Small steps'
            defaultValue={0.2}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setOpacity(Number(event.target.value))
            }}
            step={0.01}
            min={0}
            max={1}
            size='small'
            valueLabelDisplay='auto'
          />
        </Box>
        <Box>
          <Typography>Curve</Typography>
          <Slider
            aria-label='Small steps'
            defaultValue={0.4}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setCurve(Number(event.target.value))
            }}
            step={0.01}
            min={0}
            max={1}
            size='small'
            valueLabelDisplay='auto'
          />
        </Box>
        <Box>
          <Typography>Spread</Typography>
          <Slider
            aria-label='Small steps'
            defaultValue={0.3}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSpread(Number(event.target.value))
            }}
            step={0.01}
            min={0}
            max={1}
            size='small'
            valueLabelDisplay='auto'
          />
        </Box>
        <Box>
          <Typography>Distance</Typography>
          <Slider
            aria-label='Small steps'
            defaultValue={-0.5}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setDistance({ x: 0, y: Number(event.target.value) })
            }}
            step={0.01}
            min={-2}
            max={2}
            size='small'
            valueLabelDisplay='auto'
          />
        </Box>
      </Box>

      <Box
        sx={(theme) => ({
          margin: theme.spacings.lg,
          position: 'relative',
          display: 'grid',
          gap: theme.spacings.lg,
          gridTemplateColumns: `repeat(auto-fit, minmax(100px, 1fr))`,
          maxWidth: '100%',
          marginBottom: theme.spacings.xl,
        })}
      >
        {shadows.map((shadow, index) => {
          if (useShadows.indexOf(index + 1) > -1) {
            return (
              <>
                <Box
                  sx={(theme) => ({
                    color: theme.palette.text.disabled,
                    height: 45,
                    width: 45,
                    borderRadius: '99em',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: theme.palette.background.paper,
                    boxShadow: `${topShadow && topShadow}${(shadow as Array<unknown>).join()}`,
                  })}
                >
                  {index + 1}
                </Box>
                <Box
                  sx={(theme) => ({
                    display: 'none',
                    color: theme.palette.text.disabled,
                    height: 45,
                    width: 100,
                    borderRadius: '99em',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: theme.palette.background.paper,
                    boxShadow: `${topShadow && topShadow}${(shadow as Array<unknown>).join()}`,
                  })}
                >
                  {index + 1}
                </Box>
              </>
            )
          }
          return false
        })}
      </Box>
      <Box
        sx={(theme) => ({
          fontSize: 13,
          overflow: 'scroll',
          border: `1px solid ${theme.palette.divider}`,
          margin: theme.spacings.lg,
        })}
      >
        const shadows: Shadows = [{'\n'}
        /* 0 */ 'none',{'\n'}
        {shadows.map((shadow, index) => {
          if (useShadows.indexOf(index + 1) > -1) {
            return (
              <>
                /* {index + 1} */ `{topShadow && topShadow}
                {(shadow as Array<unknown>).join()}
                {devMode && `; content: "Shadow:${index + 1}"`}`,
                {'\n'}
              </>
            )
          }
          return (
            <>
              /* {index + 1} */ 'none',
              {'\n'}
            </>
          )
        })}
        ]
      </Box>
    </Container>
  )
}

Shadows.pageOptions = {
  Layout: LayoutMinimal,
  sharedKey: () => 'page',
} as PageOptions

export default Shadows

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const staticClient = graphqlSsrClient(locale)

  const conf = client.query({ query: StoreConfigDocument })
  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: { url: '/test/shadows' },
  })
  const layout = staticClient.query({ query: LayoutDocument })

  return {
    props: {
      ...(await page).data,
      ...(await layout).data,
      up: { href: '/', title: 'Shadows' },
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
