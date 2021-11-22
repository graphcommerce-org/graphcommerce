import { useContext } from 'react'
import sheetContext from '../context/sheetContext'

export function useSheetContext() {
  return useContext(sheetContext)
}
