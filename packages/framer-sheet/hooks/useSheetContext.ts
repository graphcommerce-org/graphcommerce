import { useContext } from 'react'
import sheetContext from '../context/sheetContext'

export default function useSheetContext() {
  return useContext(sheetContext)
}
