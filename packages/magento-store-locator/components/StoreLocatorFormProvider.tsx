import type { UseFormProps, UseFormReturn } from '@graphcommerce/ecommerce-ui'
import { FormPersist, useForm } from '@graphcommerce/ecommerce-ui'
import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'
import type { StoreFragment } from '../Store.gql'

export type FormValues = {
  search: string
  preferredStore?: StoreFragment
  focusedStore?: string
}

export type StoreLocatorFormContextType = UseFormReturn<FormValues>
export const StoreLocatorFormContext = createContext<StoreLocatorFormContextType | undefined>(
  undefined,
)

export function useStoreLocatorForm() {
  const context = useContext(StoreLocatorFormContext)
  if (!context) throw Error('useStoreLocatorForm must be used within a StoreLocatorFormProvider')
  return context
}

export function StoreLocatorFormProvider(props: {
  children: ReactNode
  defaultValues?: Partial<UseFormProps['defaultValues']>
}) {
  const { children, defaultValues } = props
  const form = useForm<FormValues>({ defaultValues })

  return (
    <StoreLocatorFormContext.Provider value={form}>
      <FormPersist form={form} name='StoreLocatorForm' />
      {children}
    </StoreLocatorFormContext.Provider>
  )
}
