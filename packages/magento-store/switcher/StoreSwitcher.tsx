import {
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Theme,
} from '@material-ui/core'
import * as Types from '@reachdigital/magento-graphql'
import FlagAvatar from '@reachdigital/next-ui/FlagAvatar'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import React from 'react'
import localeToStore, { storeToLocale } from '../localeToStore'
import { CountryLocaleFragment } from './CountryLocale.gql'
import { StoreLocaleFragment } from './StoreLocale.gql'
import StoreSwitcherList from './StoreSwitcherList'

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
  { name: 'StoreSwitcher' },
)

type StoreSwitcherBaseProps = {
  stores: Types.Maybe<StoreLocaleFragment>[]
  countries: Types.Maybe<CountryLocaleFragment>[]
  fallbackCountry: CountryLocaleFragment
  locale: string | undefined
} & UseStyles<typeof useStyles>

export default function StoreSwitcher(props: StoreSwitcherBaseProps) {
  const { stores, countries, locale, fallbackCountry } = props
  const classes = useStyles(props)

  return (
    <div>
      {stores.length ? (
        <StoreSwitcherList stores={stores} locale={locale} />
      ) : (
        <List>
          <ListItem
            component={Link}
            selected={localeToStore(locale) === fallbackCountry.two_letter_abbreviation}
            color='inherit'
            underline='always'
            className={classes.listItem}
          >
            <PageLink
              key={fallbackCountry.id}
              href='/switch-stores'
              locale={storeToLocale(`en_${fallbackCountry.two_letter_abbreviation}`)}
            >
              <ListItemText className={classes.storeText}>
                <ListItemIcon className={classes.groupIcon}>
                  <FlagAvatar fallbackCountry={fallbackCountry} className={classes.avatar} />
                </ListItemIcon>
                {`${fallbackCountry.full_name_locale} — English`}
              </ListItemText>
            </PageLink>
          </ListItem>
        </List>
      )}
    </div>
  )
}
