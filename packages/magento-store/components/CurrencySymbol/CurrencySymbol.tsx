import { useQuery } from '@graphcommerce/graphql'
import {
  CurrencySymbol as CurrencySymbolBase,
  type CurrencySymbolProps,
} from '@graphcommerce/next-ui'
import { StoreConfigDocument } from '../../queries/StoreConfig.gql'

export function CurrencySymbol(props: CurrencySymbolProps) {
  const { currency } = props
  const baseCurrencyCode = useQuery(StoreConfigDocument).data?.storeConfig?.base_currency_code ?? ''

  return <CurrencySymbolBase {...props} currency={currency || baseCurrencyCode} />
}
