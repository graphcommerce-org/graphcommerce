import { Theme, makeStyles, Link } from '@material-ui/core'
import SliderContainer from '@reachdigital/next-ui/FramerSlider/SliderContainer'
import { SliderContext } from '@reachdigital/next-ui/FramerSlider/SliderContext'
import SliderNext from '@reachdigital/next-ui/FramerSlider/SliderNext'
import SliderPrev from '@reachdigital/next-ui/FramerSlider/SliderPrev'
import SliderScroller from '@reachdigital/next-ui/FramerSlider/SliderScroller'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { MenuQueryFragment } from './MenuQueryFragment.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      width: '100%',
      position: 'relative',
      pointerEvents: 'all',
      height: 50,
      padding: '10px 0',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    scroller: {
      columnGap: '40px',
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
      ...theme.typography.body1,
      fontWeight: 500,
      textTransform: 'unset',
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
      marginTop: 7,
    },
  }),
  { name: 'DesktopMenuTabs' },
)

export type MenuTabsProps = MenuQueryFragment

export default function MenuTabs(props: MenuTabsProps) {
  const { menu } = props
  const classes = useStyles()
  const router = useRouter()

  return (
    <SliderContext scrollSnapAlign={false}>
      <SliderContainer classes={{ container: classes.container }}>
        <SliderScroller classes={{ scroller: classes.scroller }}>
          {menu?.items?.map((cat) => {
            if (!cat || !cat.url_path || !cat.include_in_menu) return null
            return (
              <PageLink key={cat.url_path} href={`/${cat.url_path}`}>
                <Link className={classes.link}>
                  {cat.name}
                  {router.asPath.startsWith(`/${cat?.url_path}`) && (
                    <div className={classes.line} />
                  )}
                </Link>
              </PageLink>
            )
          })}
          <PageLink href='/blog'>
            <Link className={classes.link}>
              Blog
              {router.asPath.startsWith(`/blog`) && <div className={classes.line} />}
            </Link>
          </PageLink>
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
