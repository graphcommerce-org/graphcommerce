/** Get the duration in ms of the animation depending upon the distance provided in pixels */
export function distanceAnimationDuration(fromPx: number, toPx: number): number {
  const height = Math.abs(fromPx - toPx)
  if (!height) return 0

  const constant = Math.abs(fromPx - toPx) / 36
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10)
}
