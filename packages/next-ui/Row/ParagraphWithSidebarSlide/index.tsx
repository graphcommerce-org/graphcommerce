import { ContainerProps, makeStyles, Theme } from '@material-ui/core'
import { m, useSpring, useTransform, useViewportScroll } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import Row from '..'
import { UseStyles } from '../../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    wrapper: {
      overflow: 'hidden',
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
      zIndex: 1,
      justifyItems: 'start',
      alignContent: 'end',
      position: 'relative',
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
  const sidebar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sidebar.current) return () => {}
    const ro = new ResizeObserver(([entry]) => {
      if (entry.target instanceof HTMLElement) {
        setParentHeight(entry.target.offsetHeight)
        setHeight(window.innerHeight)
        setItemY(entry.target.offsetTop)
      }
    })
    ro.observe(sidebar.current)
    return () => ro.disconnect()
  }, [])

  const { scrollY } = useViewportScroll()
  const y = useSpring(
    useTransform(
      scrollY,
      [itemY - windowHeight / 4, itemY + windowHeight / 2],
      [0, parentHeight > windowHeight / 2 ? windowHeight / 2 : 0],
    ),
  )

  return (
    <Row maxWidth={false} {...containerProps}>
      <div className={classes.wrapper}>
        <div className={classes.backstory}>
          <div className={classes.copy}>{children}</div>
          {background}
        </div>
        <m.div ref={sidebar} transition={{ ease: 'linear' }} style={{ y }}>
          {slidingItems}
        </m.div>
      </div>
    </Row>
  )
}
