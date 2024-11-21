/* eslint-disable spaced-comment */
import { extendableComponent, FlagAvatar, NextLink } from '@graphcommerce/next-ui'
import type { SxProps, Theme } from '@mui/material'
import { List, ListItemText, Collapse, ListItemAvatar, ListItemButton } from '@mui/material'
import React from 'react'
import { localeToStore, storeToLocale } from '../../localeToStore'
import type { StoreSwitcherListQuery } from './StoreSwitcherList.gql'

type Store = NonNullable<NonNullable<StoreSwitcherListQuery['availableStores']>[0]>

export type StoreSwitcherListProps = {
  locale: string | undefined
  sx?: SxProps<Theme>
} & StoreSwitcherListQuery

const name = 'StoreSwitcherList'
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
          <ListItemButton
            disabled={!storeToLocale(group.stores[0].store_code)}
            component={NextLink}
            key={group.stores[0].locale}
            href='/switch-stores'
            locale={storeToLocale(group.stores[0].store_code)}
            replace
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
          </ListItemButton>

          {group.stores.length > 1 && (
            <Collapse in timeout='auto'>
              {group.stores.map((store) => (
                <ListItemButton
                  key={store.locale}
                  href='/switch-stores'
                  locale={storeToLocale(store.store_code)}
                  replace
                  disabled={!localeToStore(locale)}
                  component={NextLink}
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
                </ListItemButton>
              ))}
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </List>
  )
}
