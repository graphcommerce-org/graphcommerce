/* eslint-disable no-case-declarations */
import { Property, Globals } from 'csstype'
import { AnimationControls, Transition } from 'framer-motion'
import { Reducer } from 'react'
import { Except } from 'type-fest'

type Item = {
  el: HTMLElement
  visible: boolean
}

type ScrollSnapTypeDirection = 'block' | 'both' | 'inline' | 'x' | 'y'
type ScrollSnapType = 'mandatory' | 'proximity'

export type SliderState = {
  items: { el: HTMLElement; visible: boolean }[]

  /**
   * To animate to a certain position we store an instance of the return type of useAnimation
   *
   * https://www.framer.com/api/motion/animation/#component-animation-controls
   */
  controls: AnimationControls

  /**
   * Container that the items reside in
   */
  containerRef: React.RefObject<HTMLDivElement>

  /**
   * Options to control the behavior of the slider
   */
  options: {
    /**
     * The bouncyness of the transition can be controlled here
     *
     * https://www.framer.com/api/motion/types/#transition
     */
    transition?: Transition

    /**
     * https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-stop
     */
    scrollSnapStop: 'always' | 'normal'

    /**
     * https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type
     */
    scrollSnapType?: ScrollSnapType

    // todo(paales): support the direction parameter as well
    // scrollSnapType?:
    //   | ScrollSnapType
    //   | ScrollSnapTypeDirection
    //   | `${ScrollSnapTypeDirection} ${ScrollSnapType}`

    /**
     * https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align
     */
    scrollSnapAlign?: 'center' | 'end' | 'start'
  }
}

type UpdateChildren = { type: 'UPDATE_CHILDREN'; elements: HTMLElement[] }
type ItemVisibleAction = { type: 'ITEM_VISIBLE'; el: HTMLElement; visible: boolean }
type NavigateAction = { type: 'NAVIGATE'; to: number }
type NavigateNextAction = { type: 'NAVIGATE_NEXT' }
type NavigatePrevAction = { type: 'NAVIGATE_PREV' }
type ScrollAction = { type: 'SCROLL'; x: number }

type Actions =
  | UpdateChildren
  | ItemVisibleAction
  | NavigateAction
  | NavigateNextAction
  | NavigatePrevAction
  | ScrollAction

export type SliderReducer = Reducer<SliderState, Actions>

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

function measureItem(item: Item): Rect {
  const rect = item.el.getBoundingClientRect()
  const parentRect = item.el.parentElement?.getBoundingClientRect()
  if (!rect || !parentRect) throw Error('Not in DOM')
  return rectRelative(rect, parentRect)
}

const sliderReducer: SliderReducer = (state: SliderState, action: Actions): SliderState => {
  const newState: SliderState = { ...state, items: [...state.items] }

  switch (action.type) {
    case 'UPDATE_CHILDREN':
      let isChanged = false
      action.elements.forEach((el, idx) => {
        if (newState.items[idx]?.el === el) return

        isChanged = true
        newState.items[idx] = { el, visible: newState.items[idx]?.visible ?? false }
      })
      return isChanged ? newState : state
    case 'ITEM_VISIBLE':
      newState.items = state.items.map((i) =>
        i.el === action.el ? { el: i.el, visible: action.visible } : i,
      )
      return newState
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

        console.log(max)
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        state.controls.start({
          x: Math.min(0, Math.max(max, x)),
          transition: state.options.transition,
        })
      })()
  }

  return newState
}

export default sliderReducer
