import { Fab, makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import { m } from 'framer-motion'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { UseStyles } from '../../Styles'
import SvgImage from '../../SvgImage'
import { iconCollapseVertical, iconExpandVertical } from '../../icons'
import SliderContainer from '../SliderContainer'
import SliderContext from '../SliderContext'
import SliderDots from '../SliderDots'
import SliderNext from '../SliderNext'
import SliderPrev from '../SliderPrev'
import SliderScroller from '../SliderScroller'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {},
    containerZoomed: {},
    bottomCenter: {
      display: 'grid',
      gridAutoFlow: 'column',
      gap: theme.spacings.xxs,
      position: 'absolute',
      bottom: theme.spacings.sm,
      justifyContent: 'center',
      width: '100%',
      pointerEvents: 'none',
      '& > *': {
        pointerEvents: 'all',
      },
    },
    topRight: {
      display: 'grid',
      gridAutoFlow: 'column',
      gap: theme.spacings.xxs,
      position: 'absolute',
      top: theme.spacings.sm,
      right: theme.spacings.sm,
    },
  }),
  { name: 'ExandableGallery' },
)

type SingleItemSliderProps = PropsWithChildren<unknown> & UseStyles<typeof useStyles>

export default function ExpandableGallery(props: SingleItemSliderProps) {
  const { children } = props
  const classes = useStyles(props)
  const [zoomed, setZoomed] = useState(false)

  /**
   * Since the layout needs to be properly determined for the resize we start with `layout` set to
   * `true` and set it to `false after the first render`
   */
  const [layout, setLayout] = useState(true)
  useEffect(() => setLayout(false), [])

  return (
    <SliderContext scrollSnapAlign='center'>
      <SliderContainer
        layout={layout}
        classes={{ container: clsx(classes.container, zoomed && classes.containerZoomed) }}
      >
        <SliderScroller layout={layout}>
          {React.Children.map(children, (child) =>
            React.isValidElement<{ layout?: boolean }>(child)
              ? React.cloneElement(child, { layout })
              : { child },
          )}
        </SliderScroller>

        <m.div
          layout
          className={classes.topRight}
          onLayoutAnimationComplete={() => setLayout(false)}
        >
          <Fab
            color='inherit'
            size='small'
            onClick={() => {
              setLayout(true)
              setZoomed(!zoomed)
              document.body.style.overflow = !zoomed ? 'hidden' : ''
            }}
          >
            {!zoomed ? (
              <SvgImage src={iconExpandVertical} alt='expand' title='Zoom in' loading='eager' />
            ) : (
              <SvgImage
                src={iconCollapseVertical}
                alt='collapse'
                title='Zoom out'
                loading='eager'
              />
            )}
          </Fab>
        </m.div>

        <div className={classes.bottomCenter}>
          <SliderPrev layout={layout} />
          <SliderDots layout={layout} count={React.Children.count(children)} />
          <SliderNext layout={layout} />
        </div>
      </SliderContainer>
    </SliderContext>
  )
}
