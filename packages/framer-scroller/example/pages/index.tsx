import {
  MotionImageAspect,
  Scroller,
  ScrollerButton,
  ScrollerDots,
  ScrollerProvider,
} from '@graphcommerce/framer-scroller'
import { Box, Typography, styled } from '@mui/material'
import { m } from 'framer-motion'
import React, { useState } from 'react'

const MotionDiv = styled(m.div)({})

function Index() {
  const [expand, setExpand] = useState(true)

  return (
    <>
      <Typography variant='h4' component='h2'>
        Basic slider
      </Typography>

      <Box sx={{ position: 'relative' }}>
        <ScrollerProvider>
          <Scroller
            sx={{
              gridTemplateRows: '100%',
              marginBottom: '20px',
              rowGap: 20,
              columnGap: 20,
              height: 400,
            }}
          >
            <Box sx={{ background: '#eee', userSelect: 'none' }}>item1</Box>
            <Box sx={{ background: '#eee', userSelect: 'none' }}>item2</Box>
            <Box sx={{ background: '#eee', userSelect: 'none' }}>item3</Box>
            <Box sx={{ background: '#eee', userSelect: 'none' }}>item4</Box>
            <Box sx={{ background: '#eee', userSelect: 'none' }}>item5</Box>
            <Box sx={{ background: '#eee', userSelect: 'none' }}>item6</Box>
            <Box sx={{ background: '#eee', userSelect: 'none' }}>item7</Box>
          </Scroller>

          <MotionDiv sx={{ position: 'absolute', left: 10, top: 'calc(50% - 28px)', zIndex: 2 }}>
            <ScrollerButton direction='left'>←</ScrollerButton>
          </MotionDiv>
          <MotionDiv sx={{ position: 'absolute', right: 10, top: 'calc(50% - 28px)', zIndex: 2 }}>
            <ScrollerButton direction='right'>→</ScrollerButton>
          </MotionDiv>
          <ScrollerDots
            sx={{
              position: 'absolute',
              bottom: 0,
              zIndex: 2,
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
            }}
          />
        </ScrollerProvider>
      </Box>

      <Typography variant='h4' component='h2'>
        Expandable Image Slider{' '}
        <button type='button' onClick={() => setExpand(!expand)}>
          {expand ? 'collapse' : 'expand'}
        </button>
      </Typography>
      <ScrollerProvider>
        <MotionDiv
          layout
          sx={[
            {
              position: 'relative',
              background: '#ededed',
              width: '100%',
              height: 400,
            },
            expand && {
              width: 600,
              height: 800,
            },
          ]}
        >
          <MotionDiv
            layout
            sx={{ position: 'absolute', left: 10, top: 'calc(50% - 28px)', zIndex: 2 }}
          >
            <ScrollerButton direction='left'>←</ScrollerButton>
          </MotionDiv>
          <MotionDiv
            layout
            sx={{ position: 'absolute', right: 10, top: 'calc(50% - 28px)', zIndex: 2 }}
          >
            <ScrollerButton direction='right'>→</ScrollerButton>
          </MotionDiv>

          <Scroller
            hideScrollbar
            sx={{
              width: '100%',
              height: '100%',
              gridAutoColumns: '100%',
              gridTemplateRows: '100%',
              '& *': {
                userSelect: 'none',
                userDrag: 'none',
                WebkitUserDrag: 'none',
              },
            }}
          >
            <Box key='img' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MotionImageAspect
                layout
                src='https://backend.reachdigital.dev/media/catalog/product/cache/63405d393cd2d0278e3cc8b45744d4a7/1/0/1042_1_3.jpg'
                width={1532}
                height={1678}
                sizes='2000px'
                dontReportWronglySizedImages
              />
            </Box>
            <MotionDiv key={1}>
              <MotionDiv layout sx={{ width: 300 }}>
                item 1
              </MotionDiv>
            </MotionDiv>
            <MotionDiv key={2}>item 2</MotionDiv>
            <MotionDiv key={3}>item 3</MotionDiv>
            <MotionDiv key={4}>item 4</MotionDiv>
            <MotionDiv key={5}>item 5</MotionDiv>
            <MotionDiv key={6}>item 6</MotionDiv>
            <MotionDiv key={7}>item 7</MotionDiv>
            <MotionDiv key={8}>item 8</MotionDiv>
            <MotionDiv key={9}>item 9</MotionDiv>
            <MotionDiv key={10}>item 10</MotionDiv>
          </Scroller>

          <MotionDiv
            layout='position'
            sx={{
              position: 'absolute',
              bottom: 0,
              zIndex: 2,
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <ScrollerDots layout />
          </MotionDiv>
        </MotionDiv>
      </ScrollerProvider>
    </>
  )
}

export default Index
