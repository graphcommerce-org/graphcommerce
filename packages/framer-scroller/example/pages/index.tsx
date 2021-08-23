import { makeStyles, Typography } from '@material-ui/core'
import {
  ScrollerDots,
  MotionImageAspect,
  Scroller,
  ScrollerProvider,
  ScrollerButton,
} from '@reachdigital/framer-scroller'
import clsx from 'clsx'
import { m } from 'framer-motion'
import React, { useState } from 'react'

const useStyles = makeStyles(
  () => ({
    container: {
      position: 'relative',
      background: '#ededed',
      width: 'min-content',
    },
    scroller: {
      width: 600,
      height: 300,
      gridTemplateColumns: `repeat(100, 100%)`,
      gridTemplateRows: `100%`,
      '& *': {
        userSelect: 'none',
        'user-drag': 'none',
      },
    },
    scrollerResized: {
      width: 800,
      height: 1000,
    },
    slide: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
  { name: 'Index' },
)

function Index() {
  const classes = useStyles()
  const [expand, setExpand] = useState(true)

  const items = []

  return (
    <>
      <Typography variant='h4' component='h2'>
        Full Image Slider
      </Typography>
      <ScrollerProvider>
        <m.div layout className={classes.container}>
          <m.div layout style={{ position: 'absolute', left: 0, top: 0, zIndex: 2 }}>
            <button type='button' onClick={() => setExpand(!expand)}>
              {expand ? 'collapse' : 'expand'}
            </button>
          </m.div>

          <m.div
            layout
            style={{ position: 'absolute', left: 0, top: 'calc(50% - 28px)', zIndex: 2 }}
          >
            <ScrollerButton direction='left'>←</ScrollerButton>
          </m.div>
          <m.div
            layout
            style={{ position: 'absolute', right: 0, top: 'calc(50% - 28px)', zIndex: 2 }}
          >
            <ScrollerButton direction='right'>→</ScrollerButton>
          </m.div>

          <Scroller className={clsx(classes.scroller, expand && classes.scrollerResized)}>
            <div key='img' className={classes.slide}>
              <MotionImageAspect
                key='str'
                layout
                src='https://backend.reachdigital.dev/media/catalog/product/cache/63405d393cd2d0278e3cc8b45744d4a7/1/0/1042_1_3.jpg'
                width={1532}
                height={1678}
                sizes='2000px'
                dontReportWronglySizedImages
              />
            </div>
            <m.div key={1}>
              <m.div layout style={{ width: 300 }}>
                item 1
              </m.div>
            </m.div>
            <m.div key={2}>item 2</m.div>
            <m.div key={3}>item 3</m.div>
            <m.div key={4}>item 4</m.div>
            <m.div key={5}>item 5</m.div>
            <m.div key={6}>item 6</m.div>
            <m.div key={7}>item 7</m.div>
            <m.div key={8}>item 8</m.div>
            <m.div key={9}>item 9</m.div>
            <m.div key={10}>item 10</m.div>
          </Scroller>

          <m.div
            layout='position'
            style={{
              position: 'absolute',
              bottom: 0,
              zIndex: 2,
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <ScrollerDots />
          </m.div>
        </m.div>
      </ScrollerProvider>

      <Typography variant='h4' component='h2'>
        Multi item slider
      </Typography>
    </>
  )
}

export default Index
