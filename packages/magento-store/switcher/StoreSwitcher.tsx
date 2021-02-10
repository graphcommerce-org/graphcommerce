import {
  Chip,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core'
import * as Types from '@reachdigital/magento-graphql'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import React, { useMemo } from 'react'
import localeToStore, { storeToLocale } from '../localeToStore'
import { CountryLocaleFragment } from './CountryLocale.gql'
import { StoreLocaleFragment } from './StoreLocale.gql'
import countryToFlag from './countryToFlag'

const useStyles = makeStyles(
  () => ({
    list: {},
    listItem: {},
    groupIcon: {
      fontSize: 29,
      lineHeight: 1,
      minWidth: 40,
      color: theme.palette.primary.contrastText,
    },
    groupText: {},
    storeText: {
      paddingLeft: 40,
    },
    storeChip: {
      fontSize: 'small',
      pointerEvents: 'none',
    },
  }),
  { name: 'StoreSwitcher' },
)

type StoreSwitcherBaseProps = {
  stores: Types.Maybe<StoreLocaleFragment>[]
  countries: Types.Maybe<CountryLocaleFragment>[]
  fallbackCountry: CountryLocaleFragment
  locale: string | undefined
} & UseStyles<typeof useStyles>

function useGroupedStores(props: Omit<StoreSwitcherBaseProps, 'locale'>) {
  const { stores, countries, fallbackCountry } = props
  return useMemo(() => {
    const res: {
      [index: string]: { country: CountryLocaleFragment; languages: StoreLocaleFragment[] }
    } = {}

    stores?.forEach((store) => {
      if (!store?.locale || !store?.code || !store.store_name) return
      const countryCode = store.locale.split('_')?.[1]
      if (!countryCode) throw Error(`Country code not defined`)
      if (store.code?.endsWith(store.locale)) {
        const country = countries?.find((c) => c?.two_letter_abbreviation === countryCode)

        if (!country) throw Error(`Country ${countryCode} not found in countries list`)
        if (!res[countryCode]) res[countryCode] = { country, languages: [] }
        res[countryCode].languages.push(store)
      } else {
        if (!res.fallback) res.fallback = { country: fallbackCountry, languages: [] }
        res.fallback.languages.push(store)
      }
    })
    return Object.entries(res)
  }, [stores, countries, fallbackCountry])
}

export default function StoreSwitcher(props: StoreSwitcherBaseProps) {
  const { stores, countries, locale, fallbackCountry } = props
  const classes = useStyles(props)

  const groupedStores = useGroupedStores({ stores, countries, fallbackCountry })

  return (
    <List className={classes.list}>
      {groupedStores.map(([code, group]) => (
        <React.Fragment key={code}>
          <>
            <ListItem className={classes.listItem}>
              <ListItemIcon className={classes.groupIcon}>
                {countryToFlag(group.country.two_letter_abbreviation ?? '')}
              </ListItemIcon>
              <ListItemText className={classes.groupText}>
                {group.country.full_name_locale}
              </ListItemText>
            </ListItem>
            {group.languages.map((store) => (
              <PageLink href='/switch-stores' locale={storeToLocale(store.code)} key={store.code}>
                <ListItem
                  component={Link}
                  selected={localeToStore(locale) === store.code}
                  color='inherit'
                  underline='none'
                  className={classes.listItem}
                >
                  <ListItemText className={classes.storeText}>
                    {store.store_name}{' '}
                    <Chip
                      size='small'
                      label={store.base_currency_code}
                      className={classes.storeChip}
                    />
                  </ListItemText>
                </ListItem>
              </PageLink>
            ))}
          </>
        </React.Fragment>
      ))}
    </List>
  )
}
