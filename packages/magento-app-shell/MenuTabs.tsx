import { Theme, Tabs, Tab, TabsProps, TabProps, makeStyles, Link } from '@material-ui/core'
import CategoryLink from '@reachdigital/magento-category/CategoryLink'
import SliderContainer from '@reachdigital/next-ui/FramerSlider/SliderContainer'
import { SliderContext } from '@reachdigital/next-ui/FramerSlider/SliderContext'
import SliderNext from '@reachdigital/next-ui/FramerSlider/SliderNext'
import SliderPrev from '@reachdigital/next-ui/FramerSlider/SliderPrev'
import SliderScroller from '@reachdigital/next-ui/FramerSlider/SliderScroller'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import clsx from 'clsx'
import { m } from 'framer-motion'
import { useRouter } from 'next/router'
import { MenuQueryFragment } from './MenuQueryFragment.gql'

const useTabsStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      width: '100%',
      display: 'flex',
      pointerEvents: 'all',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    scroller: {
      columnGap: '40px',
    },
    prevNext: {
      pointerEvents: 'all',
    },
    link: {
      fontSize: '120%',
      whiteSpace: 'nowrap',
      textAlign: 'center',
    },
    line: {
      width: 40,
      margin: `0 auto`,
      height: 3,
      background: theme.palette.primary.main,
    },
    // indicator: {
    //   display: 'flex',
    //   justifyContent: 'center',
    //   backgroundColor: 'transparent',
    //   '& > span': {
    //     maxWidth: 40,
    //     width: '100%',
    //     backgroundColor: theme.palette.primary.main,
    //   },
    // },
  }),
  { name: 'DesktopMenuTabs' },
)

// const useTabStyles = makeStyles(
//   (theme: Theme) => ({
//     root: {
//       ...theme.typography.body1,
//       fontWeight: 500,
//       textTransform: 'unset',
//       padding: `6px ${theme.spacings.xxs}`,
//       opacity: 'unset',
//       [theme.breakpoints.up('sm')]: {
//         minWidth: 'unset',
//       },
//     },
//   }),
//   { name: 'DesktopMenuTab' },
// )

export type MenuTabsProps = MenuQueryFragment

export default function MenuTabs(props: MenuTabsProps) {
  const { menu } = props
  const classes = useTabsStyles(props)
  // const tabClasses = useTabStyles(props)
  const router = useRouter()

  const selectedIdx =
    menu?.items?.[0]?.children?.findIndex((cat) => router.asPath.startsWith(`/${cat?.url_path}`)) ??
    0

  return (
    <SliderContext scrollSnapAlign={false}>
      <SliderPrev className={classes.prevNext} />
      <SliderContainer classes={{ container: clsx(classes.container) }}>
        <SliderScroller classes={{ scroller: clsx(classes.scroller) }}>
          {menu?.items?.[0]?.children?.map((cat) => {
            if (!cat || !cat.id || !cat.url_path) return null
            console.log(cat)
            return (
              <CategoryLink
                key={cat.id}
                url={cat.url_path}
                filters={{}}
                sort={{}}
                color='textPrimary'
                className={classes.link}
              >
                {cat.name}

                {router.asPath.startsWith(`/${cat?.url_path}`) && (
                  <m.div layout layoutId='lijntje' className={classes.line} />
                )}
              </CategoryLink>
            )
          })}
          <CategoryLink
            url='blog'
            filters={{}}
            sort={{}}
            color='textPrimary'
            className={classes.link}
          >
            Blog
          </CategoryLink>
        </SliderScroller>
      </SliderContainer>
      <SliderNext className={classes.prevNext} />
    </SliderContext>
  )
}
