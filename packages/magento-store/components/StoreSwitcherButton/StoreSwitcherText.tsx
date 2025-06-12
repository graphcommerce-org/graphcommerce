import { extendableComponent, FlagAvatar, ListFormat } from '@graphcommerce/next-ui'
import React from 'react'
import { useShowStoreSwitcherButton } from './useStoreSwitcherButton'

export type StoreSwitcherTextProps = {
  items?: React.ReactNode[]
  showFlag?: boolean
}

const name = 'StoreSwitcherButton'
const parts = ['root', 'avatar'] as const
const { classes } = extendableComponent(name, parts)

export function StoreSwitcherText(props: StoreSwitcherTextProps) {
  const { items = [], showFlag = false } = props

  const { country, multiLocale, currency, multiCurrency } = useShowStoreSwitcherButton()

  const renderItems = [
    multiLocale && (
      <React.Fragment key='locale'>
        {showFlag && (
          <FlagAvatar
            country={country}
            className={classes.avatar}
            size='20px'
            sx={{ marginRight: '10px' }}
          />
        )}
        {country.toUpperCase()}
      </React.Fragment>
    ),
    multiCurrency && <React.Fragment key='currency'>{currency}</React.Fragment>,
    ...items,
  ].filter(Boolean) as React.ReactNode[]

  if (renderItems.length === 0) return null

  return (
    <ListFormat type='unit' listStyle='narrow'>
      {renderItems}
    </ListFormat>
  )
}
