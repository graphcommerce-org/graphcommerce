import { CurrencySymbol, extendableComponent, FlagAvatar, ListFormat } from '@graphcommerce/next-ui'
import { Box, type SxProps, type Theme } from '@mui/material'
import React from 'react'
import { useShowStoreSwitcherButton } from './useStoreSwitcherButton'

export type StoreSwitcherTextProps = {
  items?: React.ReactNode[]
  showFlag?: boolean
  sx?: SxProps<Theme>
}

const name = 'StoreSwitcherButton'
const parts = ['root', 'avatar'] as const
const { classes } = extendableComponent(name, parts)

export function StoreSwitcherText(props: StoreSwitcherTextProps) {
  const { items = [], showFlag = false, sx = [] } = props

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
    multiCurrency && currency && (
      <CurrencySymbol key='currency' currency={currency} currencyDisplay='symbol' />
    ),
    ...items,
  ].filter(Boolean) as React.ReactNode[]

  if (renderItems.length === 0) return null

  return (
    <Box component='span' sx={sx}>
      <ListFormat type='unit' listStyle='narrow'>
        {renderItems}
      </ListFormat>
    </Box>
  )
}
