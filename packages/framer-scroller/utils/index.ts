export function isHTMLMousePointerEvent(
  event: MouseEvent | TouchEvent | PointerEvent,
): event is PointerEvent {
  return (
    event instanceof PointerEvent &&
    event.pointerType === 'mouse' &&
    event.target instanceof HTMLElement
  )
}

// type PointerEventType = 'mouse' | 'touch' | 'pen'

// export function isHTMLPointerEventWithType(
//   event: MouseEvent | TouchEvent | PointerEvent,
//   type: PointerEventType,
// ): event is PointerEvent {
//   return (
//     event instanceof PointerEvent &&
//     event.pointerType === type &&
//     event.target instanceof HTMLElement
//   )
// }
