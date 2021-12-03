/**
 * This will create a css value that sizes based on the viewport width.
 *
 * E.g.: `responsiveVal(16, 22)` -> Will render 16px at 320px window width, 22 ad 1280 window width
 */
export function responsiveVal(
  min: number,
  max: number,
): `max(${number}px, min(${string}, ${number}px))` {
  return `max(${min}px, min(${min}, ${max}px))`
}
