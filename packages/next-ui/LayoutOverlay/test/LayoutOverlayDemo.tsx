import { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from 'react'
import { LayoutOverlay } from '..'
import { LayoutOverlayProps } from '../components/LayoutOverlay'

export type LayoutOverlayState = Omit<LayoutOverlayProps, 'children' | 'classes'>

export type LayoutOverlayDemoContext = [
  LayoutOverlayState,
  Dispatch<SetStateAction<LayoutOverlayState>>,
]

const demoProvider = createContext(undefined as unknown as LayoutOverlayDemoContext)

export function useLayoutOverlayDemoContext() {
  return useContext(demoProvider)
}

export function LayoutOverlayDemo({ children }: { children?: React.ReactNode }) {
  const [layout, setLayout] = useState<LayoutOverlayState>({
    variantSm: 'bottom',
    variantMd: 'bottom',
    justifySm: 'stretch',
    justifyMd: 'stretch',
    sizeMd: 'floating',
    sizeSm: 'floating',
  })

  return (
    <demoProvider.Provider value={useMemo(() => [layout, setLayout], [layout])}>
      <LayoutOverlay {...layout}>{children}</LayoutOverlay>
    </demoProvider.Provider>
  )
}
