import { FlagAvatar, UseStyles } from '@graphcommerce/next-ui'
import { List, ListItem, ListItemText, Theme, Collapse, ListItemAvatar } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import PageLink from 'next/link'
import React from 'react'
import { localeToStore, storeToLocale } from '../localeToStore'
import { StoreSwitcherListQuery } from './StoreSwitcherList.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    list: {},
    listItem: {
      borderTop: `1px solid ${theme.palette.divider}`,
      cursor: 'pointer',
    },
    listItemIndented: {
      paddingLeft: 30,
      cursor: 'pointer',
    },
    groupIcon: {
      fontSize: 29,
      lineHeight: 1,
      minWidth: 40,
      color: theme.palette.text.primary,
    },
    avatar: {
      width: 30,
      height: 30,
    },
  }),
  { name: 'StoreSwitcherList' },
)

type Store = NonNullable<NonNullable<StoreSwitcherListQuery['availableStores']>[0]>

export type StoreSwitcherListProps = { locale: string | undefined } & StoreSwitcherListQuery &
  UseStyles<typeof useStyles>

export default function StoreSwitcherList(props: StoreSwitcherListProps) {
  const { availableStores, locale } = props
  const classes = useStyles(props)

  const groupedStores = Object.entries(
    (availableStores ?? []).reduce<{
      [group: string]: { name: Store['store_group_name']; stores: Store[] }
    }>((storesGrouped, store) => {
      const code = store?.locale?.split('_')[1].toLowerCase()
      if (!store?.store_group_code || !code) return storesGrouped

      if (!storesGrouped[code]) storesGrouped[code] = { name: store.store_group_name, stores: [] }

      storesGrouped[code].stores.push(store)
      return storesGrouped
    }, {}),
  )

  return (
    <List className={classes.list}>
      {groupedStores.map(([code, group]) => (
        <React.Fragment key={code}>
          <PageLink
            key={group.stores[0].locale}
            href='/switch-stores'
            locale={storeToLocale(group.stores[0].locale)}
            replace
            passHref
          >
            <ListItem
              disabled={!storeToLocale(group.stores[0].locale)}
              button
              component='a'
              selected={
                group.stores.length <= 1 && localeToStore(locale) === group.stores[0].locale
              }
              color='inherit'
              className={classes.listItem}
            >
              <ListItemAvatar>
                <FlagAvatar country={code} classes={{ root: classes.avatar }} />
              </ListItemAvatar>
              <ListItemText>
                {group.name}
                {group.stores.length <= 1 && ` — ${group.stores[0].store_name}`}

                {process.env.NODE_ENV !== 'production' &&
                  !storeToLocale(group.stores[0].locale) && (
                    <> 🚨 Could not find configuration in .env</>
                  )}
              </ListItemText>
            </ListItem>
          </PageLink>
          {group.stores.length > 1 && (
            <Collapse in timeout='auto'>
              {group.stores.map((store) => (
                <PageLink
                  key={store.locale}
                  href='/switch-stores'
                  locale={storeToLocale(store.locale)}
                  replace
                  passHref
                >
                  <ListItem
                    disabled={!localeToStore(locale)}
                    button
                    component='a'
                    selected={localeToStore(locale) === store.locale}
                    color='inherit'
                    className={classes.listItemIndented}
                  >
                    <ListItemText inset>
                      {store.store_name}

                      {process.env.NODE_ENV !== 'production' && !localeToStore(locale) && (
                        <> 🚨 Could not find configuration in .env</>
                      )}
                    </ListItemText>
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
