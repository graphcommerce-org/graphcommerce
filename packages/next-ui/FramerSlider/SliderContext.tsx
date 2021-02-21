/* eslint-disable no-case-declarations */
import { Transition, useAnimation } from 'framer-motion'
import React, {
  Context,
  createContext,
  Dispatch,
  PropsWithChildren,
  ReducerAction,
  ReducerState,
  useContext,
  useReducer,
} from 'react'
import sliderReducer, { SliderReducer, SliderState } from './sliderReducer'

const contexts: {
  [scope: string]: Context<[ReducerState<SliderReducer>, Dispatch<ReducerAction<SliderReducer>>]>
} = {}

export function useSliderContext(scope: string) {
  return useContext(contexts[scope])
}

export type ScrollSnapSliderProviderProps = PropsWithChildren<
  {
    /**
     * To create a named context (to access elsewhere)
     */
    scope: string

    /**
     * The transition while animating manually
     */
    transition?: Transition
  } & Partial<Pick<SliderState, 'scrollSnapAlign' | 'scrollSnapStop' | 'scrollSnapType'>>
>

export function SliderContext(props: ScrollSnapSliderProviderProps) {
  const {
    children,
    scope,
    transition = { type: 'spring', stiffness: 200, mass: 1, damping: 20 },
    scrollSnapAlign = 'center',
    scrollSnapStop = 'normal',
    scrollSnapType = 'mandatory',
  } = props

  const controls = useAnimation()
  const initial = useReducer<SliderReducer>(sliderReducer, {
    items: {},
    controls,
    count: 0,
    transition,
    scrollSnapAlign,
    scrollSnapType,
    scrollSnapStop,
  } as SliderState)

  if (!contexts[scope]) {
    contexts[scope] = createContext(initial)
    contexts[scope].displayName = 'ScrollSnapSliderContext'
  }

  const { Provider } = contexts[scope]
  return <Provider value={initial}>{children}</Provider>
}
