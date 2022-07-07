/* eslint-disable spaced-comment */
import { extendableComponent, FlagAvatar } from '@graphcommerce/next-ui'
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemAvatar,
  SxProps,
  Theme,
} from '@mui/material'
import PageLink from 'next/link'
import React from 'react'
import { localeToStore, storeToLocale } from '../../localeToStore'
import { StoreSwitcherListQuery } from './StoreSwitcherList.gql'

type Store = NonNullable<NonNullable<StoreSwitcherListQuery['availableStores']>[0]>

export type StoreSwitcherListProps = {
  locale: string | undefined
  sx?: SxProps<Theme>
} & StoreSwitcherListQuery

const name = 'StoreSwitcherList' as const
const parts = ['list', 'listItem', 'listItemIndented', 'avatar'] as const
const { classes } = extendableComponent(name, parts)

export function StoreSwitcherList(props: StoreSwitcherListProps) {
  const { availableStores, locale, sx } = props

  const groupedStores = Object.entries(
    (availableStores ?? []).reduce<{
      [group: string]: { name: Store['store_group_name']; stores: Store[] }
    }>((storesGrouped, store) => {
      const code = store?.store_group_code
      if (!store?.store_group_code || !code) return storesGrouped

      if (!storesGrouped[code]) storesGrouped[code] = { name: store.store_group_name, stores: [] }

      storesGrouped[code].stores.push(store)
      return storesGrouped
    }, {}),
  )

  return (
    <List className={classes.list} sx={sx}>
      {groupedStores.map(([code, group]) => (
        <React.Fragment key={code}>
          <PageLink
            key={group.stores[0].locale}
            href='/switch-stores'
            locale={storeToLocale(group.stores[0].store_code)}
            replace
            passHref
          >
            <ListItem
              disabled={!storeToLocale(group.stores[0].store_code)}
              button
              component='a'
              selected={
                group.stores.length <= 1 && localeToStore(locale) === group.stores[0].store_code
              }
              color='inherit'
              className={classes.listItem}
              sx={(theme) => ({
                borderTop: `1px solid ${theme.palette.divider}`,
                cursor: 'pointer',
              })}
            >
              <ListItemAvatar>
                <FlagAvatar
                  country={code}
                  className={classes.avatar}
                  sx={{ width: 30, height: 30 }}
                />
              </ListItemAvatar>
              <ListItemText>
                {group.name}
                {group.stores.length <= 1 && ` — ${group.stores[0].store_name}`}

                {process.env.NODE_ENV !== 'production' &&
                  !storeToLocale(group.stores[0].store_code) && (
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
                  locale={storeToLocale(store.store_code)}
                  replace
                  passHref
                >
                  <ListItem
                    disabled={!localeToStore(locale)}
                    button
                    component='a'
                    selected={localeToStore(locale) === store.store_code}
                    color='inherit'
                    className={classes.listItemIndented}
                    sx={{
                      paddingLeft: '30px',
                      cursor: 'pointer',
                    }}
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
