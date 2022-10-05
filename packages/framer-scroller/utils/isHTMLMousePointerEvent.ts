export function isHTMLMousePointerEvent(
  event: MouseEvent | TouchEvent | PointerEvent,
): event is PointerEvent & { target: HTMLElement } {
  return (
    event instanceof PointerEvent &&
    event.pointerType === 'mouse' &&
    event.target instanceof HTMLElement
  )
}
