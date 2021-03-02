/* eslint-disable no-case-declarations */
import { useAnimation } from 'framer-motion'
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react'
import sliderReducer, { SliderActions, SliderReducer, SliderState } from './sliderReducer'

const context = createContext<[Partial<SliderState>, React.Dispatch<SliderActions>]>([{}, () => {}])
context.displayName = 'ScrollSnapSliderContext'

export function useSliderContext() {
  return useContext(context) as [SliderState, Dispatch<SliderActions>]
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

  const [state, dispatch] = useReducer<SliderReducer>(sliderReducer, {
    items: [],
    controls,
    containerRef,
    scrollerRef,
    options: { transition, scrollSnapAlign, scrollSnapType, scrollSnapStop },
  } as SliderState)

  useEffect(() => {
    if (!containerRef.current) return () => {}
    const ro = new ResizeObserver(([entry]) => {
      dispatch({
        type: 'RESIZE_CONTAINER',
        containerSize: {
          width: entry.contentRect.width,
          height: entry.contentRect.height,
          inlineSize:
            entry.borderBoxSize?.[0].inlineSize ?? entry.target.getBoundingClientRect().width,
          blockSize:
            entry.borderBoxSize?.[0].blockSize ?? entry.target.getBoundingClientRect().height,
        },
      })
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!scrollerRef.current) return () => {}
    const ro = new ResizeObserver(([entry]) => {
      dispatch({
        type: 'RESIZE_SCROLLER',
        scrollerSize: {
          width: entry.contentRect.width,
          height: entry.contentRect.height,
          inlineSize:
            entry.borderBoxSize?.[0].inlineSize ?? entry.target.getBoundingClientRect().width,
          blockSize:
            entry.borderBoxSize?.[0].blockSize ?? entry.target.getBoundingClientRect().height,
        },
      })
    })
    ro.observe(scrollerRef.current)
    return () => ro.disconnect()
  }, [])

  const { Provider } = context
  return <Provider value={[state, dispatch]}>{children}</Provider>
}
