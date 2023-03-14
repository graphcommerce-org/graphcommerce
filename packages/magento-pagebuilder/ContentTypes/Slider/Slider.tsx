import { ScrollerProvider, Scroller, ScrollerDots } from '@graphcommerce/framer-scroller'
import Box from '@mui/material/Box'
import { useState } from 'react'
import { extractAdvancedProps } from '../../utils'
import { AutoScroll } from './AutoScroll'
import { SliderContentType } from './types'

/**
 * Page Builder Slider component.
 *
 * This component is part of the Page Builder / PWA integration. It can be consumed without Page
 * Builder.
 */
export const Slider: SliderContentType['component'] = (props) => {
  const [cssProps, cssClasses, additional] = extractAdvancedProps(props)

  const { autoplay, fade, infinite, minHeight, showArrows, showDots, autoplaySpeed, children } =
    additional

  const [isHover, setIsHover] = useState(false)

  return (
    <Box
      sx={{ position: 'relative' }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <ScrollerProvider>
        <Scroller
          hideScrollbar
          style={{
            minHeight,
            // height: '60vh',
            gridAutoColumns: '100%',
            // maxHeight: 750,
          }}
        >
          {children}
        </Scroller>
        {showDots && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              position: 'absolute',
              bottom: 10,
              left: 0,
              zIndex: 2,
              width: '100%',
            }}
          >
            <Box
              sx={(theme) => ({
                height: 43,
                alignContent: 'center',
                padding: '0 15px',
                background: '#fff',
                boxShadow:
                  '0px 0px 1.5px hsl(0deg 0% 0% / 0.15),0px 0.5px 0.6px hsl(0deg 0% 0% / 0.06),0px 3.8px 4.8px -1.5px hsl(0deg 0% 0% / 0.09)',
                borderRadius: 999,
                display: 'flex',
                alignItems: 'center',
                [theme.breakpoints.down('sm')]: {
                  transform: 'scale(0.75)',
                  bottom: 10,
                },
              })}
            >
              <ScrollerDots />
            </Box>
          </Box>
        )}
        {autoplay && <AutoScroll pause={isHover} timePerSlide={autoplaySpeed} />}
      </ScrollerProvider>
    </Box>
  )
}
