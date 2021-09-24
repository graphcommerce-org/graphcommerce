import { makeStyles, Container, Theme, useTheme, Typography } from '@material-ui/core'
import { responsiveVal } from '@reachdigital/next-ui'
import { m, useMotionValue, useTransform } from 'framer-motion'
import React, { useState } from 'react'
import Asset from '../../Asset'
import Hint from './hint'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      background: '#001727',
    },
    pagebuilder: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      perspective: 1000,
      width: '100%',
      overflow: 'hidden',
    },
    copy: {
      maxWidth: '70%',
      [theme.breakpoints.up('sm')]: {
        width: '500px',
      },
      margin: responsiveVal(60, 200),
      marginBottom: responsiveVal(100, 220),
    },
    interactive: {
      transition: 'transform 0.2s ease-out',
      backfaceVisibility: 'visible',
      position: 'relative',
      width: '80vw',
      [theme.breakpoints.up('md')]: {
        width: '60vw',
        maxWidth: '1458px',
      },
      marginBottom: responsiveVal(20, 60),
      'transform-style': 'preserve-3d',
      '& picture': {
        position: 'relative',
        '& img': {
          'transform-style': 'preserve-3d',
          transform: 'translateZ(-150px)',
        },
      },
      '& picture:nth-of-type(2)': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        '& img': {
          'transform-style': 'preserve-3d',
          transform: 'translateZ(-50px)',
        },
      },
      '& picture:nth-of-type(3)': {
        position: 'absolute',
        top: 'calc(50% + 10px)',
        left: 0,
        width: '100%',
        height: '100%',
        '& img': {
          transform: 'rotateX(87deg) translateY(calc(50% - 150px))',
        },
      },
    },
  }),
  { name: 'WireframeAnimation' },
)

export default function RowWireframeAnimation() {
  const classes = useStyles()
  const theme = useTheme()
  const layer1 = {
    url: '/shape.svg',
    width: 1458,
    height: 984,
    mimeType: 'image/jpeg',
  }
  const layer2 = {
    url: '/shapecontent.svg',
    width: 1458,
    height: 984,
    mimeType: 'image/jpeg',
  }
  const layer3 = {
    url: '/keyboard.svg',
    width: 1458,
    height: 984,
    mimeType: 'image/jpeg',
  }

  const [lines, setLines] = useState([])
  const [maxX, setMaxX] = useState(0)
  const [maxY, setMaxY] = useState(0)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [0, maxY], [20, -20])
  const rotateY = useTransform(x, [0, maxX], [-20, 20])
  const scale = useMotionValue(1.2)

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    setMaxX(event.view.innerWidth)
    setMaxY(event.view.innerHeight)
    x.set(event.clientX - rect.left)
    y.set(event.clientY)
  }

  return (
    <Container maxWidth={false} disableGutters>
      <div className={classes.container} onMouseMove={handleMouse}>
        <div className={classes.pagebuilder}>
          <div className={classes.copy}>
            <Typography variant='overline'>Brand Experience</Typography>
            <Typography variant='h2' color='secondary'>
              Build rich content pages
            </Typography>
            <Typography paragraph variant='h3' color='textSecondary'>
              GraphCMS (a headless CMS integrated by default), is used for storing static content.
              Pages can be composed directly in the admin interface, without the help of a
              developer. A variety of content components offer creative ways to display text, video
              and images.
            </Typography>
          </div>

          <m.div
            style={{
              rotateX,
              rotateY,
              scale,
            }}
            className={classes.interactive}
          >
            <Hint
              content='Adding components to any page can be done directly from the GraphCMS admin interface.'
              hintLeft='85%'
              hintTop='21%'
              offsetLeft='100'
              offsetTop='50'
              lines={lines}
              setLines={setLines}
            />
            <Hint
              content='Navigaton is generated automatically, based on Magento categories'
              hintLeft='31%'
              hintTop='8.7%'
              offsetLeft='-100'
              offsetTop='50'
              lines={lines}
              setLines={setLines}
            />
            <Hint
              content='Some components fetch data from Magento, others store (static) data in GraphCMS. Both can be added from GraphCMS.'
              hintLeft='40%'
              hintTop='44%'
              offsetLeft='-100'
              offsetTop='50'
              lines={lines}
              setLines={setLines}
            />
            <Hint
              content='Add as many components as you like.'
              hintLeft='90%'
              hintTop='64%'
              offsetLeft='100'
              offsetTop='50'
              lines={lines}
              setLines={setLines}
            />

            <Asset asset={layer1} sizes={{ 0: '50vw', [theme.breakpoints.values.md]: '72vw' }} />
            <Asset asset={layer2} sizes={{ 0: '50vw', [theme.breakpoints.values.md]: '72vw' }} />
            <Asset asset={layer3} sizes={{ 0: '50vw', [theme.breakpoints.values.md]: '72vw' }} />
          </m.div>
        </div>
      </div>
    </Container>
  )
}
