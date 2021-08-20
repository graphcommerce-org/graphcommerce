import { makeStyles, Typography } from '@material-ui/core'
import {
  ScrollerDots,
  MotionImageAspect,
  Scrollable,
  ScrollerProvider,
  ScrollerButton,
} from '@reachdigital/framer-scroller'
import clsx from 'clsx'
import { m } from 'framer-motion'
import React, { useState } from 'react'

const useStyles = makeStyles(
  () => ({
    container: {
      width: 600,
      height: 300,
      gridTemplateColumns: `repeat(100, 100%)`,
      gridTemplateRows: `100%`,
      '& *': {
        userSelect: 'none',
        'user-drag': 'none',
      },
      background: '#ededed',
    },
    containerResized: {
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

  const items = [
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
    </div>,
    <m.div key={1}>
      <m.div layout style={{ width: 300 }}>
        item 1
      </m.div>
    </m.div>,
    <m.div key={2}>item 2</m.div>,
    <m.div key={3}>item 3</m.div>,
    <m.div key={4}>item 4</m.div>,
    <m.div key={5}>item 5</m.div>,
    <m.div key={6}>item 6</m.div>,
    <m.div key={7}>item 7</m.div>,
    <m.div key={8}>item 8</m.div>,
    <m.div key={9}>item 9</m.div>,
    <m.div key={10}>item 10</m.div>,
    <m.div key={11}>item 11</m.div>,
    <m.div key={12}>item 12</m.div>,
    <m.div key={13}>item 13</m.div>,
    <m.div key={14}>item 14</m.div>,
    <m.div key={15}>item 15</m.div>,
    <m.div key={16}>item 16</m.div>,
    <m.div key={17}>item 17</m.div>,
    <m.div key={18}>item 18</m.div>,
    <m.div key={19}>item 19</m.div>,
    <m.div key={20}>item 20</m.div>,
  ]

  return (
    <>
      <Typography variant='h4' component='h2'>
        Full Image Slider
      </Typography>
      <ScrollerProvider>
        <button type='button' onClick={() => setExpand(!expand)}>
          {expand ? 'collapse' : 'expand'}
        </button>

        <ScrollerButton direction='left'>prev</ScrollerButton>
        <ScrollerButton direction='right'>next</ScrollerButton>

        <Scrollable layout className={clsx(classes.container, expand && classes.containerResized)}>
          {items}
        </Scrollable>
        <ScrollerDots />
      </ScrollerProvider>

      <Typography variant='h4' component='h2'>
        Multi item slider
      </Typography>
    </>
  )
}

export default Index
