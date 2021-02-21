/* eslint-disable no-case-declarations */
import { Property, Globals } from 'csstype'
import { AnimationControls, Transition } from 'framer-motion'
import { Reducer } from 'react'
import { Except } from 'type-fest'

type Item = {
  ref: React.RefObject<HTMLDivElement>
  left: number
  top: number
  width: number
  height: number
  active: boolean
}

type ScrollSnapTypeDirection = 'block' | 'both' | 'inline' | 'x' | 'y'
type ScrollSnapType = 'mandatory' | 'proximity'

export type SliderState = {
  items: { [idx: number]: Item }
  count: number
  firstItem?: Item
  lastItem?: Item

  /**
   * To animate to a certain position we store an instance of the return type of useAnimation
   *
   * https://www.framer.com/api/motion/animation/#component-animation-controls
   */
  controls: AnimationControls

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

type UpdateItemAction = {
  type: 'UPDATE_ITEM'
  idx: number
  ref: React.RefObject<HTMLDivElement>
  active: boolean
}
type NavigateAction = { type: 'NAVIGATE'; to: number }
type NavigateNextAction = { type: 'NAVIGATE_NEXT' }
type NavigatePrevAction = { type: 'NAVIGATE_PREV' }
type ResizeAction = { type: 'RESIZE' }

type Actions =
  | UpdateItemAction
  | NavigateAction
  | NavigateNextAction
  | NavigatePrevAction
  | ResizeAction

export type SliderReducer = Reducer<SliderState, Actions>

type Rect = Omit<DOMRect, 'toJSON'>

export function rectRelative(rect: DOMRect, parentRect: DOMRect): Rect {
  return {
    top: rect.top - parentRect.top,
    right: parentRect.right - rect.right,
    bottom: parentRect.bottom - rect.bottom,
    left: rect.left - parentRect.left,
    width: rect.width,
    height: rect.height,
    x: rect.x + parentRect.x,
    y: rect.y + parentRect.y,
  }
}

function measureItem(
  curr: Item,
  { ref, active }: { ref: React.RefObject<HTMLDivElement>; active: boolean },
): Item {
  const rect = ref.current?.getBoundingClientRect()
  const parentRect = ref.current?.parentElement?.getBoundingClientRect()

  if (!rect || !parentRect) return curr

  const { height, width, left, top } = rectRelative(rect, parentRect)
  const item: Item = { ref, active, height, left, top, width }

  const changed = !curr || Object.keys(curr).find((key) => curr[key] !== item[key])
  if (!changed) return curr

  return item
}

function measureRect(item: Item): Rect {
  const rect = item.ref.current?.getBoundingClientRect()
  const parentRect = item.ref.current?.parentElement?.getBoundingClientRect()
  if (!rect || !parentRect) throw Error('Not in DOM')
  return rectRelative(rect, parentRect)
}

function measureRects(items: Item[]): Rect[] {
  return items.map(measureRect)
}

const sliderReducer: SliderReducer = (state: SliderState, action: Actions): SliderState => {
  let newState = state
  let item: Item

  switch (action.type) {
    case 'UPDATE_ITEM':
      const curr = state.items[action.idx]

      item = measureItem(curr, { ref: action.ref, active: action.active })
      if (item === curr) return state

      newState = { ...state, items: { ...state.items, [action.idx]: item } }
      break
    case 'NAVIGATE_NEXT':
      ;(() => {
        const items = Object.values(state.items).slice().reverse()
        const currentItem = items.findIndex((i) => i.active)
        item = items[currentItem - 1]

        const rect = measureRect(item)
        // todo: Make sure we handle the snap align property
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        state.controls.start({ x: rect.left * -1, transition: state.transition })
      })()
      break
    case 'NAVIGATE_PREV':
      ;(() => {
        const items = Object.values(state.items).slice().reverse()
        const currentItem = items.findIndex((i) => i.active)
        item = items[currentItem + 1]

        const rect = measureRect(item)
        // todo: Make sure we handle the snap align property
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        state.controls.start({ x: rect.left * -1, transition: state.transition })
      })()
      break
    case 'NAVIGATE':
      ;(() => {
        item = state.items[action.to]

        const rect = measureRect(item)
        // todo: Make sure we handle the snap align property
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        state.controls.start({ x: rect.left * -1, transition: state.transition })
      })()
      break
    case 'RESIZE':
      // let changed = false
      // newState.items = Object.fromEntries(
      //   Object.entries(newState.items).map(([key, c]) => {
      //     const newItem = measureItem(c, { ref: c.ref, active: c.active })
      //     console.log(newItem.width)
      //     if (newItem !== c) {
      //       changed = true
      //       return [key, newItem]
      //     }
      //     return [key, c]
      //   }),
      // )

      // if (!changed) return state
      break
  }

  // Check if we need to update the firstItem/lastItem and count
  const items = Object.values(newState.items)
  const firstItem = items?.[0]
  const lastItem = items?.[items.length - 1]

  const isUnchanged =
    newState.firstItem === firstItem &&
    lastItem === newState.lastItem &&
    items.length === state.count

  return isUnchanged ? newState : { ...newState, firstItem, lastItem, count: items.length }
}

export default sliderReducer
