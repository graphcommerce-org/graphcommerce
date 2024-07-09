/**
 * This will create a css value that sizes based on the viewport width.
 *
 * E.g.: `responsiveVal(16, 22)` -> Will render 16px at 320px window width, 22 ad 1280 window width
 */
export function responsiveVal(
  min: number,
  max: number,
  minBreakpoint = 320,
  maxBreakpoint = 2560,
): `clamp(${number}px, ${string}, ${number}px)` {
  const round = (x: number, n: number): number => Math.round(x * 10 ** n) / 10 ** n

  const growth = (max - min) / (maxBreakpoint - minBreakpoint)
  const base = round(min - growth * minBreakpoint, 2)
  const vsize = round(growth * 100, 2)

  return `clamp(${min}px, (${base}px + ${vsize}vw), ${max}px)`
}
