import { AnimationControls, MotionValue, useAnimation, useMotionValue } from 'framer-motion'
import React, { useContext } from 'react'
import { SnapPoint, useSnapPoint } from './useSnapPoint'

type SheetContextType = {
  y: MotionValue<number>
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

  const y = useMotionValue<number>(useSnapPoint(snapPoints[0]).get())
  const controls = useAnimation()

  return (
    <sheetContext.Provider value={{ y, controls, snapPoints }}>{children}</sheetContext.Provider>
  )
}
