import { useCallback } from 'react'
import { SnapPoint } from '../types'
import { useSheetContext } from './useSheetContext'

export default function useSnapTo() {
  const { snapPoints, controls } = useSheetContext()

  return useCallback(
    (p: SnapPoint) => {
      const index = snapPoints.indexOf(p)
      if (index < 0) console.error('snapPoint')
      return controls.start(`snapPoint${index}`)
    },
    [controls, snapPoints],
  )
}
