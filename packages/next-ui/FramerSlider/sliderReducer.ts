/* eslint-disable no-case-declarations */
import { AnimationControls, Transition } from 'framer-motion'
import { Reducer } from 'react'

type SliderItem = {
  el: HTMLElement
  visible: boolean
}

type ScrollSnapTypeDirection = 'block' | 'both' | 'inline' | 'x' | 'y'
type ScrollSnapType = 'mandatory' | 'proximity'

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

  /** Width of the containerRef */
  containerSize: { width?: number; height?: number }

  /** Ref to the element that actually scrolls */
  scrollerRef: React.RefObject<HTMLDivElement>

  /** Width of the scrollerRef */
  scrollerSize: { width?: number; height?: number }

  /** Options to control the behavior of the slider */
  options: {
    /**
     * The bouncyness of the transition can be controlled here
     *
     * https://www.framer.com/api/motion/types/#transition
     */
    transition?: Transition

    /** https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-stop */
    scrollSnapStop: 'always' | 'normal'

    /** https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type */
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
export type ResizeAction = { type: 'RESIZE' } & Pick<SliderState, 'containerSize' | 'scrollerSize'>

export type SliderActions =
  | RegisterChildrenAction
  | VisibilityChildrenAction
  | NavigateAction
  | NavigateNextAction
  | NavigatePrevAction
  | ScrollAction
  | ResizeAction

export type SliderReducer = Reducer<SliderState, SliderActions>

type Rect = Omit<DOMRect, 'toJSON'>
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
      return sliderReducer(state, { type: 'SCROLL', x: measureItem(prevItem).left * -1 })
    case 'NAVIGATE':
      const navItem = state.items?.[action.to]
      if (!navItem) return state
      return sliderReducer(state, { type: 'SCROLL', x: measureItem(navItem).left * -1 })
    case 'SCROLL':
      ;(() => {
        const containerRect = state.containerRef.current?.getBoundingClientRect()
        const scrollerRect = (state.containerRef.current?.children?.[0] as
          | HTMLElement
          | undefined)?.getBoundingClientRect()

        if (!containerRect || !scrollerRect) return

        const align = state.options.scrollSnapAlign
        const x = state.items
          .map((item) => rectRelative(item?.el.getBoundingClientRect(), scrollerRect))
          .map((item) => {
            if (align === 'center') return item.x + item.width * 0.5 - containerRect.width * 0.5
            if (align === 'end') return item.x + item.width - containerRect.width
            return item.x
          })
          .reduce<number>(
            (prev, curr) =>
              Math.abs(curr * -1 - action.x) < Math.abs(prev - action.x) ? curr * -1 : prev,
            0,
          )

        const max =
          scrollerRect.width <= containerRect.width
            ? 0
            : (scrollerRect.width - containerRect.width) * -1

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        state.controls.start({
          x: Math.min(0, Math.max(max, x)),
          transition: {
            ...state.options.transition,
            velocity: action.velocity,
          },
        })
      })()
      return state
    case 'RESIZE':
      return {
        ...state,
        containerSize: action.containerSize,
        scrollerSize: action.scrollerSize,
      }
  }
}

export default sliderReducer
