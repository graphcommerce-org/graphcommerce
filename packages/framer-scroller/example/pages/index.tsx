import {
  ScrollerDots,
  MotionImageAspect,
  Scroller,
  ScrollerProvider,
  ScrollerButton,
} from '@graphcommerce/framer-scroller'
import { makeStyles } from '@graphcommerce/next-ui'
import { Typography } from '@mui/material'
import clsx from 'clsx'
import { m } from 'framer-motion'
import React, { useState } from 'react'

const useStyles = makeStyles()(
  () => ({
    container: {
      position: 'relative',
      background: '#ededed',
      width: '100%',
      height: 400,
    },
    containerResizes: {
      width: 600,
      height: 800,
    },
    scroller: {
      width: '100%',
      height: '100%',
      gridAutoColumns: `100%`,
      gridTemplateRows: `100%`,
      '& *': {
        userSelect: 'none',
        userDrag: 'none',
      },
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
  const { classes } = useStyles()
  const [expand, setExpand] = useState(true)

  return (
    <>
      <Typography variant='h4' component='h2'>
        Basic slider
      </Typography>

      <div style={{ position: 'relative' }}>
        <ScrollerProvider>
          <Scroller
            style={{
              gridTemplateRows: `100%`,
              marginBottom: 20,
              rowGap: 20,
              columnGap: 20,
              height: 400,
            }}
          >
            <div style={{ background: '#eee', userSelect: 'none' }}>item1</div>
            <div style={{ background: '#eee', userSelect: 'none' }}>item2</div>
            <div style={{ background: '#eee', userSelect: 'none' }}>item3</div>
            <div style={{ background: '#eee', userSelect: 'none' }}>item4</div>
            <div style={{ background: '#eee', userSelect: 'none' }}>item5</div>
            <div style={{ background: '#eee', userSelect: 'none' }}>item6</div>
            <div style={{ background: '#eee', userSelect: 'none' }}>item7</div>
          </Scroller>

          <m.div style={{ position: 'absolute', left: 10, top: 'calc(50% - 28px)', zIndex: 2 }}>
            <ScrollerButton direction='left'>←</ScrollerButton>
          </m.div>
          <m.div style={{ position: 'absolute', right: 10, top: 'calc(50% - 28px)', zIndex: 2 }}>
            <ScrollerButton direction='right'>→</ScrollerButton>
          </m.div>
          <ScrollerDots
            style={{
              position: 'absolute',
              bottom: 0,
              zIndex: 2,
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
            }}
          />
        </ScrollerProvider>
      </div>

      <Typography variant='h4' component='h2'>
        Expandable Image Slider{' '}
        <button type='button' onClick={() => setExpand(!expand)}>
          {expand ? 'collapse' : 'expand'}
        </button>
      </Typography>
      <ScrollerProvider>
        <m.div layout className={clsx(classes.container, expand && classes.containerResizes)}>
          <m.div
            layout
            style={{ position: 'absolute', left: 10, top: 'calc(50% - 28px)', zIndex: 2 }}
          >
            <ScrollerButton direction='left'>←</ScrollerButton>
          </m.div>
          <m.div
            layout
            style={{ position: 'absolute', right: 10, top: 'calc(50% - 28px)', zIndex: 2 }}
          >
            <ScrollerButton direction='right'>→</ScrollerButton>
          </m.div>

          <Scroller hideScrollbar className={classes.scroller}>
            <div key='img' className={classes.slide}>
              <MotionImageAspect
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
            <ScrollerDots layout />
          </m.div>
        </m.div>
      </ScrollerProvider>
    </>
  )
}

export default Index
