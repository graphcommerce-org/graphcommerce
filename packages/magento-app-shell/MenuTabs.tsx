import { Theme, makeStyles } from '@material-ui/core'
import CategoryLink from '@reachdigital/magento-category/CategoryLink'
import SliderContainer from '@reachdigital/next-ui/FramerSlider/SliderContainer'
import { SliderContext } from '@reachdigital/next-ui/FramerSlider/SliderContext'
import SliderNext from '@reachdigital/next-ui/FramerSlider/SliderNext'
import SliderPrev from '@reachdigital/next-ui/FramerSlider/SliderPrev'
import SliderScroller from '@reachdigital/next-ui/FramerSlider/SliderScroller'
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
      '&:hover': {
        textDecoration: 'none',
      },
    },
    line: {
      width: 40,
      margin: `0 auto`,
      height: 3,
      background: theme.palette.primary.main,
    },
  }),
  { name: 'DesktopMenuTabs' },
)

export type MenuTabsProps = MenuQueryFragment

export default function MenuTabs(props: MenuTabsProps) {
  const { menu } = props
  const classes = useTabsStyles(props)
  const router = useRouter()

  return (
    <SliderContext scrollSnapAlign={false}>
      <SliderPrev className={classes.prevNext} />
      <SliderContainer classes={{ container: clsx(classes.container) }}>
        <SliderScroller classes={{ scroller: clsx(classes.scroller) }}>
          {menu?.items?.[0]?.children?.map((cat) => {
            if (!cat || !cat.id || !cat.url_path) return null
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
                  <m.div layoutId='lijntje' className={classes.line} layout initial />
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
            {router.asPath.startsWith(`/blog`) && (
              <m.div layoutId='lijntje' className={classes.line} layout initial />
            )}
          </CategoryLink>
        </SliderScroller>
      </SliderContainer>
      <SliderNext className={classes.prevNext} />
    </SliderContext>
  )
}
