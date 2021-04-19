import React from 'react'
import { SheetContext } from '../types'

const sheetContext = React.createContext((undefined as unknown) as SheetContext)
sheetContext.displayName = 'sheetContext'

export default sheetContext
