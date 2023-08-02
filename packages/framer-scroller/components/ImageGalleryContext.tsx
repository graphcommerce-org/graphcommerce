import { MotionValue } from 'framer-motion'
import { createContext, useContext } from 'react'
import { ItemState } from '../types'

export type ImageGallaryContextValues = {
  container: {
    width: number
    pan: { coordinates: MotionValue<{ x: number; y: number }> }
  }
  items: ItemState[]
  animation: { active: MotionValue<boolean>; mode: MotionValue<'scroll' | 'drag'> }
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
