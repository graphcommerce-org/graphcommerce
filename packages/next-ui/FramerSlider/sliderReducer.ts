/* eslint-disable no-case-declarations */
import { AnimationControls, Transition } from 'framer-motion'
import { Reducer } from 'react'

type SliderItem = {
  el: HTMLElement
  visible: boolean
}

type ScrollSnapTypeDirection = 'block' | 'both' | 'inline' | 'x' | 'y'
type ScrollSnapType = 'mandatory' | 'proximity'

type Rect = Omit<DOMRect, 'toJSON'>

export type SliderState = {
  items: SliderItem[]

  /**
   * To animate to a certain position we store an instance of the return type of useAnimation
   *
   * https://www.framer.com/api/motion/animation/#component-animation-controls
   */
  controls: AnimationControls

  /** Ref to the element that defines the box the scoller resides in. */
  containerRef: React.RefObject<HTMLDivElement>

  /** Rect of the containerRef */
  containerSize?: Pick<Rect, 'width' | 'height'> & ResizeObserverSize

  /** Ref to the element that actually scrolls */
  scrollerRef: React.RefObject<HTMLDivElement>

  /** Rect of the scrollerRef */
  scrollerSize?: Pick<Rect, 'width' | 'height'> & ResizeObserverSize

  /** Options to control the behavior of the slider */
  options: {
    /**
     * The bouncyness of the transition can be controlled here
     *
     * https://www.framer.com/api/motion/types/#transition
     */
    transition?: Transition

    /** https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-stop */
    // todo(paales): add scrollSnapStop
    scrollSnapStop: 'always' | 'normal'

    /** https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type */
    // todo(paales): add scrollSnapType
    scrollSnapType?: ScrollSnapType

    // todo(paales): support the direction parameter as well
    // scrollSnapType?:
    //   | ScrollSnapType
    //   | ScrollSnapTypeDirection
    //   | `${ScrollSnapTypeDirection} ${ScrollSnapType}`

    /** https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align */
    scrollSnapAlign?: 'center' | 'end' | 'start' | false
  }
}

export type RegisterChildrenAction = { type: 'REGISTER_CHILDREN'; elements: HTMLElement[] }
export type VisibilityChildrenAction = {
  type: 'VISIBILITY_CHILDREN'
  items: SliderItem[]
}
export type NavigateAction = { type: 'NAVIGATE'; to: number }
export type NavigateNextAction = { type: 'NAVIGATE_NEXT' }
export type NavigatePrevAction = { type: 'NAVIGATE_PREV' }
export type ScrollAction = { type: 'SCROLL'; x: number; velocity?: number }
export type ResizeContainerAction = { type: 'RESIZE_CONTAINER' } & Pick<
  SliderState,
  'containerSize'
>
export type ResizeScrollerAction = { type: 'RESIZE_SCROLLER' } & Pick<SliderState, 'scrollerSize'>

export type SliderActions =
  | RegisterChildrenAction
  | VisibilityChildrenAction
  | NavigateAction
  | NavigateNextAction
  | NavigatePrevAction
  | ScrollAction
  | ResizeContainerAction
  | ResizeScrollerAction

export type SliderReducer = Reducer<SliderState, SliderActions>

export function rectRelative(rect: Rect, parentRect: Rect): Rect {
  return {
    top: rect.top - parentRect.top,
    right: parentRect.right - rect.right,
    bottom: parentRect.bottom - rect.bottom,
    left: rect.left - parentRect.left,
    width: rect.width,
    height: rect.height,
    x: rect.x - parentRect.x,
    y: rect.y - parentRect.y,
  }
}

function measureItem(item: SliderItem): Rect {
  const rect = item.el.getBoundingClientRect()
  const parentRect = item.el.parentElement?.getBoundingClientRect()
  if (!rect || !parentRect) throw Error('Not in DOM')
  return rectRelative(rect, parentRect)
}

const sliderReducer: SliderReducer = (state: SliderState, action: SliderActions): SliderState => {
  switch (action.type) {
    case 'REGISTER_CHILDREN':
      return {
        ...state,
        items: action.elements.map((el, idx) => ({
          el,
          visible: state.items[idx]?.visible ?? false,
        })),
      }
    case 'VISIBILITY_CHILDREN':
      return {
        ...state,
        items: state.items.map((sItem) => {
          const aItem = action.items.find((i) => i.el === sItem.el)
          return aItem ? { ...sItem, visible: aItem.visible } : sItem
        }),
      }
    case 'NAVIGATE_NEXT':
      const nextItems = state.items.slice().reverse()
      const nextItem = nextItems[nextItems.findIndex((i) => i.visible) - 1]
      if (!nextItem) return state
      return sliderReducer(state, { type: 'SCROLL', x: measureItem(nextItem).left * -1 })
    case 'NAVIGATE_PREV':
      const prevItems = state.items.slice().reverse()
      const prevItem = prevItems[prevItems.findIndex((i) => i.visible) + 1]
      if (!prevItem) return state

      return sliderReducer(state, {
        type: 'SCROLL',
        x:
          state.options.scrollSnapAlign === false
            ? measureItem(prevItem).left * -1 + (state.containerSize?.width ?? 0)
            : measureItem(prevItem).left * -1,
      })
    case 'NAVIGATE':
      const navItem = state.items?.[action.to]
      if (!navItem) return state
      return sliderReducer(state, { type: 'SCROLL', x: measureItem(navItem).left * -1 })
    case 'SCROLL':
      ;(() => {
        const containerRect = state.containerRef.current?.getBoundingClientRect()
        const scrollerRect = (
          state.containerRef.current?.children?.[0] as HTMLElement | undefined
        )?.getBoundingClientRect()

        if (!containerRect || !scrollerRect) return
        if (!state.containerSize || !state.scrollerSize) return

        const align = state.options.scrollSnapAlign
        const possible = state.items
          .map((item) => rectRelative(item?.el.getBoundingClientRect(), scrollerRect))

          // Calculate the possible left scroll positions based on the alignment of the items
          .map((item) => {
            let newX = item.x
            if (align === 'center') newX = item.x + item.width * 0.5 - containerRect.width * 0.5
            if (align === 'end') newX = item.x + item.width - containerRect.width
            return newX * -1
          })

        // Calculate the nearest element
        const x = possible.reduce<number>(
          (prev, curr) => (Math.abs(curr - action.x) < Math.abs(prev - action.x) ? curr : prev),
          0,
        )

        const max =
          state.scrollerSize.inlineSize <= state.containerSize.width
            ? 0
            : (state.scrollerSize.inlineSize - state.containerSize.width) * -1

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        state.controls.start({
          x: Math.min(0, Math.max(max, x)),
          transition: { ...state.options.transition, velocity: action.velocity },
        })
      })()
      return state
    case 'RESIZE_CONTAINER':
      return { ...state, containerSize: action.containerSize }
    case 'RESIZE_SCROLLER':
      return { ...state, scrollerSize: action.scrollerSize }
  }
}

export default sliderReducer
