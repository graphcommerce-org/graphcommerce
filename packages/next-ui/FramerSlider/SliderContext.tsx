/* eslint-disable no-case-declarations */
import { useAnimation } from 'framer-motion'
import { Context, createContext, PropsWithChildren, useContext, useReducer } from 'react'
import sliderReducer, { SliderActions, SliderReducer, SliderState } from './sliderReducer'

let context: Context<[SliderState, React.Dispatch<SliderActions>]>

export function useSliderContext() {
  return useContext(context)
}

export type SliderContextProps = PropsWithChildren<
  Partial<SliderState['options']> & Pick<SliderState, 'containerRef'>
>

export function SliderContext(props: SliderContextProps) {
  const {
    children,
    containerRef,
    transition = { type: 'spring', stiffness: 200, mass: 1, damping: 20 },
    scrollSnapAlign = 'center',
    scrollSnapStop = 'normal',
    scrollSnapType = 'mandatory',
  } = props

  const controls = useAnimation()
  const initial = useReducer<SliderReducer>(sliderReducer, {
    items: [],
    controls,
    containerRef,
    options: { transition, scrollSnapAlign, scrollSnapType, scrollSnapStop },
  } as SliderState)

  if (!context) {
    context = createContext(initial)
    context.displayName = 'ScrollSnapSliderContext'
  }

  const { Provider } = context
  return <Provider value={initial}>{children}</Provider>
}
