import {
  ScrollMotionValues,
  useElementScroll,
  useMotionValueValue,
} from '@graphcommerce/framer-utils'
import { MotionValue, useMotionValue } from 'framer-motion'
import React, { createContext, useContext, useMemo, useRef } from 'react'
import { useScrollerContext } from '../hooks/useScrollerContext'
import { ItemState } from '../types'

export type ImageGallaryContextValues = {
  container: {
    ref: React.RefObject<HTMLDivElement>
    pan: {
      active: MotionValue<boolean>
      value: ScrollMotionValues
    }
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
  const ref = useRef<HTMLDivElement>(null)
  const { items } = useScrollerContext()
  const itemsArr = useMotionValueValue(items, (i) => i)
  const panActive = useMotionValue(false)
  const value = useElementScroll(ref)
  const memoizedContextValues = useMemo<ImageGallaryContextValues>(
    () => ({
      container: {
        ref,
        pan: { active: panActive, value },
      },
      items: itemsArr,
    }),
    [value, panActive, itemsArr],
  )

  return (
    <ImageGallaryContext.Provider value={memoizedContextValues}>
      {children}
    </ImageGallaryContext.Provider>
  )
}
