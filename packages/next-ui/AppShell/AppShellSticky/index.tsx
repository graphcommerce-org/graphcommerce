import { Container, makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import { useMotionValue } from 'framer-motion'
import React, { useEffect } from 'react'
import { useMotionValueValue } from '../../../framer-utils'
import { UseStyles } from '../../Styles'
import useAppShellHeaderContext from '../AppShellProvider/useAppShellHeaderContext'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      position: 'sticky',
      zIndex: 96,
    },
    fillMobileOnly: {
      [theme.breakpoints.up('md')]: {
        top: `${theme.page.vertical} !important`,
      },
    },
  }),
  {
    name: 'AppShellSticky',
  },
)

type AppShellStickyBaseProps = {
  children: React.ReactNode
  headerFill?: 'mobile-only' | 'both'
}

type AppShellStickyProps = AppShellStickyBaseProps & UseStyles<typeof useStyles>

/*
 - makes the children sticky to the parent container
 - determines top offset based on header height dynamically
*/
export default function AppShellSticky(props: AppShellStickyProps) {
  const { children, headerFill = 'both' } = props
  const classes = useStyles(props)

  const { contentHeaderRef } = useAppShellHeaderContext()
  const offsetTop = useMotionValue<number>(0)

  useEffect(() => {
    if (!contentHeaderRef?.current) return () => {}

    const ro = new ResizeObserver(([entry]) =>
      offsetTop.set(contentHeaderRef?.current?.clientHeight ?? 0),
    )

    ro.observe(contentHeaderRef.current)
    return () => ro.disconnect()
  }, [contentHeaderRef, offsetTop])

  const top = useMotionValueValue(offsetTop, (v) => v)

  return (
    <Container
      maxWidth={false}
      className={clsx(classes.root, headerFill === 'mobile-only' && classes.fillMobileOnly)}
      style={{ top }}
    >
      <>{children}</>
    </Container>
  )
}
