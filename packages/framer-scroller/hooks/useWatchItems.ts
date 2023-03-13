import { useEffect } from 'react'
import { ItemState } from '../types'
import { useScrollerContext } from './useScrollerContext'

export function useWatchItems(callback: (item: ItemState, items: ItemState[]) => void) {
  const { items } = useScrollerContext()

  useEffect(() => {
    const watched: (() => void)[] = []

    const handleItemChange = (itemArr: ItemState[]) => {
      itemArr.forEach((item) => {
        watched.push(item.visibility.on('change', () => callback(item, items.get())))
      })
    }

    watched.push(items.on('change', handleItemChange))
    handleItemChange(items.get())

    return () => watched.forEach((w) => w())
  })
}
