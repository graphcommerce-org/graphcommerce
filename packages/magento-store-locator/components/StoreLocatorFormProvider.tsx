import { FormPersist, useForm, useFormPersist, UseFormReturn } from '@graphcommerce/ecommerce-ui'
import { createContext, ReactNode, useContext } from 'react'
import { StoreFragment } from '../Store.gql'

type FormValues = {
  search: string
  selectedStore?: StoreFragment
  selected?: string
}

type StoreLocatorFormContextType = UseFormReturn<FormValues>
const StoreLocatorFormContext = createContext<StoreLocatorFormContextType | undefined>(undefined)

export function useStoreLocatorForm() {
  const context = useContext(StoreLocatorFormContext)
  if (!context) throw Error('useStoreLocatorForm must be used within a StoreLocatorFormProvider')
  return context
}

export function StoreLocatorFormProvider(props: { children: ReactNode }) {
  const { children } = props

  const form = useForm<FormValues>()

  globalThis.aaa = form

  return (
    <StoreLocatorFormContext.Provider value={form}>
      <FormPersist form={form} name='StoreLocatorForm' />
      {children}
    </StoreLocatorFormContext.Provider>
  )
}
