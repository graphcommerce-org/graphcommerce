import { useQuery } from '@apollo/client'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import { SheetShellBase, SheetShellBaseProps } from '@reachdigital/next-ui'
import React from 'react'
import Logo from './Logo'

export type SheetShellProps = Omit<SheetShellBaseProps, 'header' | 'name' | 'classes'>

function SheetShell(props: SheetShellProps) {
  const storeConfig = useQuery(StoreConfigDocument)
  const name = storeConfig.data?.storeConfig?.store_name ?? ''

  // size={`${responsiveVal(320, 800)}`}
  return <SheetShellBase {...props} header={<Logo />} name={name} />
}

export default SheetShell
