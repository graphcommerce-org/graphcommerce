import { useMotionValueValue } from '@graphcommerce/framer-utils'
import { MotionValue, useMotionValue } from 'framer-motion'
import React, { createContext, PropsWithChildren, useContext, useMemo } from 'react'
import { useScrollerContext } from '../hooks/useScrollerContext'
import { ItemState } from '../types'

export type ImageGallaryContextValues = {
  container: {
    width?: number
    pan: { active: MotionValue<boolean> }
  }
  items: ItemState[]
}

export const ImageGallaryContext = createContext<ImageGallaryContextValues | undefined>(undefined)

export function useImageGalleryContext() {
  const context = useContext(ImageGallaryContext)
  if (typeof context === 'undefined') {
    throw Error(
      'useImageGalleryContext must be used within a ImageGallaryContext.Provider component',
    )
  }

  return context
}

export function ImageGalleryContextProvider(props: { children: React.ReactNode }) {
  const { children } = props
  const { items } = useScrollerContext()
  const itemsArr = useMotionValueValue(items, (i) => i)
  const panActive = useMotionValue(false)

  const memoizedContextValues = useMemo<ImageGallaryContextValues>(
    () => ({
      container: {
        pan: { active: panActive },
      },
      items: itemsArr,
    }),
    [panActive, itemsArr],
  )

  return (
    <ImageGallaryContext.Provider value={memoizedContextValues}>
      {children}
    </ImageGallaryContext.Provider>
  )
}
