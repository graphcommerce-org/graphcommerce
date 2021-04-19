import { useQuery } from '@apollo/client'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import SheetShellBase, {
  SheetShellProps as SheetShellPropsBase,
} from '@reachdigital/next-ui/AppShell/SheetShell'
import React from 'react'
import Logo from './Logo'

export type SheetShellProps = Omit<SheetShellPropsBase, 'header' | 'name' | 'classes'>

function SheetShell(props: SheetShellProps) {
  const storeConfig = useQuery(StoreConfigDocument)
  const name = storeConfig.data?.storeConfig?.store_name ?? ''

  // size={`${responsiveVal(320, 800)}`}
  return <SheetShellBase {...props} header={<Logo />} name={name} />
}

export default SheetShell
