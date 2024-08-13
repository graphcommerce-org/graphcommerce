import { ProductItemsGridProps, useProductFiltersPro } from '@graphcommerce/magento-product'
import { useMemoObject } from '@graphcommerce/next-ui'
import { useEventCallback } from '@mui/material'
import React, { useContext, useEffect, useRef } from 'react'
import { useSendEvent } from '../api/sendEvent'
import {
  productItemsToViewItemList,
  viewItemListToSelectItem,
} from '../mapping/productItemsToViewItemList/productItemsToViewItemList'
import { useDebounce } from '@graphcommerce/react-hook-form'

const DatalayerSelectItemContext = React.createContext<((itemId: string) => void) | undefined>(
  undefined,
)

export function useViewItemList() {
  const context = useContext(DatalayerSelectItemContext)
  if (!context) {
    return (itemId: string) => {
      console.log(`No DatalayerSelectItemContext provider found, trying to select item ${itemId}`)
    }
  }
  return context
}

export function DatalayerViewItemList(
  props: ProductItemsGridProps & { children: React.ReactNode },
) {
  const { title: item_list_name, items, children, containerRef } = props
  const item_list_id = item_list_name.toLowerCase().replace(/\s/g, '_')

  const params = useProductFiltersPro(true)?.params

  const sendEvent = useSendEvent()
  const viewItemList = useMemoObject(
    productItemsToViewItemList(item_list_id, item_list_name, items, params),
  )

  const sendUids = useRef<Map<string, boolean>>(new Map())

  const send = useDebounce(() => {
    const toSend = [...sendUids.current.entries()]
      .filter(([, value]) => value !== true)
      .map(([key]) => key)
    if (toSend.length === 0) return

    const viewItems = viewItemList.items.filter((item) => toSend.includes(item.item_uid))

    console.log('Sending view_item_list', { ...viewItemList, items: viewItems })
    sendEvent('view_item_list', { ...viewItemList, items: viewItems })

    // Mark as send.
    toSend.forEach((item_uid) => sendUids.current.set(item_uid, true))
  }, 1000)

  useEffect(() => {
    sendUids.current.clear()
    if (typeof containerRef === 'function' || !containerRef?.current) return () => {}

    const childNodes = [...containerRef.current.childNodes].filter((n) => n instanceof HTMLElement)

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const { target } = entry
          if (entry.isIntersecting && target instanceof HTMLElement) {
            const index = childNodes.indexOf(target)
            const item = viewItemList.items[index]
            if (item && !sendUids.current.has(item.item_uid)) {
              sendUids.current.set(item.item_uid, false)
            }
          }
        }
        send()
      },
      { threshold: 0.5 },
    )

    childNodes.forEach((node) => {
      io.observe(node)
    })

    return () => io.disconnect()
  }, [containerRef, send, viewItemList])

  const selectItem = useEventCallback((itemId: string) => {
    sendEvent('select_item', viewItemListToSelectItem(viewItemList, itemId))
  })

  return (
    <DatalayerSelectItemContext.Provider value={selectItem}>
      {children}
    </DatalayerSelectItemContext.Provider>
  )
}
