/* eslint-disable no-case-declarations */
import { useAnimation } from 'framer-motion'
import { createContext, PropsWithChildren, useContext, useEffect, useReducer, useRef } from 'react'
import useResizeObserver from 'use-resize-observer'
import sliderReducer, { SliderActions, SliderReducer, SliderState } from './sliderReducer'

const context = createContext<[Partial<SliderState>, React.Dispatch<SliderActions>]>([{}, () => {}])
context.displayName = 'ScrollSnapSliderContext'

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

  const containerSize = useResizeObserver<HTMLElement>({ ref: containerRef.current })
  const scrollerSize = useResizeObserver<HTMLDivElement>({ ref: scrollerRef.current })

  const [state, dispatch] = useReducer<SliderReducer>(sliderReducer, {
    items: [],
    controls,
    containerRef,
    containerSize,
    scrollerRef,
    scrollerSize,
    options: { transition, scrollSnapAlign, scrollSnapType, scrollSnapStop },
  } as SliderState)

  useEffect(() => {
    dispatch({ type: 'RESIZE', containerSize, scrollerSize })
  }, [containerSize, containerSize.width, scrollerSize, scrollerSize.width])

  const { Provider } = context
  return <Provider value={[state, dispatch]}>{children}</Provider>
}
