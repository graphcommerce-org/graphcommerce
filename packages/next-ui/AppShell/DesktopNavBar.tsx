import { Scroller, ScrollerButton, ScrollerProvider } from '@graphcommerce/framer-scroller'
import { Link, makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { UseStyles } from '../Styles'
import SvgImageSimple from '../SvgImage/SvgImageSimple'
import { iconChevronLeft, iconChevronRight } from '../icons'
import { MenuProps } from './Menu'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      minWidth: 200,
      flex: 1,
      position: 'relative',
      pointerEvents: 'all',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    scroller: {
      display: 'flex',
      columnGap: 40,
      padding: '0 40px',
      minHeight: 40,
    },
    prevNext: {
      pointerEvents: 'all',
      position: 'absolute',
      background: theme.palette.background.default,
      top: 5,
      [theme.breakpoints.down('sm')]: { display: 'none' },
      boxShadow: 'none',
    },
    prev: {
      left: 0,
    },
    next: {
      right: 0,
    },
    link: {
      whiteSpace: 'nowrap',
      color: 'black',
      '&:hover': {
        textDecoration: 'none',
      },
      paddingTop: 6,
    },
    line: {
      maxWidth: 40,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      height: 2,
      background: theme.palette.primary.main,
      margin: '0 auto',
      marginTop: 6,
      opacity: 0,
    },
    lineShow: {
      opacity: 1,
    },
  }),
  { name: 'DesktopNavBar' },
)

export type MenuTabsProps = MenuProps & UseStyles<typeof useStyles>

export default function DesktopNavBar(props: MenuTabsProps) {
  const { menu } = props
  const classes = useStyles(props)
  const router = useRouter()

  return (
    <ScrollerProvider scrollSnapAlign='none'>
      <div className={classes.container}>
        <Scroller className={classes.scroller} hideScrollbar>
          {menu.map(({ href, children, ...linkProps }) => (
            <PageLink key={href.toString()} href={href} {...linkProps} passHref>
              <Link className={classes.link} variant='h6'>
                {children}
                <div
                  className={clsx(
                    classes.line,
                    router.asPath.startsWith(href.toString()) && classes.lineShow,
                  )}
                />
              </Link>
            </PageLink>
          ))}
          <ScrollerButton
            direction='left'
            size='small'
            className={clsx(classes.prevNext, classes.prev)}
          >
            <SvgImageSimple src={iconChevronLeft} />
          </ScrollerButton>
          <ScrollerButton
            direction='right'
            size='small'
            className={clsx(classes.prevNext, classes.next)}
          >
            <SvgImageSimple src={iconChevronRight} />
          </ScrollerButton>
        </Scroller>
      </div>
    </ScrollerProvider>
  )
}
