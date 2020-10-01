import { Theme, Tabs, Tab, TabsProps, TabProps } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import CategoryLink from 'components/Category/CategoryLink'

const useTabsStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      margin: 0,
      padding: 0,
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

export type MenuTabsProps = GQLAppShellQuery &
  GQLResolveUrlQuery &
  Omit<TabsProps<'menu'>, 'component' | 'value' | 'children'> & {
    tabProps?: Omit<TabProps<'a'>, 'label' | 'component' | 'value'>
  }

export default function MenuTabs(props: MenuTabsProps) {
  const { menu, urlResolver, tabProps, ...tabsProps } = props
  const tabsClasses = useTabsStyles(props)
  const tabClasses = useTabStyles(props)

  const selectedId = urlResolver && urlResolver.type === 'CATEGORY' && urlResolver.id
  const selectedIdx = menu?.items?.[0]?.children?.findIndex((cat) => cat?.id === selectedId) ?? 0

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
    </Tabs>
  )
}
