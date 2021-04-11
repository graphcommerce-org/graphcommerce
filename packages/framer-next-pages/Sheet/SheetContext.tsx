import {
  AnimationControls,
  MotionValue,
  useAnimation,
  useMotionValue,
  useTransform,
} from 'framer-motion'
import React, { useContext } from 'react'
import { SnapPoint, snapPointPx } from './useSnapPoint'

type SheetContextType = {
  y: MotionValue<number>
  height: MotionValue<number>
  controls: AnimationControls
  snapPoints: SnapPoint[]
}

const sheetContext = React.createContext((undefined as unknown) as SheetContextType)
sheetContext.displayName = 'sheetContext'

export function useSheetContext() {
  return useContext(sheetContext)
}

type SheetContextProps = { children?: React.ReactNode; snapPoints: SnapPoint[] }

export default function SheetContext(props: SheetContextProps) {
  const { children, snapPoints } = props

  const height = useMotionValue<number>(0)
  const yInitial = useTransform(height, (h) => snapPointPx(snapPoints[0], h))

  const context = {
    y: useMotionValue<number>(yInitial.get()),
    height,
    controls: useAnimation(),
    snapPoints,
  }

  return <sheetContext.Provider value={context}>{children}</sheetContext.Provider>
}
