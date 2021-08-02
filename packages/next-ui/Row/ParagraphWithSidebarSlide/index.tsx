import { ContainerProps, makeStyles, Theme } from '@material-ui/core'
import { m, useTransform, useViewportScroll } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import Row from '..'
import { UseStyles } from '../../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    wrapper: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: `${theme.spacings.md}`,
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: '8fr 3fr',
      },
    },
    backstory: {
      position: 'relative',
      '& img': {
        position: 'absolute',
        top: '0',
        zIndex: 0,
        width: '100%',
        height: '100% !important',
        objectFit: 'cover',
        filter: 'brightness(80%)',
        [theme.breakpoints.up('md')]: {
          filter: 'brightness(100%)',
          height: '100%',
        },
      },
    },
    copy: {
      color: '#fff',
      display: 'grid',
      justifyItems: 'start',
      alignContent: 'end',
      padding: `${theme.spacings.md}`,
      '& > *': {
        zIndex: 1,
        maxWidth: 'max-content',
      },
      [theme.breakpoints.up('md')]: {
        background: 'none',
        width: '60%',
        minHeight: '130vh',
      },
      [theme.breakpoints.up('lg')]: {
        padding: `${theme.spacings.lg} ${theme.spacings.lg}`,
        width: '50%',
      },
    },
    slidingItems: {
      maxWidth: '100%',
    },
  }),
  { name: 'ParagraphWithSidebarSlide' },
)

export type ParagraphWithSidebarSlideProps = UseStyles<typeof useStyles> &
  ContainerProps & {
    slidingItems: React.ReactNode
    background: React.ReactNode
    children: React.ReactNode
  }

export default function ParagraphWithSidebarSlide(props: ParagraphWithSidebarSlideProps) {
  const { background, slidingItems, children, ...containerProps } = props
  const classes = useStyles(props)

  const [windowHeight, setHeight] = useState(0)
  const [itemY, setItemY] = useState(0)
  const [parentHeight, setParentHeight] = useState(0)
  const wrapper = useRef() as React.MutableRefObject<HTMLDivElement>
  const sidebar = useRef() as React.MutableRefObject<HTMLDivElement>
  const scrollPath = parentHeight > windowHeight / 2 ? windowHeight / 2 : 0

  useEffect(() => {
    // todo(erwin): Needs useResizeObserver hook
    setParentHeight(sidebar?.current?.offsetHeight)
    setHeight(window.innerHeight)
    setItemY(sidebar?.current?.offsetTop)
  }, [])

  const { scrollY } = useViewportScroll()
  const transformY = useTransform(
    scrollY,
    [itemY - windowHeight / 4, itemY + windowHeight / 2],
    [0, scrollPath],
  )

  return (
    <Row maxWidth={false} {...containerProps}>
      <div className={classes.wrapper} ref={wrapper}>
        <div className={classes.backstory}>
          <div className={classes.copy}>{children}</div>
          {background}
        </div>
        <m.div ref={sidebar} transition={{ ease: 'linear' }} style={{ y: transformY }}>
          {slidingItems}
        </m.div>
      </div>
    </Row>
  )
}
