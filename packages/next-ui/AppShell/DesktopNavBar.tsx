import { Scroller, ScrollerButton, ScrollerProvider } from '@graphcommerce/framer-scroller'
import { Link, LinkProps as MuiLinkProps, makeStyles, Theme } from '@material-ui/core'
import { Variant as ThemeVariant } from '@material-ui/core/styles/createTypography'
import clsx from 'clsx'
import { m } from 'framer-motion'
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
      [theme.breakpoints.down('sm')]: {
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

export type MenuTabsProps = MenuProps &
  UseStyles<typeof useStyles> & {
    LinkProps?: MuiLinkProps
    iconScrollerBtnLeft?: React.ReactNode
    iconScrollerBtnRight?: React.ReactNode
  }

export default function DesktopNavBar(props: MenuTabsProps) {
  const { menu, LinkProps, iconScrollerBtnLeft, iconScrollerBtnRight } = props
  const classes = useStyles(props)
  const router = useRouter()

  return (
    <ScrollerProvider scrollSnapAlign='none'>
      <div className={classes.container}>
        <Scroller className={classes.scroller} hideScrollbar>
          {menu.map(({ href, children, ...linkProps }) => (
            <PageLink key={href.toString()} href={href} {...linkProps} passHref>
              <Link
                variant='h6'
                {...LinkProps}
                className={clsx(classes.link, LinkProps?.className)}
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
