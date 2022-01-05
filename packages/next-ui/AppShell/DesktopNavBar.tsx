import { Scroller, ScrollerButton, ScrollerProvider } from '@graphcommerce/framer-scroller'
import { Link, LinkProps as MuiLinkProps } from '@mui/material'
import clsx from 'clsx'
import { m } from 'framer-motion'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { UseStyles } from '../Styles'
import { makeStyles, useMergedClasses } from '../Styles/tssReact'
import SvgImageSimple from '../SvgImage/SvgImageSimple'
import { iconChevronLeft, iconChevronRight } from '../icons'
import { MenuProps } from './Menu'

const useStyles = makeStyles({ name: 'DesktopNavBar' })((theme) => ({
  container: {
    minWidth: 200,
    flex: 1,
    position: 'relative',
    pointerEvents: 'all',
    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
  },
  scroller: {
    display: 'grid',
    columnGap: 40,
    padding: '0 40px',
    minHeight: 40,
    gridAutoColumns: 'min-content',
  },
  prevNextBtnWrapper: {
    position: 'absolute',
    top: 0,
  },
  left: {
    left: 0,
  },
  right: {
    right: 0,
  },
  prevNextBtn: {
    pointerEvents: 'all',
    background: theme.palette.background.default,
    boxShadow: 'none',
    height: 48,
    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
  },
  prevBtn: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  nextBtn: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  link: {
    whiteSpace: 'nowrap',
    color: theme.palette.text.primary,
    '&:hover': {
      textDecoration: 'none',
    },
    fontWeight: theme.typography.fontWeightBold,
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
}))

export type MenuTabsProps = MenuProps &
  UseStyles<typeof useStyles> & {
    LinkProps?: MuiLinkProps
    iconScrollerBtnLeft?: React.ReactNode
    iconScrollerBtnRight?: React.ReactNode
  }

export default function DesktopNavBar(props: MenuTabsProps) {
  const { menu, LinkProps, iconScrollerBtnLeft, iconScrollerBtnRight } = props
  const classes = useMergedClasses(useStyles().classes, props.classes)
  const router = useRouter()

  return (
    <ScrollerProvider scrollSnapAlign='none'>
      <div className={classes.container}>
        <Scroller className={classes.scroller} hideScrollbar>
          {menu.map(({ href, children, ...linkProps }) => (
            <PageLink key={href.toString()} href={href} {...linkProps} passHref>
              <Link
                variant='subtitle1'
                {...LinkProps}
                className={clsx(classes.link, LinkProps?.className)}
                underline='hover'
              >
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
        </Scroller>

        <m.div className={clsx(classes.prevNextBtnWrapper, classes.left)}>
          <ScrollerButton
            direction='left'
            size='small'
            classes={{ root: clsx(classes.prevNextBtn, classes.prevBtn) }}
          >
            {iconScrollerBtnLeft ?? <SvgImageSimple src={iconChevronLeft} />}
          </ScrollerButton>
        </m.div>

        <m.div className={clsx(classes.prevNextBtnWrapper, classes.right)}>
          <ScrollerButton
            direction='right'
            size='small'
            classes={{ root: clsx(classes.prevNextBtn, classes.nextBtn) }}
          >
            {iconScrollerBtnRight ?? <SvgImageSimple src={iconChevronRight} />}
          </ScrollerButton>
        </m.div>
      </div>

      {/* <ScrollerButton
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
        </ScrollerButton> */}
    </ScrollerProvider>
  )
}
