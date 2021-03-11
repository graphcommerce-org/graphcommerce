import { Theme, Tabs, Tab, TabsProps, TabProps, makeStyles } from '@material-ui/core'
import CategoryLink from '@reachdigital/magento-category/CategoryLink'
import { ResolveUrlQuery } from '@reachdigital/magento-store/ResolveUrl.gql'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import { useRouter } from 'next/router'
import { MenuQueryFragment } from './MenuQueryFragment.gql'
import { PageLayoutQuery } from './PageLayout.gql'

const useTabsStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      margin: 0,
      padding: 0,
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
      [theme.breakpoints.up('md')]: {
        pointerEvents: 'all',
        // marginLeft: `calc(${theme.spacings.xxs} * -1)`,
        // marginRight: `calc(${theme.spacings.xxs} * -1)`,
        flexGrow: 1,
      },
    },
    indicator: {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      '& > span': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: theme.palette.primary.main,
      },
    },
  }),
  { name: 'DesktopMenuTabs' },
)

const useTabStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      ...theme.typography.body1,
      fontWeight: 500,
      textTransform: 'unset',
      padding: `6px ${theme.spacings.xxs}`,
      opacity: 'unset',
      [theme.breakpoints.up('sm')]: {
        minWidth: 'unset',
      },
    },
  }),
  { name: 'DesktopMenuTab' },
)

export type MenuTabsProps = MenuQueryFragment &
  Omit<TabsProps<'menu'>, 'component' | 'value' | 'children'> & {
    tabProps?: Omit<TabProps<'a'>, 'label' | 'component' | 'value'>
  }

export default function MenuTabs(props: MenuTabsProps) {
  const { menu, tabProps, ...tabsProps } = props
  const tabsClasses = useTabsStyles(props)
  const tabClasses = useTabStyles(props)
  const router = useRouter()

  const selectedIdx =
    menu?.items?.[0]?.children?.findIndex((cat) => router.asPath.startsWith(`/${cat?.url_path}`)) ??
    0

  return (
    <Tabs
      component='menu'
      value={selectedIdx >= 0 ? selectedIdx : false}
      textColor='inherit'
      variant='scrollable'
      scrollButtons='auto'
      {...tabsProps}
      classes={{ ...tabsClasses, ...tabsProps.classes }}
      TabIndicatorProps={{ children: <span /> }}
    >
      {menu?.items?.[0]?.children?.map((cat) => {
        if (!cat || !cat.id || !cat.url_path) return null
        return (
          <CategoryLink key={cat.id} url={cat.url_path} filters={{}} sort={{}} noLink>
            <Tab
              key={cat.id}
              label={cat.name}
              component='a'
              value={cat.id}
              {...tabProps}
              classes={{ ...tabClasses, ...tabProps?.classes }}
            />
          </CategoryLink>
        )
      })}

      <PageLink href='/blog'>
        <Tab
          label='Blog'
          component='a'
          value='Blog'
          {...tabProps}
          classes={{ ...tabClasses, ...tabProps?.classes }}
        />
      </PageLink>
    </Tabs>
  )
}
