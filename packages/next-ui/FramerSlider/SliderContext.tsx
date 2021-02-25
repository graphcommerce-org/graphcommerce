/* eslint-disable no-case-declarations */
import { useAnimation } from 'framer-motion'
import { Context, createContext, PropsWithChildren, useContext, useReducer, useRef } from 'react'
import sliderReducer, { SliderActions, SliderReducer, SliderState } from './sliderReducer'

let context: Context<[SliderState, React.Dispatch<SliderActions>]>

export function useSliderContext() {
  return useContext(context)
}

export type SliderContextProps = PropsWithChildren<Partial<SliderState['options']>>

export function SliderContext(props: SliderContextProps) {
  const {
    children,
    transition = { type: 'spring', stiffness: 200, mass: 1, damping: 20 },
    scrollSnapAlign = 'center',
    scrollSnapStop = 'normal',
    scrollSnapType = 'mandatory',
  } = props

  const controls = useAnimation()
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)

  const initial = useReducer<SliderReducer>(sliderReducer, {
    items: [],
    controls,
    containerRef,
    scrollerRef,
    options: { transition, scrollSnapAlign, scrollSnapType, scrollSnapStop },
  } as SliderState)

  if (!context) {
    context = createContext(initial)
    context.displayName = 'ScrollSnapSliderContext'
  }

  const { Provider } = context
  return <Provider value={initial}>{children}</Provider>
}
