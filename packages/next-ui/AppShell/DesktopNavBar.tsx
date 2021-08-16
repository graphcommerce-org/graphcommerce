import { Link, makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import SliderContainer from '../FramerSlider/SliderContainer'
import SliderContext from '../FramerSlider/SliderContext'
import SliderNext from '../FramerSlider/SliderNext'
import SliderPrev from '../FramerSlider/SliderPrev'
import SliderScroller from '../FramerSlider/SliderScroller'
import { MenuProps } from './Menu'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      width: '100%',
      position: 'relative',
      pointerEvents: 'all',
      // padding: '10px 0',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    scroller: {
      columnGap: 40,
      padding: '0 40px',
    },
    prevNext: {
      pointerEvents: 'all',
      position: 'absolute',
      background: theme.palette.background.default,
      top: 5,
      [theme.breakpoints.down('sm')]: { display: 'none' },
    },
    prev: {
      left: 0,
    },
    next: {
      right: 0,
    },
    prevNextFab: {
      boxShadow: 'none',
    },
    link: {
      whiteSpace: 'nowrap',
      color: 'black',
      '&:hover': {
        textDecoration: 'none',
      },
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
    },
  }),
  { name: 'DesktopNavBar' },
)

export type MenuTabsProps = MenuProps

export default function DesktopNavBar(props: MenuTabsProps) {
  const { menu } = props
  const classes = useStyles()
  const router = useRouter()

  return (
    <SliderContext scrollSnapAlign={false}>
      <SliderContainer classes={{ container: classes.container }}>
        <SliderScroller classes={{ scroller: classes.scroller }}>
          {menu.map(({ href, children, ...linkProps }) => (
            <PageLink key={href.toString()} href={href} {...linkProps} passHref>
              <Link className={classes.link} variant='h6'>
                {children}
                {router.asPath.startsWith(href.toString()) && <div className={classes.line} />}
              </Link>
            </PageLink>
          ))}
        </SliderScroller>
        <SliderPrev
          className={clsx(classes.prevNext, classes.prev)}
          classes={{ root: classes.prevNextFab }}
        />
        <SliderNext
          className={clsx(classes.prevNext, classes.next)}
          classes={{ root: classes.prevNextFab }}
        />
      </SliderContainer>
    </SliderContext>
  )
}
