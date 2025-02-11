import type { ActionCardListFormProps } from '@graphcommerce/ecommerce-ui'
import { ActionCardListForm, useWatch } from '@graphcommerce/ecommerce-ui'
import { useIsomorphicLayoutEffect } from '@graphcommerce/framer-utils'
import type { ActionCardProps } from '@graphcommerce/next-ui'
import { ActionCard, CurrencySymbol, nonNullable, sxx } from '@graphcommerce/next-ui'
import type { StoreSwitcherFormValues } from './useStoreSwitcher'
import { useSelectedStore, useStoreSwitcherForm } from './useStoreSwitcher'

export type StoreSwitcherCurrencySelectorProps = {
  header?: React.ReactNode
} & Omit<
  ActionCardListFormProps<ActionCardProps, StoreSwitcherFormValues>,
  'name' | 'control' | 'items' | 'required' | 'render'
>

export function StoreSwitcherCurrencySelector(props: StoreSwitcherCurrencySelectorProps) {
  const { header, ...actionCardList } = props
  const { control } = useStoreSwitcherForm()
  const store = useSelectedStore()

  const currencies = store?.currency?.available_currency_codes?.filter(nonNullable) ?? []
  const defaultValue = store?.currency?.default_display_currency_code ?? currencies?.[0] ?? ''

  // Make sure the default currency is the first in the list
  currencies.sort((a, b) => {
    if (a === defaultValue) return -1
    if (b === defaultValue) return 1
    return 0
  })

  const hidden = currencies.length === 1

  return (
    <>
      {!hidden && header}
      <ActionCardListForm<ActionCardProps, StoreSwitcherFormValues>
        control={control}
        defaultValue={defaultValue}
        name='currency'
        layout='stack'
        size='responsive'
        required
        color='secondary'
        render={ActionCard}
        sx={sxx(hidden && { display: 'none !important' })}
        items={currencies.map((currency) => ({
          value: currency,
          title: <CurrencySymbol currency={currency} variant='full' />,
        }))}
        {...actionCardList}
      />
    </>
  )
}
