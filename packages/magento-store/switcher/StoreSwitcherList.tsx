import {
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
  Avatar,
  Collapse,
} from '@material-ui/core'
import * as Types from '@reachdigital/magento-graphql'
import FlagAvatar from '@reachdigital/next-ui/FlagAvatar'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import React, { useMemo } from 'react'
import localeToStore, { storeToLocale } from '../localeToStore'
import { CountryLocaleFragment } from './CountryLocale.gql'
import { StoreLocaleFragment } from './StoreLocale.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    list: {},
    listItem: {
      borderTop: '1px solid #efefef',
      cursor: 'pointer',
    },
    listItemIndented: {
      paddingLeft: theme.spacing(10),
      cursor: 'pointer',
    },
    groupIcon: {
      fontSize: 29,
      lineHeight: 1,
      minWidth: 40,
      color: theme.palette.text.primary,
    },
    groupText: {},
    storeText: {
      paddingLeft: 40,
    },
    avatar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
      display: 'inline-block',
      marginRight: theme.spacing(1),
      position: 'relative',
      top: '6px',
    },
  }),
  { name: 'StoreSwitcherList' },
)

type StoreSwitcherBaseProps = {
  countries: Types.Maybe<CountryLocaleFragment>[]
  locale: string | undefined
} & UseStyles<typeof useStyles>

function useGroupedStores(props: Omit<Types.Maybe<StoreLocaleFragment>, 'stores'>) {
  const { stores } = props
  return useMemo(() => {
    if (!stores || !stores[0] || !stores[0].code || !stores[0].store_name) return
    const result = stores.reduce<any>((r, a) => {
      r[`${a.store_group_code}:${a.store_group_name}`] =
        r[`${a.store_group_code}:${a.store_group_name}`] || []
      r[`${a.store_group_code}:${a.store_group_name}`].push(a)
      return r
    }, Object.create(null))

    return Object.entries(result)
  }, [stores])
}

export default function StoreSwitcherList(props: StoreSwitcherBaseProps) {
  const { stores, locale } = props
  const classes = useStyles(props)

  const groupedStores = useGroupedStores({ stores })

  return (
    <List className={classes.list}>
      {groupedStores.map(([code, storeGroup]) => (
        <React.Fragment key={code}>
          <ListItem
            component={Link}
            selected={storeGroup.length <= 1 && localeToStore(locale) === storeGroup[0].code}
            color='inherit'
            underline='always'
            className={classes.listItem}
          >
            <PageLink
              key={storeGroup[0].code}
              href='/switch-stores'
              locale={storeToLocale(storeGroup[0].code)}
            >
              <ListItemText className={classes.storeText}>
                <ListItemIcon className={classes.groupIcon}>
                  <FlagAvatar flagSrc={code} className={classes.avatar} />
                </ListItemIcon>
                {code.split(':')[1]}
                {storeGroup.length <= 1 && ` — ${storeGroup[0].store_name}`}
              </ListItemText>
            </PageLink>
          </ListItem>
          {storeGroup.length > 1 && (
            <Collapse in timeout='auto'>
              {storeGroup.map((store) => (
                <PageLink key={store.code} href='/switch-stores' locale={storeToLocale(store.code)}>
                  <ListItem
                    selected={localeToStore(locale) === store.code}
                    className={classes.listItemIndented}
                  >
                    <ListItemText className={classes.storeText}>{store.store_name}</ListItemText>
                  </ListItem>
                </PageLink>
              ))}
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </List>
  )
}
